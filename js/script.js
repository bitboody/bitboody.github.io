// Get machine cores

const coresNum = document.getElementById("cores");
coresNum.innerText = `CPU Cores: ${navigator.hardwareConcurrency}`;

// Move windows

let mouseMove = false;
const code = 112;

onkeydown = (e) => {
    if (e.keyCode == code && !mouseMove) {
        mouseMove = true;
    }

    else if (e.keyCode == code && mouseMove) {
        mouseMove = false;
    }
}

const els = document.querySelectorAll(".move");
els.forEach((name) => {
    dragElement(name);
});

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        if (mouseMove) document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Change tabs

function toggleTabs(project) {
    const btn1 = document.getElementById("projects").querySelector("#btn1");
    const btn2 = document.getElementById("projects").querySelector("#btn2");
    const btn3 = document.getElementById("projects").querySelector("#btn3");

    const firstProject = document.getElementById("project-1");
    const secondProject = document.getElementById("project-2");
    const thirdProject = document.getElementById("project-3");

    if (project == 1) {
        btn1.setAttribute("aria-selected", "true");
        btn2.setAttribute("aria-selected", "false");
        btn3.setAttribute("aria-selected", "false");

        firstProject.style.display = "block";
        secondProject.style.display = "none";
        thirdProject.style.display = "none";
    }

    if (project == 2) {
        btn1.setAttribute("aria-selected", "false");
        btn2.setAttribute("aria-selected", "true");
        btn3.setAttribute("aria-selected", "false");

        firstProject.style.display = "none";
        secondProject.style.display = "block";
        thirdProject.style.display = "none";
    }

    if (project == 3) {
        btn1.setAttribute("aria-selected", "false");
        btn2.setAttribute("aria-selected", "false");
        btn3.setAttribute("aria-selected", "true");

        firstProject.style.display = "none";
        secondProject.style.display = "none";
        thirdProject.style.display = "block";
    }
}

// Dynamic clock

const clock = document.getElementById("clock");

setInterval(() => {
    clock.innerText = new Date().toLocaleTimeString();
}, 1000)

// Opening windows 

function openWindow(e) {
    w = document.getElementById(e);
    wButton = e.split("-").reverse().pop() + "-button"
    // window.classList.add("active");

    w.style.display = "block";

}

// Closing windows

function closeWindow(e) {
    w = document.getElementById(e);

    w.style.display = "none";
}