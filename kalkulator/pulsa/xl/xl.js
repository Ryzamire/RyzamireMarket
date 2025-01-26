function placeOrder() {
  // Get input values
  const gameName = document.getElementById('gameName').value;
  const gameID = document.getElementById('gameID').value;
  const priceList = document.getElementById('priceList').value;
  const paymentList = document.getElementById('paymentList').value;
  const gameIDLabel = document.getElementById('gameIDLabel');
  const gameIDField = document.getElementById('gameIDField');

  if (!gameName || !priceList || !paymentList) {
    showWarning();
    return;
  }

  // Show the "Masukan ID Game" label and input field for other games
  if (gameIDLabel && gameIDField) {
    gameIDLabel.style.display = "block";
    gameIDField.style.display = "block";
  }

  const orderData = `SIM PERDANA : ${gameName}\nNomor Telepon : ${gameID}\nPulsa Nasional : Rp.${priceList}\nPayment Method : ${paymentList}`;

  // Encode the orderData
  const encodedOrderData = encodeURIComponent(orderData);

  // WhatsApp link (replace with the actual WhatsApp number)
  const whatsappLink = `https://wa.me/6282321098084?text=${encodedOrderData}`;

  // Redirect to the WhatsApp link
  window.location.href = whatsappLink;
}

function showWarning() {
  const warningMessage = document.getElementById('warningMessage');
  warningMessage.classList.remove('hidden');
}

function hideWarning() {
  const warningMessage = document.getElementById('warningMessage');
  warningMessage.classList.add('hidden');
}


function goBack() {
  window.history.back();
}