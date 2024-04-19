const tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : [];

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

onsubmit = (event) => {
    event.preventDefault();

    const novaTarefa = input.value
    const tarefasAtuais = tarefas;
    tarefasAtuais.push(novaTarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtuais))
    const li = document.createElement('li');
    li.textContent = novaTarefa
    ul.appendChild(li)
    input.value = ""
};

function renderTarefas() {
    tarefas.map((tarefa) => {
        const li = document.createElement('li');
        li.textContent = tarefa
        ul.appendChild(li)
    })
}

document.addEventListener('DOMContentLoaded', function () {
    renderTarefas()
})