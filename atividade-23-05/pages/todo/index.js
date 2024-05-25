const taskKey = "@tasks";
const dialogForm = document.getElementById("dialog-form");
const inputTitleEdit = document.getElementById("title-edit");
const descriptionEdit = document.getElementById("description-edit");
const botaoEditar = document.getElementsByClassName("botao-editar");

const botaoCancelar = document.getElementById("botao-cancelar");

botaoCancelar.addEventListener("click", () => dialogForm.close());

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = uuid();
  const taskList = document.querySelector("#taskList");

  const form = document.querySelector("#taskForm");
  const formData = new FormData(form);

  const taskTitle = formData.get("title");
  const taskDescription = formData.get("description");

  const li = document.createElement("li");

  li.id = taskId;
  li.className = "task-item";
  li.innerHTML = `
  <div><h2>${taskTitle}</h2><p>${taskDescription}</p></div><button title="Editar tarefa" class="botao-editar" id=${taskId}>✏️</button>
  `;

  const botaoEditar = li.querySelector(".botao-editar");
  botaoEditar.addEventListener("click", () => editar(taskId));

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ title: taskTitle, description: taskDescription, id: taskId });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function uuid() {
  function randomDigit() {
    if (crypto && crypto.getRandomValues) {
      var rands = new Uint8Array(1);
      crypto.getRandomValues(rands);
      return (rands[0] % 16).toString(16);
    } else {
      return ((Math.random() * 16) | 0).toString(16);
    }
  }
  var crypto = window.crypto || window.msCrypto;
  return "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g, randomDigit);
}

function editar(id) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const task = tasks.find((task) => task.id === id);

  dialogForm.showModal();
  inputTitleEdit.value = task.title;
  descriptionEdit.value = task.description;
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = tasks;

  tasks.forEach((task) => {
    taskList.insertAdjacentHTML('beforeend', `<li class="task-item"><div><h2>${task.title}</h2><p>${task.description}</p></div><button title="Editar tarefa" class="botao-editar" id=${task.id}>✏️</button></li>`);
  
    const botaoEditar = document.getElementById(task.id);
    botaoEditar.addEventListener("click", () => editar(task.id));
  });
});
