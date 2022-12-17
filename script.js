var resizing = false;

if (document.readyState !== 'loading') {start();} 
else {document.addEventListener('DOMContentLoaded', () => {start();});}

function start() {
    setTimeout(()=>{
        let imgs = ['color-test.png','circle-catcher.png','savedlinks.png'];
        for (let i in imgs) {fetch(`./img/${imgs[i]}`)}
    }, 1200);
    initSidebarButtons();
    let id = document.querySelector(".content")?.id;
    switch (id) {
        case 'contacts': 
            preventImgClicks();
            break;
    }
    // render initial page if id is not null
    if (id) reactRender(id);
    window.addEventListener("resize", resize);
}

function handleContactClick(goto) {
    switch (goto) {
        case 'gh': window.open("//github.com/Jalapo"); break;
        case 'ln': window.open("//linkedin.com/in/javen-porter"); break;
    }
}

function preventImgClicks() {
    document.querySelectorAll("#contact>#links img").forEach(elm=>{
        elm.addEventListener("click", (e)=>{e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();});
    })
}

function initSidebarButtons() {
    initSelect();
    let largestButtonSize = 0;
    document.querySelectorAll("#sidebar > button").forEach(elm=>{
        // set var to equal the width of the largest button
        let size = elm.clientWidth;
        largestButtonSize = (size>largestButtonSize)?size:largestButtonSize;
        // setup events for buttons
        setupEvents(elm);
    });
    // resize all buttons to be approx as big as the biggest button
    document.querySelectorAll("#sidebar > button")
    .forEach(elm => {elm.style.width = `${largestButtonSize+6}px`});


    function initSelect() {
        let e = document.getElementById("sel");
        let bttns = document.querySelectorAll("#sidebar>button");
        // let cDiv = document.querySelector<HTMLElement>(".content");
        let cDiv = document.querySelector(".content");

        // if a button is selected in HTML
        if (e) {
            // select(e);
            // iterate over all sidebar buttons
            bttns.forEach((elm,index)=>{
                //  change content page to match selected button
                if (elm.id == "sel" && cDiv) {switch (index) {
                    case 0: cDiv.id='about'; break;
                    case 1: cDiv.id='projects'; break;
                    case 2: cDiv.id='contact'; break;
                }}
            });
        }

        // if no button is selected, try finding current content page 
        else if (cDiv?.id != '' && cDiv?.id != null) {switch (cDiv.id) {
            case 'about': bttns[0].id = 'sel'; break;
            case 'projects': bttns[1].id = 'sel'; break;
            case 'contact': bttns[2].id = 'sel'; break;
        }}

        // select first button and page if nothing is set initially
        else if (cDiv?.id != null) {
            cDiv.id = 'about';
            bttns[0].id = 'sel';
        }
    }

    function setupEvents(elm) {
        // select button when clicked
        elm.addEventListener("click", ()=>select(elm));
        // handle changing color of currently selected button when another button is being hovered over
        elm.addEventListener("mouseover", (e)=>hoverButton(1,e));
        elm.addEventListener("mouseleave", (e)=>hoverButton(0,e));
    }

    function hoverButton(action, ev) {
        let selectedBttn = document.getElementById("sel");
        if (!selectedBttn) throw "No button selected";
        // on hover of a different button, change currently selected button to default properties
        selectedBttn.style.backgroundColor = (action && selectedBttn!=ev.target) ? 'hsla(0deg,0%,50%,10%)' : '';
        selectedBttn.style.transform = (action && selectedBttn!=ev.target) ? 'translateX(-4rem)' : '';
    }
}

