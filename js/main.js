function saveDataToDb(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
    displayData()
}

function removeAllData() {
    localStorage.clear()
    displayData()
}

function presentTodos() {
    let todos;

    const todosDB = JSON.parse(localStorage.getItem('todos'));
    
    if (todosDB == null) {
        todos = []
        console.log('todos from empty array', todos)
    } else {
        todos = todosDB
        console.log('todos from db', todos)
    }
    return todos
}



function createData(task) {
    const id = new Date().getTime()
    let todos = presentTodos()
    todos.push({
        task:task,
        id:id
    })
    saveDataToDb(todos)
}


function addData() {
    const input = document.getElementById('input1')
    const inputValue = input.value
    input.value = ''
    if (inputValue == '') {
        alert('error(check input)')
    } else {
        createData(inputValue)
    }
    displayData()
}


function getDataToDelete(todos, deleteElement) {
    todos = todos.filter(todo => {
        if (todo.id == deleteElement) {
            console.log(todo.id, deleteElement)
            return false;
        } else {
            return true
        }
    })
    saveDataToDb(todos)
}


function deleteData(id, todos) {
    const deleteSpan = document.getElementById(id)
    deleteSpan.addEventListener(
        'click',
        () => {
            const deleteElement = deleteSpan.id
            getDataToDelete(todos, deleteElement)
            displayData()
        }
    )
}

function displayData() {
    let todos = presentTodos()
    document.getElementById('todo1').innerHTML = '';
    todos.forEach(todo => {
        const element = document.createElement('div')
        element.innerText = todo.task
        const span = document.createElement('span')
        span.innerText = 'X'
        span.id = todo.id
        let id = todo.id
        element.appendChild(span)
        const listItems = document.getElementById('todo1')
        listItems.appendChild(element)
        span.onclick = deleteData(id, todos)
    });
}