<?php
namespace App\Utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailSender {
    public static function enviar(string $para, string $assunto, string $html): void {
        $mail = new PHPMailer(true);

        $senhaApp = $_ENV['MAIL_PASSWORD'];

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sitefrassati@gmail.com';
        $mail->Password = $senhaApp;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('noreply-frassati@gmail.com', 'Site Frassati');
        $mail->addAddress($para);
        $mail->isHTML(true);
        $mail->Subject = $assunto;
        $mail->Body    = $html;

        $mail->send();
    }
}
