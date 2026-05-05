function envoyerMessage() {
  const pseudo = document.getElementById("pseudo").value;
  const message = document.getElementById("message").value;
  const zone = document.getElementById("messages");

  if (pseudo === "" || message === "") {
    alert("Remplis ton pseudo et ton message !");
    return;
  }

  zone.innerHTML += `
    <div class="message">
      <strong>${pseudo}</strong>
      <p>${message}</p>
    </div>
  `;

  document.getElementById("message").value = "";
}