// app.js
import { TaskManager } from './taskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            taskManager.addTask(task);
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const taskId = e.target.parentElement.dataset.id;
            taskManager.removeTask(taskId);
            renderTasks();
        } else if (e.target.classList.contains('task-item')) {
            const taskId = e.target.dataset.id;
            taskManager.toggleComplete(taskId);
            renderTasks();
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = taskManager.getTasks();
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item${task.completed ? ' completed' : ''}`;
            li.dataset.id = task.id;
            li.textContent = task.name;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remover';
            li.appendChild(removeBtn);

            taskList.appendChild(li);
        });
    }

    renderTasks();
});
