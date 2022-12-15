if (document.readyState !== 'loading') {
    start();
}
else {
    document.addEventListener('DOMContentLoaded', function () { start(); });
}
function start() {
    initSidebarButtons();
}
function initSidebarButtons() {
    var largestButtonSize = 0;
    document.querySelectorAll("#sidebar > button").forEach(function (elm) {
        // set var to equal the width of the largest button
        var size = elm.clientWidth;
        largestButtonSize = (size > largestButtonSize) ? size : largestButtonSize;
        // setup events for buttons
        setupEvents(elm);
    });
    // resize all buttons to be approx as big as the biggest button
    document.querySelectorAll("#sidebar > button")
        .forEach(function (elm) { elm.style.width = "".concat(largestButtonSize + 6, "px"); });
    function setupEvents(elm) {
        // select button when clicked
        elm.addEventListener("click", function () { return select(elm); });
        // handle changing color of currently selected button when another button is being hovered over
        elm.addEventListener("mouseover", function (e) { return hoverButton(1, e); });
        elm.addEventListener("mouseleave", function (e) { return hoverButton(0, e); });
    }
    function hoverButton(action, ev) {
        var selectedBttn = document.getElementById("sel");
        if (!selectedBttn)
            throw "No button selected";
        // change color of selected button on 'hover' and 'hover leave'
        selectedBttn.style.backgroundColor = (action && selectedBttn != ev.target) ? 'hsla(0deg,0%,50%,10%)' : '';
        selectedBttn.style.transform = (action && selectedBttn != ev.target) ? 'translateX(-4rem)' : '';
    }
    function select(elm) {
        // unselect currently selected button if one exists
        var sBttn = document.getElementById("sel");
        if (sBttn)
            sBttn.id = sBttn.style.transform = sBttn.style.backgroundColor = '';
        // select clicked button
        elm.id = 'sel';
    }
}
