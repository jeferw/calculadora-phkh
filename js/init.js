function init() {
  document.querySelector('#btn-calc').addEventListener('click', calc);
  document.querySelectorAll('input[type="number"]').forEach((item) => {
    item.addEventListener('keypress', validateDigit);
  });
}

function validateDigit(e) {
  let key = e.keyCode;
  key = String.fromCharCode(key);
  if (key.length == 0) return;
  const regex = /^[0-9.,\b]+$/;
  if (!regex.test(key)) e.preventDefault();
}

function calc() {
  const liters = Number(document.querySelector('#liters').value);
  const currentKH = Number(document.querySelector('#current-kh').value);
  const targetKH = Number(document.querySelector('#target-kh').value);
  const targetPH = Number(
    document.querySelector('input[name="target-ph"]:checked')?.value || 1
  );
  const finalKH = (targetKH - currentKH) / 2.8;
  const alkaline = parseFloat(finalKH * 0.0925 * liters);

  document.querySelector('#alkaline').textContent = alkaline.toFixed(1) + 'g';
  document.querySelector('#acid').textContent =
    parseFloat(alkaline / targetPH).toFixed(1) + 'g';

  const resultBox = document.querySelector('#result-box');

  resultBox.style.display = 'initial';

  resultBox.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
}

document.addEventListener('DOMContentLoaded', init);
