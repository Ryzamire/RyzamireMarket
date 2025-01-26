<!-- proses_formulir.php -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipe = $_POST["individu"];
    $nama = $_POST["nama"];
    $nomor_whatsapp = $_POST["nomor-whatsapp"];
    $email = $_POST["email"];
    $deskripsi = $_POST["deskripsi"];

    $to = "dikarizastore@gmail.com";
    $subject = "Formulir Laporan - $tipe: $nama";
    $message = "Tipe: $tipe\nNama: $nama\nNomor WhatsApp: $nomor_whatsapp\nEmail: $email\nDeskripsi: $deskripsi";

    $headers = "From: $email"; // Alamat email pengirim, dapat diganti dengan alamat email yang valid

    // Attempt to send email
    $success = mail($to, $subject, $message, $headers);

    if ($success) {
        // Tampilkan popup
        echo '<script>alert("LAPORAN ANDA SUDAH TERKIRIM");</script>';
        header("Location: menu_awal.php"); // Ganti "menu_awal.php" dengan halaman awal yang sesuai
        exit; // Pastikan untuk keluar setelah menggunakan header()
    } else {
        // Jika pengiriman email gagal
        echo '<script>alert("Gagal mengirim laporan. Silakan coba lagi.");</script>';
        
        // Log the error message
        error_log("Email sending failed: " . error_get_last()['message']);

        // Additional debugging information
        echo '<script>alert("Error: ' . error_get_last()['message'] . '");</script>';
    }
}
?>
