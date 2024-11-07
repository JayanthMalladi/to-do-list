document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');


    const fetchTodos = () => {
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => {
                todoList.innerHTML = '';
                data.forEach((todo, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${todo}
                        <button data-id="${index}">Delete</button>
                    `;
                    todoList.appendChild(li);
                });
            });
    };


    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = todoInput.value.trim();
        if (todo) {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todo }),
            })
            .then(response => response.json())
            .then(data => {
                todoInput.value = '';
                fetchTodos();
            });
        }
    });


    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const todoId = e.target.getAttribute('data-id');
            fetch(`/api/todos/${todoId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                fetchTodos();
            });
        }
    });


    fetchTodos();
});