'use strict';
console.clear();

document.addEventListener('DOMContentLoaded', function () {
    const markChecked = () => {
        const todoList = document.querySelector('.todo__list');

        const clickListHdl = function () {
            const clickedItem = event.target.closest('.todo__list-item');
            if (!clickedItem) return;
            event.preventDefault();
            if (clickedItem.dataset.checked === 'false') {
                clickedItem.dataset.checked = 'true';
                clickedItem.querySelector('.todo__list-check').checked = true;
            }
            else {
                clickedItem.dataset.checked = 'false';
                clickedItem.querySelector('.todo__list-check').checked = false;
            }
        };

        todoList.addEventListener('click', clickListHdl);
    }

    const addItem = () => {
        const btn = document.querySelector('.todo__button');
        const addItemHndl = function () {
            const todoList = document.querySelector('.todo__list');
            const newItem = document.createElement('li');
            newItem.classList.add('todo__list-item');
            newItem.dataset.checked = 'false';

            const label = document.createElement('label');
            label.classList.add('todo__list-label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('todo__list-check');

            const text = document.createTextNode('New Task');

            label.appendChild(checkbox);
            label.appendChild(text);
            newItem.appendChild(label);

            todoList.appendChild(newItem);
        }

        btn.addEventListener('click', addItemHndl);
    }

    addItem();
    markChecked();
});
