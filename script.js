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
    console.log('attempt');
    switch (document.querySelector('.content')?.id) {
        case 'projects':
            let smallestFont = 1.5;
            // save each project element into an array
            let projects = document.querySelectorAll(".project");
            // loop over array
            projects.forEach(p=>{
                // change img width to 26.9% of screen
                let newImgWidth = document.body.getBoundingClientRect().width * 0.269085
                p.querySelector('img').width = newImgWidth;
                p.querySelector('img').height = newImgWidth/(16/9);

                // set tech section to initial font size
                let techDiv = p.querySelector('div.tech');
                techDiv.style.fontSize = '1.5rem'

                // compare size of each txt element to first txt element
                let firstChild = techDiv.childNodes[0];
                techDiv.childNodes.forEach(e=>{
                    while (e.getBoundingClientRect().width != firstChild.getBoundingClientRect().width) {
                        // shrink current font by 0.1rem if elements do not match in size
                        newFont = techDiv.style.fontSize.split('rem')[0] - 0.1;
                        techDiv.style.fontSize = newFont+"rem";
                        // change smallestFont to newFont if newFront is smaller, otherwise do not change
                        smallestFont = (newFont<smallestFont)? newFont:smallestFont;
                    }
                });
            });
            projects.forEach(p=>{p.querySelector('div.tech').style.fontSize=smallestFont+'rem'});
        break;
    }
}
