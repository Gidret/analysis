document.addEventListener('DOMContentLoaded', () => {
  const processBtn = document.getElementById('processBtn');
  const setsInput = document.getElementById('setsInput');
  const errorDiv = document.getElementById('minLengthError');


  setsInput.addEventListener('input', () => {
    validateMinLength(setsInput, errorDiv);
  });

  processBtn.addEventListener('click', () => {
    if (validateMinLength(setsInput, errorDiv)) {
      processSequences();
    }
  });
});


function validateMinLength(inputElement, errorElement) {
  const minLength = 3;
  const value = inputElement.value.trim();

  if (value.length < minLength) {
    if (errorElement) {
      errorElement.textContent = `Ошибка: минимальное количество символов — ${minLength}.`;
      errorElement.style.display = 'block';
    }
    inputElement.classList.add('invalid');
    return false;
  } else {
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    inputElement.classList.remove('invalid');
    return true;
  }
}


function analyzeSet(seq) {
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

  let resultsHTML = '<strong>Результаты обработки:</strong><br><br>';

  for (let i = 0; i < k; i++) {
    const numbers = lines[i]
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0 || numbers[numbers.length - 1] !== 0) {
      resultsHTML += `<div class="result-item" style="color: #d9534f;"><strong>Набор ${i + 1}:</strong> Ошибка — набор должен завершаться числом 0!</div>`;
      continue;
    }

    const seq = numbers.slice(0, numbers.length - 1);

    if (seq.length < 2) {
      resultsHTML += `<div class="result-item" style="color: #d9534f;"><strong>Набор ${i + 1}:</strong> Ошибка — должно быть минимум 2 числа до завершающего 0 (введено: ${seq.length}).</div>`;
      continue;
    }

    const res = analyzeSet(seq);
    let statusText = '';
    if (res === 1) statusText = 'Возрастает (1)';
    else if (res === -1) statusText = 'Убывает (-1)';
    else statusText = 'Не возрастает и не убывает (0)';

    resultsHTML += `<div class="result-item"><strong>Набор ${i + 1}:</strong> Результат = <strong>${res}</strong> (${statusText})</div>`;
  }

  outputDiv.innerHTML = resultsHTML;
  outputDiv.style.display = 'block';
}