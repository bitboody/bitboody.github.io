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
    clock.innerText = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}, 1000)

// Toggling windows

function toggleWindow(e) {
    w = document.getElementById(e);

    wButton = (e.split("-").reverse().pop() + "-button");


    if (w.style.display == "none") {
        w.style.display = "block";
        // wButton.classList.add("active");
        w.className += " active";
    } else {
        w.style.display = "none";
        // wButton.classList.remove("active");

    }

}

// Maximizing windows

let maximized = false;
let tWidth, tHeight, tFont, tZIndex;
let temp;

const resolutions = new Map();

function maximizeWindow(e) {
    w = document.getElementById(e);
    const container = document.getElementById((e.split("-").reverse().pop() + "-container"));

    if (!maximized) {
        resolutions.set(e + "width", w.style.width);
        resolutions.set(e + "height", w.style.height);
        resolutions.set(e + "font", w.style.fontSize);
        resolutions.set(e + "zIndex", w.style.zIndex);

        w.style.width = "100vw";
        w.style.height = "100vh";

        w.style.fontSize = "240%";

        container.style.zIndex = 100;

        maximized = true;
        temp = e;
    } else if (e == temp) {
        w.style.width = resolutions.get(e + "width");
        w.style.height = resolutions.get(e + "height");
        w.style.fontSize = resolutions.get(e + "font");
        container.style.zIndex = resolutions.get(e + "zIndex");
        maximized = false;
    }
}

function windowOnTop(e) {
    w = document.getElementById(e);
    w.style.zIndex += 5;
}