if (document.readyState !== 'loading') {
    start();
}
else {
    document.addEventListener('DOMContentLoaded', function () { start(); });
}
function start() {
    resizeSidebarButtons();
}
function resizeSidebarButtons() {
    var largestButtonSize = 0;
    document.querySelectorAll("#sidebar > button").forEach(function (elm) {
        // set var to equal the width of the largest button
        var size = elm.clientWidth;
        largestButtonSize = (size > largestButtonSize) ? size : largestButtonSize;
    });
    // resize all buttons to be approx as big as the biggest button
    document.querySelectorAll("#sidebar > button")
        .forEach(function (elm) { elm.style.width = "".concat(largestButtonSize + 6, "px"); });
}