function select(elm) {
    // unselect currently selected button if one exists
    let sBttn = document.getElementById("sel");
    if (sBttn) sBttn.id = sBttn.style.transform = sBttn.style.backgroundColor = '';
    // select clicked button
    elm.id = 'sel';

    //
    let bttns = document.querySelectorAll("#sidebar>button");
    let cDiv = document.querySelector(".content");
    bttns.forEach((btn,index)=>{
        //  change content page to match selected button
        if (btn.id == "sel") {switch (index) {
            case 0: cDiv.id='about'; break;
            case 1: cDiv.id='projects'; break;
            case 2: cDiv.id='contact'; break;
        }}
    });
    reactRender(cDiv.id);
}

function resize() {
    if (resizing) throw 'resizing';
    resizing = true;
    switch (document.querySelector('.content')?.id) {
        case 'about':
            let center = document.querySelector('#center_sec');
            let pageHeight = document.body.clientHeight;
            
            // check if button is below screen
            let icon = center.querySelector('.icons>div:nth-child(1)');
            let button = document.querySelector('#center_sec> button');
            center.querySelectorAll("p").forEach(e=>e.style.fontSize='1.5rem');
            let limit = 0.5;
            let stop = false;
            while (icon && icon.getBoundingClientRect().bottom > pageHeight) {
                if (stop) break;
                console.log('while loop');
                // shrink font of each paragraph until button fits
                center.querySelectorAll("p").forEach(e=>{
                    let font = e.style.fontSize;
                    if (font.split('rem')[0] - 0.1 > limit) {
                        e.style.fontSize = font.split('rem')[0]-0.1 + 'rem';
                    } else stop=true;
                });
            }
            break;
            // /*
        case 'projects':
            let smallestFont = 1.5;
            // save each project element into an array
            let projects = document.querySelectorAll(".project");

            // push all title sizes to array
            let titleSizes = [];
            projects.forEach(p=>{titleSizes.push(p.querySelector('.title').getBoundingClientRect().height)});

            // grab first title size and compare to all
            let init=titleSizes[0];

            // initialize vars for default font size (should be equal to css value, but will probably override it)
            let font = 1.5;
            projects.forEach(p=>{p.querySelector(".title").style.fontSize = '1.5rem'});

            // check if difference between sizes of first title and iterated title is significant
            for (let i in titleSizes) {
                while (Math.abs(init-titleSizes[i]) > init*0.2) {
                    // if so, adjust font size and set titles to new font
                    console.log('init: ' + init);
                    console.log(`#%d: %d`, i, titleSizes[i]);
                    font-=0.1;
                    // select each project
                    for (let x=0;x<projects.length;x++) {
                        let p = projects[x];
                        // change the font size of the project title to the newly adjusted size and save to titleSizes array
                        let title = p.querySelector(".title");
                        title.style.fontSize = font+'rem';
                        titleSizes[x] = title.getBoundingClientRect().height;
                    }
                }
                // set all project title sizes to new (or default) size
                projects.forEach((p,x)=>{
                    p.querySelector(".title").style.fontSize = font + 'rem';
                    titleSizes[x] = p.querySelector(".title").getBoundingClientRect().height;
                });
                // ... and initial title size
                init = titleSizes[0];
            }
            // prevent font size reverting from constant refreshing
            if (font != 1.5) {
                setTimeout(()=>{projects.forEach(p=>{p.querySelector(".title").style.fontSize = font+'rem'})},40);
            }
        break;
    }
    // prevention of size reversion and over execution
    setTimeout(()=>{resizing = false},10)
}

// handle hovering over skills on 'About' page
function updateLabel(elm, action) {
    // console.log(elm);
    // action can be passed as [0,1] or ['hide','show']
    if (typeof action == 'string') {
        if (action == 'show' || action == 'hide') {
            switch (action) {
            case 'show': action = 1; break;
            case 'hide': action = 0; break;
            }
        }
    }
    // if (action != 0 || action != 1) throw 'action input not valid';
    // find label in passed element (img_holder)
    let label = elm.querySelector(".skill_label");
    if (label) {
        switch (action) {
            case 1: label.style.visibility = 'visible'; break;
            case 0: label.style.visibility = 'hidden'; break;
        }
    }
}
