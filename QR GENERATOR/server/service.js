//service.js

const QRCode = require("qrcode");

exports.formatData = (data) => {
  const qrCodeText = `${data.id}`;
  return qrCodeText;
};

exports.generateQRCode = async (qrCodeText) => {
  const options = {
    errorCorrectionLevel: "M",
    type: "image/png",
    margin: 1,
  };

  const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
  return qrCodeBuffer;
};
