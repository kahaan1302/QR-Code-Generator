// script.js

document.getElementById("qr-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("qr-id").value;

  // Validation: Check if the ID field is empty
  if (!id) {
    alert("Please enter an ID");
    return;
  }

  const data = { id };

  fetch("http://localhost:3000/generate-qr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create an image element for the QR code
      const qrImage = document.createElement("img");
      const qrImageUrl = URL.createObjectURL(blob);
      qrImage.src = qrImageUrl;

      // Clear previous QR code result and append the new image
      const qrResultDiv = document.getElementById("qr-result");
      qrResultDiv.innerHTML = "";
      qrResultDiv.appendChild(qrImage);

      // Show the download button and add functionality for downloading
      const downloadBtn = document.getElementById("download-btn");
      downloadBtn.style.display = "block"; // Make the button visible

      // Event listener for downloading the QR code image
      downloadBtn.addEventListener("click", function () {
        // Create an anchor element to trigger the download
        const link = document.createElement("a");
        link.href = qrImageUrl;
        link.download = "qr-code.png"; // Name of the downloaded file
        link.click();
      });
    })
    .catch((error) => console.error("Error generating QR code:", error));
});
