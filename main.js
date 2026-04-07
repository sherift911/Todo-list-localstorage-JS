let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskesDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".deletee")

// empty array to store the tasks
let tasks = [];
//check if there's tasks in local storage
if(localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"));
};

//get data
getDataFromLocalStorage();

// function to add task to array
function addTaskToArray(inputValue  /*parameter/*/){
// JSON task
    let task = {
        id: Date.now(),
        title: inputValue,
        completed : false,
    };
    // puss task to Array
    tasks.push(task);
    // add tasks to page
    addTasksToPage(tasks /*argument*/);    //trigger function
    // add tasks to localStorage
    addDataToLocalStorage(tasks);          // trigger
}

// function to add tasks to page

function addTasksToPage(tasks /*parameter*/){
    // empty the tasks div
    taskesDiv.innerHTML = "";
    // looping on Array tasks
    tasks.forEach(function(task /*elements*/){
        let div = document.createElement("div");
        div.className = "task";
        // check if Task is done
        if(task.completed /*true*/){
            div.classList = "task done";
        }
        // custom attribute for each div
        div.setAttribute("data-id", task.id);
        // append text in div
        div.appendChild(document.createTextNode(task.title));
        //create delete button
        let span = document.createElement("span");
        span.className = "span";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // Add task div to container
        taskesDiv.appendChild(div);
    });
};

function addDataToLocalStorage(tasks){
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let taskss = JSON.parse(data);
        addTasksToPage(taskss);
    }
};

function deleteTaskWith(taskId){
    tasks = tasks.filter( function(task){
        return task.id !== taskId;
    });
    addDataToLocalStorage(tasks);
};


// Add task

submit.addEventListener("click", function(){
    if(input.value){
        //Add input data to array
        addTaskToArray(input.value  /*argument*/)      //function trigger
        // remove input value after submit
        input.value = "";
    }
});

// click on task div

taskesDiv.addEventListener("click", (Event)=>{
    //Delete button
    if(Event.target.classList.contains("span")){
        // remove task from local storage
        deleteTaskWith(Number(Event.target.parentElement.getAttribute("data-id")));
        // remove Element from page
        Event.target.parentElement.remove()
    }
});

// delete all button

deleteAll.addEventListener("click", ()=>{
    taskesDiv.innerHTML = "";
    window.localStorage.removeItem("tasks");
});







