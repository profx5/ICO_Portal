<?php

$name = trim(isset($_GET['name']) ? $_GET['name'] : undefined);
$email = trim(isset($_GET['email']) ? $_GET['email'] : undefined);
$message = trim(isset($_GET['message']) ? $_GET['message'] : undefined);
$header = $email . "Content-type: text/plain; charset=\"windows-1251\"";

$mailto = "krasnov.alexey96@gmail.com";
$letter = "Name: " . $name . "\r\nEmail: " . $email . "\r\nMessage: " . $message;

mail($mailto, 'Message from longevitytoken', $letter, $header);

?>
