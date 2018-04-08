<?php
if(isset($_POST['email'])) {
    $email_to = "brencklen1@southernct.edu";
    $email_subject = "ECDH Survey Response";
    function died($error) {
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
    if(!isset($_POST['email']) ||
        !isset($_POST['familiar']) ||
        !isset($_POST['helpful']) ||
        !isset($_POST['detailed']) ||
        !isset($_POST['logic']) ||
        !isset($_POST['recommend'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }
    $email_from = $_POST['email'];
    $answer_familiar = $_POST['familiar'];
    $answer_helpful = $_POST['helpful'];
    $answer_detailed = $_POST['detailed'];
    $answer_logic = $_POST['logic'];
    $answer_recommend = $_POST['recommend'];
    $comments = $_POST['comment'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

   if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
   }
   $string_exp = "/^[A-Za-z .'-]+$/";
   if(strlen($error_message) > 0) {
     died($error_message);
   }
   $email_message = "Form details below.\n\n";
  function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
  }
  $email_message .= "Email: ".clean_string($email_from)."\n";
  $email_message .= "How Familiar?: ".clean_string($answer_familiar)."\n";
  $email_message .= "Helpful?: ".clean_string($answer_helpful)."\n";
  $email_message .= "Detailed?: ".clean_string($answer_detailed)."\n";
  $email_message .= "Logical?: ".clean_string($answer_logic)."\n";
  $email_message .= "Would you recommend?: ".clean_string($answer_recommend)."\n";
  $email_message .= "Comments: ".clean_string($comments)."\n";
  $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $email_message, $headers);
?>
<!DOCTYPE html>
<html>

<head>
<title>The End!</title>
</head>
<body>
Thank you for filling out the survey. Your comments are appriciated!

Redirecting you to www.southernct.edu.
<meta http-equiv="refresh" content="1; url=http://www.southernct.edu">
</body>
<?php

}
?>
