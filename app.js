const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encodeQP = document.getElementById('encodeQP');
const decodeQP = document.getElementById('decodeQP');
const encodeUTF8 = document.getElementById('encodeUTF8');
const decodeUTF8 = document.getElementById('decodeUTF8');
const decodeCustomQP = document.getElementById('decodeCustomQP');
const encodeCustomQP = document.getElementById('encodeCustomQP');
const encodedWindows = encodeQuotedPrintableOS(inputText.value, 'windows');
const encodedUnix = encodeQuotedPrintableOS(inputText.value, 'unix');
const encodedMac = encodeQuotedPrintableOS(inputText.value, 'mac');


function decodeQuotedPrintable(encoded) {
  return encoded.replace(/=([A-Fa-f0-9]{2})/g, function(_, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  }).replace(/=\r\n/g, '');
}

function encodeQuotedPrintable(decoded) {
  return decoded.replace(/[\s\S]/g, function(char) {
    if (char === ' ' || char === '\t' || char.match(/[^\x21-\x3C\x3E-\x7E]/)) {
      return '=' + char.charCodeAt(0).toString(16).toUpperCase();
    } else {
      return char;
    }
  }).replace(/(.{1,72}(?=([^=]{2}|$)))(?=\r\n|$)/g, '$1=\r\n').replace(/(?<=\r\n=)\r\n/g, '');
}

function encodeQuotedPrintableOS(decoded, os) {
  let lineBreak;

  switch (os) {
    case 'windows':
      lineBreak = '=\r\n';
      break;
    case 'unix':
      lineBreak = '=\n';
      break;
    case 'mac':
      lineBreak = '=\r';
      break;
    default:
      lineBreak = '=\r\n';
  }

  return encodeQuotedPrintable(decoded, lineBreak);
}

encodeQP.addEventListener('click', () => {
    const encoded = btoa(unescape(encodeURIComponent(inputText.value)));
    outputText.value = encoded;
});

decodeQP.addEventListener('click', () => {
    const decoded = decodeURIComponent(escape(atob(inputText.value)));
    outputText.value = decoded;
});

encodeUTF8.addEventListener('click', () => {
    const encoded = encodeURIComponent(inputText.value);
    outputText.value = encoded;
});

decodeUTF8.addEventListener('click', () => {
    const decoded = decodeURIComponent(inputText.value);
    outputText.value = decoded;
});

decodeCustomQP.addEventListener('click', () => {
    const decoded = decodeQuotedPrintable(inputText.value);
    outputText.value = decoded;
});

encodeCustomQP.addEventListener('click', () => {
    const encoded = encodeQuotedPrintable(inputText.value);
    outputText.value = encoded;
});
