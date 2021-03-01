//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector('.filter-todos');

//event listeners

//loads To-Dos from local storage
document.addEventListener('load', getTodos())

//creates To-Dos 
todoButton.addEventListener('click', function(e) {
    e.preventDefault();
    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoList.appendChild(todoDiv)

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //save to local storage
    saveLocal(todoInput.value)

    // completeted button
    const completedButton = document.createElement('button')
    completedButton.classList.add('completed-button')
    todoDiv.appendChild(completedButton)
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>'

    // finished button
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    todoDiv.appendChild(deleteButton)
    deleteButton.innerHTML = '<i class="fas fa-minus-square"></i>'

//deltes input value
    todoInput.value = ""
});
// completing and deleting buttons
todoList.addEventListener('click', function(e){
    console.log(e.target.parentElement)
    const item = e.target;
    if(item.classList[0] === 'delete-button') {
        item.parentElement.classList.toggle('deleted')
        item.parentElement.addEventListener('transitionend', function(e) {
            item.parentElement.remove()
            deleteTodo(e.target.parentElement)
        })    
    }
    else if(item.classList[0] === 'completed-button') {
        item.parentElement.classList.toggle('completed')

    }
    else {
        return;
    }
})

//completed, all, active select function
filter.addEventListener('change', function(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'active':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }
    })
})

//saves to-dos to local storage
function saveLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Gets to-dos from local storage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoList.appendChild(todoDiv)

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // completeted button
        const completedButton = document.createElement('button')
        completedButton.classList.add('completed-button')
        todoDiv.appendChild(completedButton)
        completedButton.innerHTML = '<i class="fas fa-check-square"></i>'

        // finished button
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        todoDiv.appendChild(deleteButton)
        deleteButton.innerHTML = '<i class="fas fa-minus-square"></i>'
    })
}

//Delete To-dos function
function deleteTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    let localIndex = todos.indexOf(todo);
    todos.splice(localIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}
