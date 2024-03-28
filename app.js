const todoInput = document.querySelector(".todo-input")
const add =document.getElementById("add-button")
const messageBoxs = document.getElementById("messageBoxs")
const todoList = document.querySelector(".todoList-wrapper")
const doneList =document.querySelector(".listDone")

let todo;
let addTodo=[];
let getTodo=[];
let done=[] 





document.addEventListener("click",(e)=>{
    addDoneList(e)
})

document.addEventListener("DOMContentLoaded",pageLoaded())

document.addEventListener("keypress",(e)=>{
    if (e.key==="Enter"){
        run();
    }

})

add.addEventListener("click",()=>{
    run();
})

// listeye eklemek için
function addTodoList(todo){
// !alternatif yöntem daha uzun olduğu için diğerini kullandım
    // let div = document.createElement("div")
    // div.className="todo list";
    // let inputList = document.createElement("input")
    // inputList.className="todo-input"
    // inputList.type="text"
    // inputList.disabled=true;
    // inputList.value=`${todo}`
    // let checkbox =document.createElement("input")
    // checkbox.type="checkbox"
    // checkbox.className="checkbox"
    // div.appendChild(inputList)
    // div.appendChild(checkbox)
    // todoList.appendChild(div)

    addTodo.push(`<div class="todo list">
        <input type="text" class="todo-input" disabled value="${todo}">
        <input type="checkbox" class="checkbox"  >
        </div> `)
    todoList.innerHTML=addTodo.join("")
}
// uyarı metni
function messageBox(className,message){
    messageBoxs.innerHTML=`
    <span class="${className} messageBox">${message}</span>
     `
    //  2 sn sonra silinmesi için
    setTimeout(() => {
       messageBoxs.innerHTML="" 
    }, 2000);

}

// tamamlananlar listesi silme ve ekleme
function addDoneList(e){
    if (e.target.className==="checkbox"){
        
    let deleteTodo = e.target.parentElement
    
    
    
    
    done.push(`<div class="todo list"><input type="text" class="todo-input done" disabled value="${deleteTodo.children[0].value}" >
    
    </div> ` )
    
    
    setTimeout(() => {
        deleteTodo.remove()
        doneList.innerHTML=done.join("")
    }, 1000);
}


}

// localStorage e eklemek için
function addLocalStorage(newTodo){
    getLocalStorage();
    getTodo.push(newTodo)

    localStorage.setItem("list",JSON.stringify(getTodo))    
}
// localStorage den kayıtları almak için 
function getLocalStorage(){
    if (JSON.parse(localStorage.getItem("list"))!=null ){
        

        getTodo=(JSON.parse(localStorage.getItem("list")))
        
        
    }else{
        getTodo=[];
    }
    
}

function run(){
    todo=todoInput.value.trim()
        if (todo!=""){

            addTodoList(todo);
            addLocalStorage(todo)
            getLocalStorage();
            messageBox("success","Liste Başarılı şekilde eklendi")
            todoInput.value=""
        }else{
            messageBox("danger","lütfen boş bırakmayınız");
        }

}

// sayfa yükelndiğinde yapılacaklar listesinin gelmesi için
function pageLoaded(){
    getLocalStorage()
    getTodo.forEach(function(todo){
        addTodoList(todo);
    });
}
function deleteAll(){
    if (todoList.innerHTML!=""){

        addTodo=[];
        todoList.innerHTML=""
        doneList.innerHTML=""
        localStorage.setItem("list",JSON.stringify(addTodo))
        
    }else {
        messageBox("danger","Silmek için en az bir yapılcak eklemeniz gerek")

    }

}