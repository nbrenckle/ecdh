// Functions used across several pages.
// The following functions are used across multiple pages for ECC calulcations


var Z,a,b,Na,Nb,G,Pa,Pb,Ka,Kb,M,C;
var Xp, Yp, Xq, Yq, Xr, Yr;
var S;

// Warn user if the values are very large. The code is running in the users browser, locally, and can get very bogged down with large values
function checkValues() {
	Z = parseInt(document.getElementById("z").value);
	if ((Z > 9999) || (Z > 127)) {
	  var answer = confirm("Values of Z greater than 127 can make the pages harder to use, due to the number of  points illustrated. Values of Z greater than 9973 can cause extremly slow performance or cause your browser to run out of memory. Are you sure you wish to continue?")
		if (!(answer)) {
			resetAll();
		}
	}
	if ( !(isPrime(Z)) && !(isNaN(Z)) ) {
		var answer = confirm("Values of Z that are not prime will cause parts of the pages to behave poorly, due to the use of multiplicative inverses. Use of these values are also poor choices in encryption as they make it easier to break. Are you sure you wish to continue?")
		if (!(answer)) {
			resetAll();
		}
	}
	ECC();
}

// Main ECC function. Calculates points on the curve using a,b and z values.
// points are stored in localStorage as 'ptsArray'
function ECC()
{
	a = parseInt(document.getElementById("a").value);
	b = parseInt(document.getElementById("b").value);
	Z = parseInt(document.getElementById("z").value);
	document.getElementById("pt-count").innerText =  0;
	document.getElementById("pts-list-title").style.visibility = "visible";
	// Check that values are valid and will create a functional curve
	if(mod(4*Math.pow(a, 3) + 27*Math.pow(b,2), Z) == 0)
	{
		console.log("a and b are not valid!");
		return;
	}
	var pts = generatePtsOnCurve();
  localStorage.setItem("ptsArray", JSON.stringify(pts));
  }

// Generate the points on the curve, return those points
// Calculate the possible points, and then verify that they are valid for
// the curve.
function generatePtsOnCurve()
{
	var possibleY = [];
	var possibleX = [];
	var pts = [];
	for(var i = 0; i < Z; i++)
	{
		possibleY[i] = (Math.pow(i, 2)%Z);
	}
	for(var i = 0; i < Z; i++)
	{
		possibleX[i] = ((Math.pow(i, 3)+ a*i + b)%Z);
	}
	for(var x = 0; x < Z; x++)
	{
		for(var y = 0; y < Z; y++)
		{
			if(possibleX[x] == possibleY[y])
			{
				pts[pts.length] = [x, y];
			}
		}
	}
	var ptsStr = "";
	for(var i = 0; i < pts.length; i++)
	{
		ptsStr += "(" + pts[i][0] + "," + pts[i][1] + "), ";
	}
	ptsStr = ptsStr.substring(0, ptsStr.length-2);
	document.getElementById("points").innerText = ptsStr;
	document.getElementById("pt-count").innerText =  pts.length;
	document.getElementById("nextbutton").disabled = false;
	return pts;
}

// Find greatest common divisor using Euclidian Algorithm
// See: https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
// for a more indepth explination
function gcd(a, b)
{
	if(a === b)
	{
		return a;
	}
	var r1 = Math.max(a, b), r2 = Math.min(a, b);
	var q = 0, r = 0;
	while(r2 > 0)
	{
		q = Math.floor(r1/r2);
		r = r1 - q*r2;
		r1 = r2;
		r2 = r;
	}
	return r1;
}

function mod(n, p)
{
	n %= p;
	if(n < 0)
	{
		n += p;
	}
	return n;
}

// find inverse, used when adding points together
function findInverse(n)
{
	var q, r1, r2, r, t1, t2, t, i;
	r1 = Z;
	r2 = n;
	t1 = 0;
	t2 = 1;
	while(r2 !== 0)
	{
		q = ~~(r1/r2);
		r = r1 - (q*r2);
		t = t1 - q*t2;

		r1 = r2;
		r2 = r;
		t1 = t2;
		t2 = t;
	}
	i = t1;
	i = mod(i, Z);
	return i;
}

// Calculate the Y value for a given X value
function calcYECC(x)
{
	var y;
	y = Math.sqrt(Math.pow(x, 3) + a*x + b);
	return y;
}

function CalcYLine(x)
{
	var Y = S*x + S*Xp + Yp;
	return Y;
}

// Add two points together
function addPts2(x1, y1, x2, y2)
{
 var s, sDividend, sDivisor, X, Y;
 if(x1 === x2 && y1 === y2)
 {
	 sDividend = (3*Math.pow(x1,2)+a);
	 sDivisor = 2*y1;
 }
 else
 {
	 sDividend = (y2 - y1);
	 sDivisor = (x2 - x1);
 }
 sDividend = mod(sDividend, Z);
 sDivisor = mod(sDivisor, Z);
 if(gcd(Z, sDivisor) === 1)
 {
	 sDivisor = findInverse(sDivisor);
 }
 else
 {
	 return Infinity;
 }
 s = sDividend * sDivisor;
 while (s>=Z) {
	 s = mod(s,Z);
 }
 X = Math.pow(s,2) - x1 - x2;
 while (X>=Z) {
	 X = mod(X,Z);
 }
 Y = (s*(x1 - X) - y1);
 X = mod(X, Z);
 Y = mod(Y, Z);
 return [X, Y];
}

// Check if number is a prime or not
function isPrime(num) {
	 var sqrtnum=Math.floor(Math.sqrt(num));
	 var prime = num != 1;
	 for(var i=2; i<sqrtnum+1; i++) {
 		 if(num % i == 0) {
					prime = false;
					break;
		 }
	 }
	 return prime;
 }
