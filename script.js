
"use strict"
let addNewbtn = document.querySelector("#add-new-btn")
let form = document.querySelector("form")
let closeForm = document.getElementById("close-form")
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

closeForm.addEventListener("click", () => {
    form.classList.toggle("no-display")
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

let arrayRand = ["-eas-","-vew-","-qwd-","-qwf-","-qw-","-qwd-"]
let store = () => {
    
    taskData.unshift({
        title: tasTitle.value,
        date: taskDate.value,
        desc: taskDesc.value,
        id: "id"+arrayRand[Math.floor(Math.random()*arrayRand.length)]+Math.floor(Math.random() * 98238972893897)
    })
    
    createForm()
    clearForm()
    console.log(taskData)
    localStorage.setItem("data", JSON.stringify(taskData))
}

let clearForm = () => {
    tasTitle.value = ""
    taskDate.value = ""
    taskDesc.value = ""
    
}

let IdClick
let editData = (e) => {
    form.classList.forEach((x) => {
        // console.log(x)
        if (!(x.includes("no-display"))){
            return
    } else {        
        editor.classList.toggle("no-display")
        IdClick = e.parentElement
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
        updateSubmittedForm(IdClick)
        editor.classList.add("no-display")
    })


    let selectedTas = e.parentElement.parentElement
    editTasTitle.value = selectedTas.children[0].children[0].innerText
    editTaskDate.value = selectedTas.children[0].children[1].textContent
    editTaskDesc.value = selectedTas.children[1].textContent
    
    // deleteData(e)
}

let updateSubmittedForm = (e) => {
    let task = taskData.find((x) => x.id === e.id)
    let index = taskData.findIndex((x) => x.id === task.id)

    taskData[index].title = editTasTitle.value
    taskData[index].date = editTaskDate.value
    taskData[index].desc = editTaskDesc.value
    
    localStorage.setItem("data", JSON.stringify(taskData))
    taskData.unshift(taskData.splice(index, 1)[0]);
    createForm()

}

let deleteData = (e) => {
    const clickedId = e.parentElement.id;
    let i = taskData.findIndex((x) => x.id === clickedId)
    taskData.splice(i, 1)
    console.log(e.parentElement)
    // taskData.splice(clickedId, 1)
    localStorage.setItem("data", JSON.stringify(taskData))
    e.parentElement.remove()
    createForm()
    emptyFormC()
}

(() => {
    taskData = JSON.parse(localStorage.getItem("data")) || []; 
    // LOAD ANY AVAILABLE FORM DATA FROM LOCALSTORAE ON FIRST PAE LOAD
    createForm()
})()
emptyFormC()


