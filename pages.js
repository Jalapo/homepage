const root = ReactDOM.createRoot(document.querySelector(".content"));
/*const aboutTxt = [
    "I am a Software Engineer in the Southeastern region of the United States. "+
    "I grew up in New Orleans, Louisiana, "+
    "so I have always enjoyed trying new foods and seeing new places different from home. "+
    "Growing up I loved playing video games, and I spend much of my free time "+
    "using a computer or learning about new technology.",

    "In 2021 I began learning Java and wrote a few simple applications. "+
    "I picked up JavaScript in 2022, and began specializing in web development. "+
    "Since then, I have developed a range of applications and webpages, "+
    "and you may check them out by clicking Projects in the sidebar, or the button below."
]*/
const aboutTxt = [
    "I am a web developer with experience in the most utilized technology powering web applications. " +
    "I have built static and single page webpages, webpages with servers and databases powering them, " +
    "and offline web applications that run on any device.",

    "I have a catalog of projects to showcase both my frontend and backend skills, which you may access by clicking the button below. " +
    "I have no trouble working in any area in the web development process, and I will always deliver " +
    "neat software that is pleasant to read and pleasant to use."
]
const projInfo = new Map([
    // ["color-test", {title:"Color Space Tool", tech:["HTML","CSS","JS"]}],
    ["color-test", {
        title:"Color Space Tool",
        tech:["HTML","CSS","JavaScript"],
        color:"hsl(0deg, 100%, 3%)",
        desc: "Color manipulation web app for the HSL and RGB color spaces",
        URL: "https://jalapo.github.io/color-test/"
    }],
    // ["circle-catcher", {title:"Circle Catcher", tech:["HTML","CSS","JS"]}],
    ["circle-catcher", {
        title:"Circle Catcher",
        tech:["HTML","CSS","JavaScript","jQuery"],
        color:"hsl(0deg, 0%, 30%)",
        desc: "Get the highest score by clicking as many circles as you can. Embeddable web game written in JavaScript",
        URL: "https://javenp.com/cc/"
    }],
    // ["savedlinks", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    ["savedlinks", {
        title:"Saved Links", 
        tech:["HTML","CSS","JavaScript","Node.js","MySQL"], 
        color:"hsl(220deg, 80%, 8%)",
        desc: "Cross-platform web app to manage and sync bookmarks in the cloud and across devices",
        URL: "https://jalapo.github.io/savedlinks/"
    }],
    // ["cc", {title:"CC", tech:["HTML","CSS","JS","Node.js","MySQL"]}],
    // ["1", {title:"1", tech:["HTML","SCSS","TypeScript","Node.js"]}],
    // ["2", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
]);
const contactInfo = new Map([["gh","github.gif"],["ln","linkedin.gif"]]);
const iconLinks = new Map([["_dir", "./img/tools/"],
    ["JavaScript","javascript.svg"],["jQuery","jquery.svg"],["Node.js","nodejs.svg"],
    ["React","react.svg"],["HTML","html.svg"],["CSS","css.svg"],
    ["MySQL","mysql.svg"]
]);



function reactRender(page) {
    switch (page) {
        case "about": root.render(React.createElement(About, null)); break;
        case "projects": root.render(React.createElement(Projects, null));break;
        case "contact": root.render(React.createElement(Contact, null)); break;
    }
}


function About() {
    let icos = ['JavaScript','Node.js','React','HTML','CSS','jQuery','MySQL'];
    let Imgs = [];
    for (let i in icos) Imgs.push(React.createElement(Icon, {name: icos[i]}));

    return React.createElement("div", {className: "reactApp", onLoad: resize},
    // React.createElement("div",{id:"left_sec"}),

    React.createElement("div",{id:"center_sec"},
        React.createElement("h1",null,'Javen Porter'),
        React.createElement("h2",{id:"subtext"},'Web Developer'),
        React.createElement("p",null,aboutTxt[0]),
        React.createElement("p",null,aboutTxt[1]),
        React.createElement("button",{onClick:()=>{select(document.querySelector('#sidebar>button:nth-child(2)'))}},"View Projects"),

        React.createElement("h2",{id:"toolsText"}, 'Tools I have worked with'),
        React.createElement("div",{className: 'icons'}, Imgs)
    ),

    // React.createElement("div",{id:"right_sec"})
  );
}

function Icon(props) {
    let path = iconLinks.get(props.name);
    let dir = iconLinks.get('_dir');
    return React.createElement("div",{className:"img_holder"},
        React.createElement("img",{src:dir+path, onMouseOver:(ev)=>{updateLabel(ev.target.parentNode, 'show')}, onMouseLeave:(ev)=>{updateLabel(ev.target.parentNode, 'hide')}, onLoad:(e)=>
            {
                e.target.ondragstart=()=>{return false;}
            }
        }), 
        React.createElement("div",{className:"skill_label"},props.name)
    );
}

