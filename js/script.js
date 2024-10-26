// Move windows
let mouseMove = true;
const code = 77;

onkeydown = (e) => {
  if (e.ctrlKey && e.keyCode == code && !mouseMove) {
    mouseMove = true;
  } else if (e.ctrlKey && e.keyCode == code && mouseMove) {
    mouseMove = false;
  }
};

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
  const buttons = document.querySelectorAll("#projects menu button");
  const projects = document.querySelectorAll("#projects article");

  // Iterate over buttons and projects to toggle visibility
  buttons.forEach((button, index) => {
    button.setAttribute("aria-selected", index == project);
    projects[index].style.display = index == project ? "block" : "none";
  });
}

// Dynamic clock
const clock = document.getElementById("clock");

setInterval(() => {
  clock.innerText = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}, 1000);

// Toggling windows
function toggleWindow(e, mode) {
  const w = document.getElementById(e);
  const wButton = document.getElementById(
    e.split("-").reverse().pop() + "-button"
  );

  console.log(e.split("-").reverse().pop() + "-button");
  if (mode == "close") {
    wButton.style.display = "none";
  } else {
    wButton.style.display = "block";
  }

  if (w.style.display == "none") {
    w.style.display = "block";
    w.className += " active";
  } else {
    w.style.display = "none";
  }
}

// Maximizing windows
let maximized = false;
let tWidth, tHeight, tFont, tZIndex;
let temp;

const resolutions = new Map();

function maximizeWindow(e) {
  w = document.getElementById(e);
  const body = document.getElementById(e.split("-").reverse().pop() + "-body");

  if (!maximized) {
    console.log(e);
    resolutions.set(e + "width", w.style.width);
    resolutions.set(e + "height", w.style.height);
    resolutions.set(e + "font", w.style.fontSize);

    w.style.width = "100vw";
    w.style.height = "100vh";

    w.style.fontSize = "240%";

    if (e == "browser-window") {
      const body = document.getElementById(
        e.split("-").reverse().pop() + "-body"
      );

      resolutions.set(body + "width", body.style.width);
      resolutions.set(body + "height", body.style.height);

      body.style.width = "100vw";
      body.style.height = "calc(100vh - 55px)";
    }

    maximized = true;
    temp = e;
  } else if (e == temp) {
    w.style.width = resolutions.get(e + "width");
    w.style.height = resolutions.get(e + "height");
    w.style.fontSize = resolutions.get(e + "font");
    maximized = false;

    if (e == "browser-window") {
      body.style.width = body.style.width = resolutions.get(body + "width");
      body.style.height = body.style.width = resolutions.get(body + "width");
    }
  }
}

// Last window on top
const projects = document.getElementById("projects-container");
const cmd = document.getElementById("cmd-container");
const network = document.getElementById("network-container");
const browser = document.getElementById("browser-container");
const guestbook = document.getElementById("guestbook-container");

let baseZIndex = 1;
let tempElement;

function windowOnTop(e) {
  if (e != tempElement) {
    baseZIndex++;
    e.style.zIndex = baseZIndex;
  }
  tempElement = e;
}

projects.addEventListener("mousedown", () => windowOnTop(projects));
cmd.addEventListener("mousedown", () => windowOnTop(cmd));
network.addEventListener("mousedown", () => windowOnTop(network));
browser.addEventListener("mousedown", () => windowOnTop(browser));
guestbook.addEventListener("mousedown", () => windowOnTop(guestbook));

// Double click icon
let clickTimeout,
  tempIcon,
  clickCount = 0;
const clickSound = new Audio("assets/audio/click.mp3");

function doubleClick(e, link) {
  const icon = document.getElementById(e);

  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
  }

  icon.style.backgroundColor = "#99D1FF99";
  icon.style.borderColor = "#99D1FF";
  clickCount++;
  if (tempIcon == e) {
    if (clickCount > 1) {
      if (link != "toggle") {
        window.open(link);
      } else {
        toggleWindow(e + "-window");
      }
      icon.style.backgroundColor = "#99D1FF00";
      icon.style.borderColor = "#99D1FF00";
      clickSound.play();
      clickCount = 0;
      return;
    }
  }

  clickTimeout = setTimeout(() => {
    clickCount = 0;
  }, 500);
  tempIcon = e;
}

// Minimum screen width alert
const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

if (width < 805) {
  window.alert(
    "Warning:\nThis website is optimized for devices with a minimum screen width of 805px and may not perform optimally on your current device.\n\nFor the best experience and full functionality, we recommend accessing this site on a computer."
  );
}
