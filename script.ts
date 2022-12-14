if (document.readyState !== 'loading') {start();} 
else {document.addEventListener('DOMContentLoaded', () => {start();});}

function start() {
    resizeSidebarButtons();
}

function resizeSidebarButtons() {
    let largestButtonSize = 0;
    document.querySelectorAll("#sidebar > button").forEach(elm=>{
        // set var to equal the width of the largest button
        let size = elm.clientWidth;
        largestButtonSize = (size>largestButtonSize)?size:largestButtonSize;
    });
    // resize all buttons to be approx as big as the biggest button
    document.querySelectorAll<HTMLElement>("#sidebar > button")
    .forEach(elm => {elm.style.width = `${largestButtonSize+6}px`});
}