function validateAndSubmit() {
    var form = document.getElementById("laporanForm");

    if (form.checkValidity()) {
        sendEmail();
    } else {
        form.reportValidity();
    }
}

function sendEmail() {
    var nama = document.getElementById("nama").value;
    var nomorWhatsApp = document.getElementById("nomor-whatsapp").value;
    var email = document.getElementById("email").value;
    var deskripsi = document.getElementById("deskripsi").value;

    var emailBody = "Nama: " + nama + "\n";
    emailBody += "Nomor WhatsApp: " + nomorWhatsApp + "\n";
    emailBody += "Catatan: " + deskripsi + "\n";
    if (email) {
        emailBody += "Email: " + email + "\n";
    }

    var mailtoLink = "mailto:teamdikariza@example.com?subject=Laporan&body=" + encodeURIComponent(emailBody);

    window.location.href = mailtoLink;
}

// Add input event listener to filter non-numeric characters
document.getElementById("nomor-whatsapp").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, '');
});
