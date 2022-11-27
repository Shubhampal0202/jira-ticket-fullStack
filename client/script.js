let addBtn = document.querySelector('.add-button');
let removeBtn = document.querySelector('.remove-button');
let modalCont = document.querySelector('.modal-cont');
let mainCont = document.querySelector('.main-cont');
let textareaCont = document.querySelector('.textarea-cont');
let allPriorityColors = document.querySelectorAll('.priority-color');
let toolBoxColor = document.querySelectorAll('.color');



let colors = ['lightpink', 'lightblue', 'lightgreen', 'black'];
let modalPriorityColor = colors[colors.length - 1];
let addFlag = false;
let removeFlag = false;

let lockClass = 'fa-lock';
let unlockClass = 'fa-lock-open';
// handle toolBox color
let ticketsArr = [];
(async function () {
    ticketsArr = await getAllTicketFromDb();
    ticketsArr.forEach((ticket) => {
        const { _id, ticketColor, ticketTask, createdAt } = ticket
        createTicket(ticketColor, ticketTask, _id, createdAt);
    })
})()

for (let i = 0; i < toolBoxColor.length; i++) {
    toolBoxColor[i].addEventListener('click', (e) => {
        let currentToolBoxColor = toolBoxColor[i].classList[0];
        let filteredTickets = ticketsArr.filter((ticketObj, idx) => {
            return currentToolBoxColor === ticketObj.ticketColor;
        });
        // Remove  All previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }
        // Display new filtered tickets
        filteredTickets.forEach((ticketObj, idx) => {
            const { _id, ticketColor, ticketTask, createdAt } = ticketObj;
            createTicket(ticketColor, ticketTask, _id, createdAt);
        })
    })
    toolBoxColor[i].addEventListener('dblclick', (e) => {
        // Remove previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }
        ticketsArr.forEach((ticketObj, idx) => {
            const { _id, ticketColor, ticketTask, createdAt } = ticketObj;
            createTicket(ticketColor, ticketTask, _id, createdAt);
        })
    })
}


// listener for modal priority coloring
allPriorityColors.forEach((colorElem) => {
    colorElem.addEventListener('click', (e) => {
        allPriorityColors.forEach((priorityColorElem) => {
            priorityColorElem.classList.remove('border');
        })
        colorElem.classList.add('border');
        modalPriorityColor = colorElem.classList[0];


    })
})


addBtn.addEventListener('click', (e) => {
    // Display modal

    // if addFlag -> true -> display modal
    // if addFlag -> false -> remove modal
    addFlag = !addFlag;
    if (addFlag) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }

})

// listener for ticket removal
removeBtn.addEventListener('click', (e) => {
    console.log(removeFlag);
    removeFlag = !removeFlag;
    if (removeFlag) {
        removeBtn.style.backgroundColor = "#f03e3e"
    }
    else {
        removeBtn.style.backgroundColor = "#3d3d3d"
    }
})


//create ticket

modalCont.addEventListener('keydown', async (e) => {
    let Key = e.key;
    if (Key === 'Shift') {
        const newTicket = await createTicketInDb(modalPriorityColor, textareaCont.value);
        const { _id, ticketColor, ticketTask, createdAt } = newTicket;
        createTicket(ticketColor, ticketTask, _id, createdAt)
        addFlag = !addFlag;
        setModalToDefault();
    }
})

function createTicket(ticketColor, ticketTask, _id, createdAt) {
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class', 'ticket-cont');
    ticketCont.innerHTML = `
     <div class="ticket-color ${ticketColor}"></div>
     <div class="ticket-id">#${_id}</div>
     <div class="task-area">${ticketTask}</div>
     <div class="ticket-lock">
     <i class="fas fa-lock"></i>
     </div>
     `;
    mainCont.appendChild(ticketCont);

    let flag = ticketsArr.some((ticket) => {
        return ticket._id === _id
    })
    console.log("flag ", flag)
    if (!flag) {
        ticketsArr.push({ _id, ticketColor, ticketTask, createdAt })
    }
    console.log(ticketsArr.length);
    console.log(ticketsArr);
    handleRemoval(ticketCont, _id);
    handleLock(ticketCont, _id);
    handleColor(ticketCont, _id);
}

function handleRemoval(ticket, _id) {
    // removeFlag -> true -> remove
    ticket.addEventListener('click', async (e) => {
        if (!removeFlag) {
            return;
        }

        // DB removal
        await handleRemovalTicketInDb(_id)
        let ticketIdx = getTicketIdx(_id);
        ticketsArr.splice(ticketIdx, 1);
        console.log(">>>>>>> ", ticketsArr);
        // remove from UI
        ticket.remove();
    })

}

function handleLock(ticket, _id) {
    // ticket ke create hone ke baad ticket ke andar element ko retrieve kare
    // let ticketLockCont = document.querySelector('.ticket-lock');// wrong method multiple tickets 
    // creates hone ke baad work nhi karega
    let ticketLockCont = ticket.querySelector('.ticket-lock');
    let ticketLockElm = ticketLockCont.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLockElm.addEventListener('click', async (e) => {
        console.log("hiii");
        if (ticketLockElm.classList.contains(lockClass)) {
            ticketLockElm.classList.remove(lockClass);
            ticketLockElm.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", true);// if value of contenteditable
            // attribute is true then we can edit the content of ticket task area
        }
        else {
            ticketLockElm.classList.remove(unlockClass);
            ticketLockElm.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", false);
        }
        // modify data in database  (edit task area)

        if ((ticketTaskArea.getAttribute("contenteditable")) === "false") {
            const updatedTicket = await updateTicketInDb(_id, ticketTaskArea.innerHTML)
            let ticketIdx = getTicketIdx(_id);
            ticketsArr[ticketIdx] = updatedTicket;
        }
    })

}

// handle ticket color after completing the ticket
function handleColor(ticket, _id) {
    let ticketColor = ticket.querySelector('.ticket-color');
    ticketColor.addEventListener('click', async (e) => {

        let currentTicketColor = ticketColor.classList[1];
        let currentTicketColorIdx = colors.findIndex((color) => {
            return currentTicketColor === color;
        })
        currentTicketColorIdx++;
        newTicketColorIdx = currentTicketColorIdx % colors.length;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);

        // modify data in database (priority color change)
        const newTicket = await updateTicketColorInDb(_id, newTicketColor);
        // get ticketIdx from ticket Array
        let ticketIdx = getTicketIdx(_id);
        ticketsArr[ticketIdx] = newTicket;

    })
}

function getTicketIdx(_id) {
    let ticketIdx = ticketsArr.findIndex((ticketObj, idx) => {
        return ticketObj._id === _id;
    })
    return ticketIdx;
}


function setModalToDefault() {
    modalCont.style.display = 'none';
    textareaCont.value = "";
    modalPriorityColor = colors[colors.length - 1];
    allPriorityColors.forEach((priorityColorElem, idx) => {
        priorityColorElem.classList.remove('border');
    });
    allPriorityColors[allPriorityColors.length - 1].classList.add('border');
}
