document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('review-form');
  const nameInput = document.getElementById('name');
  const transactionIdInput = document.getElementById('transaction-id');
  const userReviewInput = document.getElementById('user-review');
  const submitButton = document.getElementById('submit-review');
  const reviewsList = document.getElementById('reviews-list');
  const ratingDisplay = document.getElementById('rating-display');
  const alertModal = document.getElementById('alert-modal');
  const modalMessage = document.getElementById('modal-message');
  const closeBtn = document.querySelector('.close-btn');

  // Tampilkan riwayat ulasan dari penyimpanan lokal saat halaman dimuat
  loadReviews();

  submitButton.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const transactionId = transactionIdInput.value.trim();
    const userReview = userReviewInput.value.trim();
    const selectedRating = localStorage.getItem('selectedRating'); // Ambil rating yang dipilih
    if (name !== '' && transactionId !== '' && userReview !== '' && selectedRating !== null) {
      // Simpan ulasan ke penyimpanan lokal bersama dengan tanggal dan rating
      saveReview({
        name: name,
        transactionId: transactionId,
        userReview: userReview,
        rating: parseInt(selectedRating), // Konversi ke tipe angka
        date: new Date() // Tambahkan tanggal dan waktu
      });
      // Sembunyikan formulir ulasan
      reviewForm.style.display = 'none';
      // Tampilkan riwayat ulasan
      reviewsList.style.display = 'block';
    } else {
      // Tampilkan modal peringatan
      showModal('Please fill in all fields and select a rating before submitting.');
    }
  });

  // Fungsi untuk menambahkan ulasan ke daftar ulasan di UI
  function addReviewToUI(review) {
    const li = document.createElement('li');
    li.classList.add('review-item');
    // Format tanggal dan waktu
    const formattedDate = new Date(review.date).toLocaleString();
    // Format ulasan
    li.innerHTML = `
      <p>Name: ${review.name}</p>
      <p>Transaction ID: ${review.transactionId}</p>
      <p>Review: ${review.userReview}</p>
      <p>Rating: ${review.rating} bintang</p>
      <p>Date: ${formattedDate}</p>
    `;
    reviewsList.appendChild(li);
  }

  // Fungsi untuk memuat ulasan dari penyimpanan lokal
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    // Tambahkan ulasan ke daftar ulasan di UI
    reviews.forEach(review => {
      addReviewToUI(review);
    });
  }

  // Fungsi untuk menyimpan ulasan ke penyimpanan lokal
  function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    // Tambahkan ulasan baru ke daftar ulasan
    addReviewToUI(review);
  }

  // Fungsi untuk menampilkan modal dengan pesan
  function showModal(message) {
    modalMessage.textContent = message;
    alertModal.style.display = 'block';
  }

  // Event listener untuk tombol close modal
  closeBtn.addEventListener('click', function() {
    alertModal.style.display = 'none';
  });

  // Klik di luar modal menutup modal
  window.addEventListener('click', function(event) {
    if (event.target === alertModal) {
      alertModal.style.display = 'none';
    }
  });

  // Tambahkan event listener untuk bintang
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(star.dataset.rating);
      // Hapus kelas .selected dari semua bintang
      stars.forEach(s => s.classList.remove('selected'));
      // Tambahkan kelas .selected pada bintang yang dipilih
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('selected');
        }
      });
      // Simpan rating yang dipilih di penyimpanan lokal
      localStorage.setItem('selectedRating', rating);
      // Tampilkan rating yang dipilih
      ratingDisplay.textContent = `Rating: ${rating} bintang`;
    });
  });

});

function redirectToGame(gamePage) {
  window.location.href = gamePage;
}

function goBack() {
  window.history.back();
}