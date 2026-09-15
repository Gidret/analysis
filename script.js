document.addEventListener('DOMContentLoaded', () => {
  const processBtn = document.getElementById('processBtn');
  processBtn.addEventListener('click', processSequences);
});

function analyzeSet(numbers) {
  // Удаляем завершающий 0 для проверки
  const zeroIndex = numbers.indexOf(0);
  const seq = zeroIndex !== -1 ? numbers.slice(0, zeroIndex) : numbers;

  if (seq.length < 2) return 0;

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < seq.length - 1; i++) {
    if (seq[i + 1] <= seq[i]) isIncreasing = false;
    if (seq[i + 1] >= seq[i]) isDecreasing = false;
  }

  if (isIncreasing) return 1;
  if (isDecreasing) return -1;
  return 0;
}

function processSequences() {
  const k = parseInt(document.getElementById('kValue').value);
  const rawText = document.getElementById('setsInput').value.trim();
  const outputDiv = document.getElementById('output');

  if (isNaN(k) || k <= 0) {
    alert('Пожалуйста, введите корректное число K (K > 0).');
    return;
  }

  const lines = rawText.split('\n').filter(line => line.trim() !== '');

  if (lines.length < k) {
    alert(`Вы указали K = ${k}, но ввели только ${lines.length} строк(и).`);
    return;
  }

  let resultsHTML = '<strong>Результаты:</strong><br><br>';

  for (let i = 0; i < k; i++) {
    const numbers = lines[i]
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter(n => !isNaN(n));

    const res = analyzeSet(numbers);
    let statusText = '';
    if (res === 1) statusText = 'Возрастает (1)';
    else if (res === -1) statusText = 'Убывает (-1)';
    else statusText = 'Не возрастает и не убывает (0)';

    resultsHTML += `<div class="result-item"><strong>Набор ${i + 1}:</strong> Результат = <strong>${res}</strong> (${statusText})</div>`;
  }

  outputDiv.innerHTML = resultsHTML;
  outputDiv.style.display = 'block';
}