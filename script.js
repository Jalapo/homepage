let pos = 0; // hidden

function moveProjects() {
    let projects = document.querySelector(".projects");
    if (pos == 0) { // if projects are hidden
        projects.classList.add('unhidden');
        projects.classList.remove('hidden');
        setTimeout(() => projects.scrollIntoView({behavior:"smooth"}), 800);
        pos = 1;
    } else if (pos == 1) {
        projects.classList.add('hidden');
        projects.classList.remove('unhidden');
        pos = 0;
    }
    
}