
"use strict"
let addNewbtn = document.querySelector("#add-new-btn")
let form = document.querySelector("form")
let container = document.querySelector(".app-container")
let taskDisplay = document.querySelector(".task-display-container")
let tasTitle = document.getElementById("t-title")
let taskDate = document.getElementById("t-date") 
let taskDesc = document.getElementById("t-desc")
let titleError = document.querySelector(".title-error")


let taskData = []

addNewbtn.addEventListener("click", () => {
    form.classList.toggle("no-display")
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    formValidation()
    createForm()
})

// CJECK IF FORM IS EMPTY

let emptyFormC = () => {
    if (taskDisplay.textContent === '' || taskData.length < 1) taskDisplay.innerHTML = `<p>There are no available tasks to display</p>`
}
emptyFormC()

//FORM VALIDATION

let formValidation = () => {
    if (tasTitle.value === "") {
        titleError.textContent = "Title cannot be blank"
    } else {
        titleError.textContent = ""
        store()
        form.classList.add("no-display")
        acceptData()
    }
}


let acceptData = () => {
    let data = {}
    data["title"] = tasTitle.value
    data["date"] = taskDate.value
    data["desc"] = taskDesc.value
    createForm()
    clearForm()
}

let createForm = () => {

    taskDisplay.innerHTML = taskData.map((x,y) => {
        console.log(y)
        return `<div class="task-display">
            <div>
                <h4 id="task-title">${x.title}</h4>
                <p id="date">${x.date}</p>
            </div>
            <p class="task-body">${x.desc}</p>
            <div id="${x.id}" class="edit-delete">
                <p class="edit-btn">Q</p>
                <p class="delete-btn" >D</p>
            </div>
            </div>`
    }).join("")

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
    taskData.unshift({
        title: tasTitle.value,
        date: taskDate.value,
        desc: taskDesc.value,
        id: Math.floor(Math.random() * 876235532)
    })

    localStorage.setItem("data", JSON.stringify(taskData))
}

let clearForm = () => {
    tasTitle.value = ""
    taskDate.value = ""
    taskDesc.value = ""
    
}

let editData = (e) => {
    let selectedTas = e.parentElement.parentElement
    form.classList.toggle("no-display")
    console.log(selectedTas.children[0].textContent)
    tasTitle.value = selectedTas.children[0].textContent
    taskDate.value = selectedTas.children[1].textContent
    taskDesc.value = selectedTas.children[2].textContent
    selectedTas.remove()
}

let deleteData = (e) => {
    const clickedId = +(e.parentElement.id);
    console.log(clickedId, e.parentElement.id)
    taskData = taskData.filter((item) => item.id !== clickedId)
    localStorage.setItem("data", JSON.stringify(taskData))
    e.parentElement.parentElement.remove()
    emptyFormC()
    createForm()
    console.log(e)
}

(() => {
    taskData = JSON.parse(localStorage.getItem("data")); 
    // LOAD ANY AVAILABLE FORM DATA FROM LOCALSTORAE ON FIRST PAE LOAD
    createForm()
})()








// `<div  id="${x.id}" class="task-display">
//                         <h4 id="task-title">${x.title}</h4>
//                         <p id="date">${x.date}</p>
//                         <p class="task-body">${x.desc}</p>
//                 <div class="edit-delete">
//                         <p class="edit-btn">Q</p>
//                         <p class="delete-btn" >D</p>
//                 </div>
//                 <div id="${x.id}" class="edit-form no-display">
//                         <label for="edit-form">Title: 
//                             <input type="text" class="edit-title" name="title" value="${x.title}">
//                         </label>
//                         <label for="new-date">Date: 
//                             <input type="date" name="new-date" class="new-date" value="${x.date}">
//                         </label>
//                         <textarea name="new-desc" class="new-desc" placeholder="123" value="1213" cols="10" rows="4"></textarea>
//                         <button class="edit-update">Edit</button>
//                 </div>
//             </div>`



















































// SECOND CODE INSTANCE 

// let addNewbtn = document.querySelector("#add-new-btn");
// let form = document.querySelector("form");
// let taskDisplay = document.querySelector(".task-display-container");
// let tasTitle = document.getElementById("t-title");
// let taskDate = document.getElementById("t-date");
// let taskDesc = document.getElementById("t-desc");
// let titleError = document.querySelector(".title-error");
// let taskData = [];

// addNewbtn.addEventListener("click", () => {
//     form.classList.toggle("no-display");
// });

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     formValidation();
// });

// // Check if form is empty
// let emptyFormC = () => {
//     if (taskData.length === 0) {
//         taskDisplay.innerHTML = `<p>There are no available tasks to display</p>`;
//     }
// };

// // Form validation
// let formValidation = () => {
//     if (tasTitle.value === "") {
//         console.log("failed");
//         titleError.textContent = "Title cannot be blank";
//     } else {
//         console.log("success");
//         titleError.textContent = "";
//         store();
//         acceptData();
//         form.classList.add("no-display");
//         uploadData();
//     }
// };

// let data = {};

// let acceptData = () => {
//     data["title"] = tasTitle.value;
//     data["date"] = taskDate.value;
//     data["desc"] = taskDesc.value;
//     console.log(data);
//     clearForm();
// };

// let uploadData = () => {
//     taskDisplay.innerHTML = taskData.map((x) => {
//         return `<div class="task-display" data-id="${x.id}">
//             <h4 id="task-title">${x.title}</h4>
//             <p id="date">${x.date}</p>
//             <p class="task-body">${x.desc}</p>
//             <div class="edit-delete">
//                 <p id="edit-btn">Q</p>
//                 <p onClick="deleteData(${x.id})"class="delete-btn">D</p>
//             </div>
//         </div>`;
//     }).join("");

//     // Add event listener for delete buttons
//     let deleteButtons = document.querySelectorAll('.delete-btn');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             deleteData(button.parentElement.parentElement.getAttribute('data-id'));
//         });
//     });
// };

// // Store new task
// let store = () => {
//     taskData.unshift({
//         title: tasTitle.value,
//         date: taskDate.value,
//         desc: taskDesc.value,
//         id: Math.floor(Math.random() * 876235532)
//     });
//     console.log(taskData);
// };

// let clearForm = () => {
//     tasTitle.value = "";
//     taskDate.value = "";
//     taskDesc.value = "";
// };

// let deleteData = (taskId) => {
//     // Update taskData to exclude the item with the matching id
//     taskData = taskData.filter((item) => item.id !== taskId);
//     uploadData();
//     emptyFormC();
// };






































// let ids= [1234,2345,3456,4567,53132]
// let dataArray = [
//     {
//         name: "Newman",
//         id: ids[0]
//     },
//     {
//         name: "Bow",
//         id: ids[1]
//     },
//     {
//         name: "David",
//         id: ids[2]
//     },
//     {
//         name: "Oldman",
//         id: ids[3]
//     },
//     {
//         name: "Daniel",
//         id: ids[4]
//     }
// ]

// let deleteRandomItem = () => {
//     dataArray = dataArray.filter((x) => x.id !== ids[Math.floor(Math.random() * 5)])
//     console.log(dataArray)
// }
// deleteRandomItem()