// additions:
//  - force change projPos when resizing screen

let pos = 0; // hidden
let projPos = 0;

let xsmall = 360;    // count 1
let tablet = 750;    // count 2
let desktop = 1280;  // count 3
let ldesktop = 1440; // count 4

let width = tablet;
let count = 2;

let projects = [];
let adminLogin;
let AL_callback;


if (document.readyState !== 'loading') {start();} 
else {document.addEventListener('DOMContentLoaded', () => {start();});}

window.addEventListener('resize', ()=> {initializeProjects();});

function start() {
    getProjects();
    initEvents();
    // try to load initial project every 250ms until it has been fetched
    let waitForProjects = setInterval(()=>{
        if (projects.length>0) {
            setupProject(projects[0]);
            clearInterval(waitForProjects);
        } else console.log('waiting for projects...');
    },250);
}


function moveProjects() {
    let projDIV = document.querySelector(".projects");
    if (pos == 0) { // if projects are hidden
        projDIV.childNodes.forEach(elm => {
            elm.classList.add('unhidden');
            elm.classList.remove('hidden');
        });
        projDIV.classList.add('unhidden');
        projDIV.classList.remove('hidden');
        setTimeout(() => projDIV.scrollIntoView({behavior:"smooth"}), 800);
        pos = 1;
        // setTimeout(() => {resizeCanvas(pos);projDIV.style.zIndex='4'}, 1600);
    } else if (pos == 1) {
        projDIV.childNodes.forEach(elm => {
            elm.classList.add('hidden');
            elm.classList.remove('unhidden');
        });
        projDIV.classList.add('hidden');
        projDIV.classList.remove('unhidden');
        pos = 0;
        // resizeCanvas(pos);
        projDIV.style.zIndex='1';
    }
    
}

function getProjects() {
    let xhr = new XMLHttpRequest();
    let loc = window.location.href.includes("127.0.0.1") ? "https://javenp.com" : "";
    xhr.open("GET", loc+"/projects");
    xhr.send();

    xhr.onload = ( () => {
        if (xhr.status != 200) { // if response is not OK
            console.log(`Error: ${xhr.status}: ${xhr.statusText}\n Projects error`);
        } else {
            json = JSON.parse(xhr.responseText);
            projects = json.projects;
            initializeProjects();
            loadBubbles(projPos, count);
        }
    });
    
}

function initializeProjects() {
    let bubbles = document.querySelector(".projects .bubbles>.flex-container");
    while (bubbles.firstChild) {bubbles.removeChild(bubbles.firstChild);}
    if (window.innerWidth <= xsmall) {width = xsmall;}
    else if (window.innerWidth > xsmall && window.innerWidth <= tablet) {width = tablet;}
    else if (window.innerWidth > tablet && window.innerWidth <= desktop) {width = desktop;}
    else if (window.innerWidth > desktop) {width = ldesktop;}

    switch (width) {
        case xsmall:
            count = 1;
            break;
        case tablet:
            count = 2;
            break;
        case desktop:
            count = 3;
            break;
        case ldesktop:
            count = 4;
            break;
        default:
            count = 2;
    }

    if (projects.length < count) count = projects.length;
    for (let i = 0; i < count; i++) {
        d1 = document.createElement("div");
        d2 = document.createElement("div");
        d1.classList.add("border");
        d2.classList.add("squ");
        d2.id = i;
        d1.append(d2);
        bubbles.append(d1);
    }
    loadBubbles(projPos, count);
    // init(); // refresh canvas "floating" bubbles
}

function initEvents() {
    let projButtons = document.querySelectorAll(".projects .button");
    projButtons[0].addEventListener("click", () => {projButton("left")});
    projButtons[1].addEventListener("click", () => {projButton("right")});
    adminLogin = document.querySelector("#adminLogin");

    let tryLogin = "/";
    // find login page location
    // fetch("./admin/login/",{method:"HEAD"}).then((res)=>{if (!handleFetch(res)) {
        // fetch("./pages/admin/login/",{method:"HEAD"}).then((res)=>{if (!handleFetch(res)) {
        // console.error("Error: admin login page not found");
        // }});
    // }});
    AL_callback = ()=>{window.open(tryLogin,"_self")}
    // show admin login when holding LAlt
    document.addEventListener("keyup", (ev)=>{if (ev.key=="Shift") toggleLogin()});

    function handleFetch(r){if (r.status==200){tryLogin=r.url;return true} else return false;}
}

function loadBubbles(startPos, count) {
    let bubbles = document.querySelector(".projects .bubbles>.flex-container");
    let items = [];
    for (let i = startPos; i < startPos + count; i++) {
        items.push(projects[i]);
    }
    for (let x = 0; x < count; x++) {
        bubbles.children[x].querySelector(`.squ`).style.backgroundImage = items[x].preview;
        bubbles.children[x].querySelector(`.squ`).style.backgroundSize = '100%';
        bubbles.children[x].addEventListener("click", () => {setupProject(items[x])});
    }
}

function setupProject(obj) {
    let project = document.querySelector("#content");
    project.querySelector("img").src = `img/${obj.source}.png`;
    project.querySelector("#proj-desc>#title").innerHTML = obj.title;
    project.querySelector("#proj-desc>#desc").innerHTML = obj.desc;
    buttons = project.querySelector("#proj-desc>#buttons");
    buttons.children[0].onclick = () => {window.open(obj.url)};
    buttons.children[1].onclick = () => {window.open(`https://github.com/Jalapo/${obj.source}`)};

}

function projButton(button) { // button: string [left || right] 
    if (button == "left") {
        if (projPos - count < 0) {
            projPos = 0;
        } else {
            projPos -= count;
        }
    } else if (button == "right") {
        if (projPos + (2*count) - 1 > projects.length-1) {
            projPos = projects.length-count;
        } else {
            projPos += count;
        }
    }
    loadBubbles(projPos, count);
}

function toggleLogin() {
    // hide login button
    if (adminLogin.classList.toggle('hidden')) {
        adminLogin.removeEventListener("click", AL_callback);
        console.log('toggle off');
    }// toggle visibility of login button 
    else {
        adminLogin.addEventListener("click", AL_callback);
        console.log('toggle on');

    }
}