const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList"),
finTodoList = document.querySelector('.fin-toDoList');

const TODOS_LS = "toDos";
const FIN_LS = 'finished';
let toDos = [];
let finished = [];

function filterFn(toDo){
    return toDo.id === 1
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function moveTodoToFin(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    const finTodos = toDos.filter(function(todo){
        return todo.id === parseInt(li.id);
    })
    console.log(cleanToDos)
    toDos = cleanToDos;
    saveToDos();
    
    paintFinTodo(finTodos[0].text);
}

function paintToDo(text){
    const li= document.createElement("li");
    const delBtn =document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML="❌";
    checkBtn.innerHTML="✅";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.addEventListener("click", moveTodoToFin)
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    console.log(toDo.text);
}

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedToDos =JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text);
        });  
    }

    const finTodos = localStorage.getItem(FIN_LS);
    if(finTodos !== null) {
        const parsedTodos = JSON.parse(finTodos);
        parsedTodos.forEach(function(toDo) {
            paintFinTodo(toDo.text);
        })
    }
}

function moveTodoToPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finTodoList.removeChild(li);
    const cleanToDos = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    const pendingTodos = finished.filter(function(todo){
        return todo.id === parseInt(li.id);
    })
    console.log(pendingTodos)
    finished = cleanToDos;
    saveFinToDos();
    
    paintToDo(pendingTodos[0].text);
}

function paintFinTodo(text) {
    const li= document.createElement("li");
    const delBtn =document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finished.length + 1;
    delBtn.innerHTML="❌";
    checkBtn.innerHTML="⏪";
    delBtn.addEventListener("click", deleteFinToDo);
    checkBtn.addEventListener('click', moveTodoToPending)
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    finTodoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    finished.push(toDoObj);
     saveFinToDos();
}

function deleteFinToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    finTodoList.removeChild(li);
    const cleanToDos = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanToDos
    saveFinToDos();
}

function saveFinToDos(){
    localStorage.setItem(FIN_LS, JSON.stringify(finished));
}

function init(){
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
};

init();
