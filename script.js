
"use strict"
let addNewbtn = document.querySelector("#add-new-btn")
let form = document.querySelector("form")
let editor = document.querySelector(".edit-form")
let editTasTitle = document.getElementById("edit-t-title")
let editTaskDate = document.getElementById("edit-t-date") 
let editTaskDesc = document.getElementById("edit-t-desc")
let closeEditForm = document.getElementById("close-edit-form")
let submitEditForm = document.getElementById("submit-edit-form")
let container = document.querySelector(".app-container")
let taskDisplay = document.querySelector(".task-display-container")
let tasTitle = document.getElementById("t-title")
let taskDate = document.getElementById("t-date") 
let taskDesc = document.getElementById("t-desc")
let closeForm
let titleError = document.querySelector(".title-error")

let taskData = []
let idNo = 0


addNewbtn.addEventListener("click", () => {
    if (!(editor)) {
        form.classList.toggle("no-display")
        return
    }
    editor.classList.forEach((x) => {
        if (x.includes("no-display"))
        form.classList.toggle("no-display")
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.parentElement.children[3])
    formValidation()
})

// CJECK IF FORM IS EMPTY

let emptyFormC = () => {
    if (taskDisplay.textContent === '' || taskData.length < 1) taskDisplay.innerHTML = `<p>There are no available tasks to display</p>`
}

//FORM VALIDATION

let formValidation = () => {
    if (tasTitle.value === "") {
        titleError.textContent = "Title cannot be blank"
    } else {
        titleError.textContent = ""
        store()
        createForm()
        // store()
        form.classList.add("no-display")
    }
}

let createForm = () => {

    taskDisplay.innerHTML = taskData.map((x,y) => {
        // console.log(x.id)
        return `<div class="task-display">
            <div>
                <h4 id="task-title">${x.title}</h4>
                <p id="date">${x.date}</p>
            </div>
            <p class="task-body">${x.desc}</p>
            <div id="${x.id}" class="edit-delete">
                <p class="edit-btn">Q</p>
                <p class="delete-btn">D</p>
            </div>
            </div>
            
            `
    }).join("")

    editor = document.querySelector(".edit-form")

    //ADD EVENT LISTENERS TO EDIT AND DELETE BUTTONS
    let deleteBtn = document.querySelectorAll(".delete-btn")
    let editBtn = document.querySelectorAll(".edit-btn")

    deleteBtn.forEach(function(x) {
        x.addEventListener("click", function() {
            deleteData(this)
        })
    })

    editBtn.forEach((x) => {
        x.addEventListener("click", function() {
            editData(this)
        })
    })
}

// // STORE NEW TASK

let store = () => {
    let array = ["eas","vew","qwd","qwf","qw","qwd"]
    let randSyn
    array.forEach((x) => {
       randSyn =  x[Math.floor(Math.random()*array.length)]
    })
    taskData.unshift({
        title: tasTitle.value,
        date: taskDate.value,
        desc: taskDesc.value,
        id: "id"+randSyn+Math.floor(Math.random() * 98238972893897)
    })
    
    createForm()
    clearForm()
    localStorage.setItem("data", JSON.stringify(taskData))
}

let clearForm = () => {
    tasTitle.value = ""
    taskDate.value = ""
    taskDesc.value = ""
    
}


let editData = (e) => {
    form.classList.forEach((x) => {
        // console.log(x)
        if (!(x.includes("no-display"))){
            console.log(e.parentElement)
            return
    } else {        
        editor.classList.toggle("no-display")
    }
    })
    // let editTasTitle = document.getElementById("edit-t-title")
    // let editTaskDate = document.getElementById("edit-t-date") 
    // let editTaskDesc = document.getElementById("edit-t-desc")
    // let closeEditForm = document.getElementById("close-edit-form")

    closeEditForm.addEventListener("click", () => {
        editor.classList.add("no-display")
    })

    // let submitEditForm = document.getElementById("submit-edit-form")

    submitEditForm.addEventListener("click", () => {
        formSubmitted()
        editor.classList.add("no-display")
    })


    let selectedTas = e.parentElement.parentElement
    editTasTitle.value = selectedTas.children[0].children[0].innerText
    editTaskDate.value = selectedTas.children[0].children[1].textContent
    editTaskDesc.value = selectedTas.children[1].textContent
    
    // deleteData(e)
}

let deleteData = (e) => {
    const clickedId = +(e.parentElement.id);
    taskData.splice(clickedId, 1)
    localStorage.setItem("data", JSON.stringify(taskData))
    e.parentElement.parentElement.remove()
    createForm()
    emptyFormC()
}

(() => {
    taskData = JSON.parse(localStorage.getItem("data")) || []; 
    // LOAD ANY AVAILABLE FORM DATA FROM LOCALSTORAE ON FIRST PAE LOAD
    createForm()
})()
emptyFormC()


