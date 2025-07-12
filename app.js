let number = null;
let index = 0;
let answer = '';
let timeLeft = 30;
let timer;
let isCorrect = null;
let correctCount = 0;
let problems = [];

const app = document.getElementById('app');

function renderMenu() {
  clearInterval(timer);
  app.innerHTML = `
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Aitana. Selecciona una tabla</h2>
    <div class="grid grid-cols-5 gap-4">
      ${Array.from({ length: 10 }, (_, i) => `
        <button onclick="startPractice(${i + 1})"
          class="py-3 bg-indigo-500 text-white text-lg font-bold rounded-xl hover:bg-indigo-600 transition">
          ${i + 1}
        </button>`).join('')}
    </div>
  `;
}

function startPractice(selectedNumber) {
  number = selectedNumber;
  index = 0;
  isCorrect = null;
  correctCount = 0;
  problems = Array.from({ length: 10 }, (_, i) => ({
    multiplier: i + 1,
    result: selectedNumber * (i + 1),
  }));
  renderProblem();
}

function renderProblem() {
  const current = problems[index];
  app.innerHTML = `
    <button onclick="renderMenu()" class="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      Volver
    </button>

    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Tabla del ${number}</h2>

    <div class="text-center mb-6">
      <p class="text-xl text-gray-700 mb-2">
        ¿Cuánto es <span class="font-extrabold text-indigo-600">${number} x ${current.multiplier}</span>?
      </p>
      <p class="mb-4 text-lg text-gray-600 font-semibold">
        Tiempo restante: <span class="${timeLeft <= 3 ? 'text-red-600' : 'text-indigo-600'} font-bold">${timeLeft}s</span>
      </p>

      <form onsubmit="submitAnswer(event)" class="flex flex-col items-center">
        <input
          type="number"
          id="answer"
          value="${answer}"
          class="w-full max-w-xs px-4 py-3 text-center text-2xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 transition"
          placeholder="Tu respuesta"
          required
        />
        <button type="submit"
          class="mt-4 w-full max-w-xs py-3 bg-green-500 text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-600 transition">
          Comprobar
        </button>
      </form>

      ${isCorrect !== null ? `
        <div class="mt-4 flex items-center justify-center">
          ${isCorrect ? `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>` :
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>`}
          <p class="ml-2 text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}">
            ${isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta era ${current.result}.`}
          </p>
        </div>
        <button onclick="nextProblem()" class="mt-6 w-full max-w-xs py-3 bg-blue-500 text-white text-xl font-bold rounded-xl shadow-md hover:bg-blue-600 transition">
          Siguiente
        </button>
      ` : ''}
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('answer');
    if (input) input.focus();
  }, 50);

  if (isCorrect === null) {
    clearInterval(timer);
    timer = setInterval(() => {
      const input = document.getElementById('answer');
      if (input) answer = input.value;

      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        isCorrect = false;
        renderProblem();
      } else {
        renderProblem();
      }
    }, 1000);
  }
}

function submitAnswer(e) {
  e.preventDefault();
  const input = document.getElementById('answer');
  answer = input.value;
  isCorrect = parseInt(answer) === problems[index].result;
  if (isCorrect) correctCount++;
  clearInterval(timer);
  renderProblem();
}

function nextProblem() {
  index++;
  answer = '';
  isCorrect = null;
  timeLeft = 30;

  if (index >= problems.length) {
    alert(`¡Felicidades Aitana Zambrano Mejia, terminaste la tabla del ${number}!\nTu puntuación: ${correctCount}/10`);
    renderMenu();
    return;
  }

  renderProblem();
}

renderMenu();
