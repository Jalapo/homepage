const aboutTxt = [
    "I am a Software Engineer in the Southeastern region of the United States. "+
    "I grew up in New Orleans, Louisiana, "+
    "so I have always enjoyed trying new foods and seeing new places different from home. "+
    "Growing up I loved playing video games, and I spend much of my free time "+
    "in front of a computer or with new technology.",

    "In 2021 I began learning Java and wrote a few simple applications. "+
    "I picked up JavaScript in 2022, and began specializing in web development. "+
    "Since then, I have developed a range of applications and webpages, "+
    "and you may check them out by clicking Projects in the sidebar, or the button below."
]
const projInfo = new Map([
    ["color-test", {title:"Color Space Tool", tech:["HTML","CSS","JS"]}],
    ["circle-catcher", {title:"Circle Catcher", tech:["HTML","CSS","JS"]}],
    ["savedlinks", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    // ["cc", {title:"CC", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    // ["1", {title:"1", tech:["HTML","SCSS","TypeScript","Node.js"]}],
    // ["2", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
]);
const contactInfo = new Map([["gh","github.gif"],["ln","linkedin.gif"]]);

function About() {
  return React.createElement("div", {className: "reactApp"},
    React.createElement("div",{id:"left_sec"},
        React.createElement("h3",{style:{textDecoration:'underline'}}, 'Tools I have worked with')
    ),
    React.createElement("div",{id:"center_sec"},
        React.createElement("h1",null,'Hi! I am Javen Porter'),
        React.createElement("p",null,aboutTxt[0]),
        React.createElement("p",null, aboutTxt[1]),
        React.createElement("button",{onClick:()=>{select(document.querySelector('#sidebar>button:nth-child(2)'))}},"View Projects")
    ),
    React.createElement("div",{id:"right_sec"})
  );
}
const root = ReactDOM.createRoot(document.querySelector(".content"));

function reactRender(page) {
    switch (page) {
        case "about": root.render(React.createElement(About, null)); break;
        case "projects": root.render(React.createElement(Projects, null));break;
        case "contact": root.render(React.createElement(Contact, null)); break;
    }
}


function Projects() {
    let projectNames = Array.from(projInfo.keys());
    let c = [];
    for (let i in projectNames) c.push(
        React.createElement(project,{key: projectNames[i], projectName: projectNames[i]})
    );
    return React.createElement("div", {className: "reactApp", onLoad: resize}, c);
}

function project(props) {
    let name = props.projectName;
    let project = projInfo.get(name);
    let techStack = [];
    // determine image size before loading to prevent ugly image resizing on 'Projects' page load
    let projWidth = document.body.getBoundingClientRect().width * 0.269085; 
    for (let i in project.tech) techStack.push(React.createElement("div", {key:i}, project.tech[i]));
    return React.createElement("div", {className: "project"},
    React.createElement("img", {className: "preview", src: `./img/${name}.png`, width: projWidth, height: projWidth/(16/9)}),
    React.createElement("div", {className: "title"}, project.title),
    React.createElement("div", {className: "tech", style: {fontSize:"1.5rem"}}, techStack),
    )
}

function Contact() {
    let contactLinks = Array.from(contactInfo.keys());
    let buttons = [];
    for (let i in contactLinks) 
        buttons.push(React.createElement(contactBttn, {key:contactLinks[i], link: contactLinks[i]}));
    return React.createElement("div",{className: "reactApp"},
        React.createElement("h1",{style:{textDecoration:"underline"}},"Find Me Here"),
        React.createElement("div",{id:'links'}, buttons
        ))

function contactBttn(props) {
    link = props.link;
    return React.createElement("div",{id:link},
        React.createElement("div",{className:"clickHandler", onClick: ()=>{handleContactClick(link)}}),
        React.createElement("img",{src: "./img/".concat(contactInfo.get(link))})
    );
}
}