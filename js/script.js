'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const copyToDoData = JSON.parse(localStorage.getItem("toDoData"));

const toDoData = [];

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function(item, index) {

        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if (item.comleted) {
            todoCompleted.append(li);
            localStorage.setItem("toDoData", JSON.stringify(toDoData));
        } else {
            todoList.append(li);
            localStorage.setItem("toDoData", JSON.stringify(toDoData));
        }

        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.comleted = !item.comleted;
            render();
            localStorage.setItem("toDoData", JSON.stringify(toDoData));
        });

        li.querySelector('.todo-remove').addEventListener('click', function() {
            toDoData.splice(index, 1);
            render();
            localStorage.setItem("toDoData", JSON.stringify(toDoData));
        });        
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value !== '') {
        const newToDo = {
            text: headerInput.value,
            comleted: false
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';
    
        render();
    }   
});

for (let i = 0; i < copyToDoData.length; i++) {
    toDoData.push(copyToDoData[i]);
}

render();