document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCounter = document.getElementById('task-counter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clear-completed');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        let filteredTodos = todos;

        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span style="cursor: pointer; flex: 1;">${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            li.querySelector('span').addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveAndRender();
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos = todos.filter(t => t.id !== todo.id);
                saveAndRender();
            });

            todoList.appendChild(li);
        });

        const activeCount = todos.filter(t => !t.completed).length;
        taskCounter.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
    }

    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ id: Date.now(), text, completed: false });
            todoInput.value = '';
            saveAndRender();
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(t => !t.completed);
        saveAndRender();
    });

    renderTodos();
});