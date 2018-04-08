# ecdh

Description: A series of web pages to be used as a teaching tool for Elliptic Curve Diffie Hellman. Submitted in Spring 2018 as a project for the completion of a Masters Degree in Computer Science at Southern Connecticut State University. Thesis Advisor: Dr Ata Elahi.

This set of pages makes use of:
Tiny Encryption Algorithm and javascript library.  http://www.movable-type.co.uk/scripts/tea-block.html
W2.js by w3schools.com  https://www.w3schools.com/w3js/default.asp
MathJax by the MatJax Consortium https://www.mathjax.org
D3  https://d3js.org/  for the graphing elements

This program makes extensive use of the javascript HTML5 function localStorage. The localStorage function is used to carry the variables between pages and omit the need for any database on the back end, and was much easier to implement than use of POST/GET form variables. The data only needs to be persistent across pages on each visit, and doesn't need long term storage. As of this writing, this works fine in all the browsers I tested except for MS-Edge. Edge throws an exception error at the use of localStorage.