function Projects() {
    let projectNames = Array.from(projInfo.keys());
    let c = [];
    for (let i in projectNames) c.push(
        React.createElement(project,{key: projectNames[i], projectName: projectNames[i]})
    );
    return React.createElement("div", {className: "reactApp", onLoad: resize},
        c,
        React.createElement("div",{id:"popup"})
    );
}

function project(props) {
    let name = props.projectName;
    let project = projInfo.get(name);
    let techStack = [];
    // determine image size before loading to prevent ugly image resizing on 'Projects' page load
    let projWidth = document.body.getBoundingClientRect().width * 0.269085; 
    for (let i in project.tech) {
        techStack.push(React.createElement("div", {key:i,className:"img_holder"},
                        React.createElement("img",{src:iconLinks.get('_dir')+iconLinks.get(project.tech[i]), onLoad:(e)=>
                            {e.target.ondragstart=()=>{return false;}}
                        })
        ));
    }
    return React.createElement("div", {className:"flex_container"},
        React.createElement("div", {className: "project", onClick: ()=>{createPopup(name);}},
            React.createElement("div", {className: "preview",},
                React.createElement("img", {className: "", src: `./img/${name}.png`, width: projWidth, height: projWidth/(16/9)}),
                React.createElement("div",{className:"no_sel"})
            ),
            React.createElement("div", {className: "title"}, project.title),
            React.createElement("div", {className: "tech", style: {fontSize:"1.5rem"}}, techStack),
        )
    )
}

function createPopup(project_name) {
    // let name = props.projectName;
    let project = projInfo.get(project_name);
    let popupDiv = document.querySelector("#projects> .reactApp> #popup");
    let popup_root = ReactDOM.createRoot(popupDiv);

    if (popupDiv && project) {
        // render content into popup
        popup_root.render(React.createElement(popup,{name:project_name}));
        // change visibility of popup
        popupDiv.style.visibility = 'visible';
        popupDiv.addEventListener('click',(e)=>{hidePopup(e.target)});
    }

    function popup(props) {
        let project_name = props.name;
        let project = projInfo.get(project_name);
        let desc = project.desc? project.desc : "A web app!";

        let color = project.color?project.color:'black';
        let shadowColor = "0rem 0rem 0.5vw 0.5vw ";

        if (color == 'black') shadowColor = '#4443';
        else shadowColor += 'hsla(' + color.split('(')[1].split(')')[0] + ', 30%)';
        let borderColor = color.split(" ");
        let light = parseInt(borderColor[2].split('%)')[0]);
        // shrink light value by 1/3 or 5%
        // let adjustLight = (light/3>=Math.abs(light-10))? light/3 : light-10;
        let adjustLight = light*1.75/3;
        borderColor = borderColor[0]+' '+borderColor[1]+' '+adjustLight+'%)'
        return React.createElement("div",{id:'container',style:{borderColor:borderColor, backgroundColor:color, boxShadow: shadowColor},onLoad:()=>
        {
            // append close button for popups
            let b=document.createElement("button");
            b.id="close_bttn";
            b.appendChild(document.createTextNode("X"));
            b.addEventListener('click',(e)=>{hidePopup(e.target?.parentNode)});
            popupDiv.appendChild(b);
        }},
            React.createElement("div",{id:"img_holder"},
                React.createElement("img", {src:`./img/${project_name}.png`,placeholder: project.title}),
                React.createElement("div", {className: "no_sel"})
            ),
            React.createElement("div",{className:"text_container"},
                React.createElement("div",{id:"project_title"}, project.title),       
                React.createElement("div",{id:"project_desc"}, project.desc),
                React.createElement("div",{id:"buttons"},
                    React.createElement("button",{onClick:()=>{window.open(project.URL)}},"Visit"),
                    React.createElement("button",{onClick:()=>{window.open(`//github.com/jalapo/${project_name}`)}},"Source")
                ),
            )
        );
    }
}

function hidePopup(elm){if (elm.id == 'popup') elm.style.visibility='hidden';}

function Contact() {
    let contactLinks = Array.from(contactInfo.keys());
    let buttons = [];
    for (let i in contactLinks) 
        buttons.push(React.createElement(contactBttn, {key:contactLinks[i], link: contactLinks[i]}));
    return React.createElement("div",{className: "reactApp"},    
        React.createElement("div",{id:'external'},
            React.createElement("h1",{style:{textDecoration:"underline"}},"Find Me Here"),
            React.createElement("div",{id:'links'}, buttons)
        )
    )

function contactBttn(props) {
    link = props.link;
    return React.createElement("div",{id:link},
        React.createElement("div",{className:"clickHandler", onClick: ()=>{handleContactClick(link)}}),
        React.createElement("img",{src: "./img/".concat(contactInfo.get(link))})
    );
}

}