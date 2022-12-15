const projInfo = new Map([
    ["color-test", {title:"Color Space Tool", tech:["HTML","CSS","JS"]}],
    ["circle-catcher", {title:"Circle Catcher", tech:["HTML","CSS","JS"]}],
    ["savedlinks", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    // ["cc", {title:"CC", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    // ["1", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
    // ["2", {title:"Saved Links", tech:["HTML","SCSS","TypeScript","Node.js","MySQL"]}],
]);
const contactInfo = new Map([["gh","github.gif"],["ln","linkedin.gif"]]);

function About() {
  return /*#__PURE__*/React.createElement("h1", null, "Hi! I am Javen Porter");
}
const root = ReactDOM.createRoot(document.querySelector(".content"));
// root.render( /*#__PURE__*/React.createElement(Projects, null));


function reactRender(page) {
    switch (page) {
        case "about": root.render( /*#__PURE__*/React.createElement(About, null)); break;
        case "projects": root.render( /*#__PURE__*/React.createElement(Projects, null)); break;
        case "contact": root.render( /*#__PURE__*/React.createElement(Contact, null)); break;
    }
}

/*
function Projects() {
    return (
        <div>
            <div class='project'>
                <img class='preview' src='./img/color-test.png' />
                <div class="title">Color Tool</div>
                <div class="tech">HTML5 CSS JS</div>
            </div>
            <div class="project">
                <img class="preview" src="./img/circle-catcher.png"/>
                <div class="title">Circle Catcher</div>
                <div class="tech">HTML CSS JS</div>
            </div>
            <div class="project">
                <img class="preview" src="./img/savedlinks.png"/>
                <div class="title">Saved Links</div>
                <ul class="tech">
                    <li>HTML</li>
                    <li>SCSS</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                    <li>MySQL</li>
                </ul>
            </div>
        </div>
    )
}
*/

/*
function Projects() {
  return React.createElement("div", {className: "reactApp"}, React.createElement("div", {
      className: "project"
  }, React.createElement("img", {
      className: "preview",
      src: "./img/color-test.png"
  }), React.createElement("div", {
      className: "title"
  }, "Color Tool"), React.createElement("div", {
      className: "tech"
  }, "HTML5 CSS JS")), React.createElement("div", {
      className: "project"
  }, React.createElement("img", {
      className: "preview",
      src: "./img/circle-catcher.png"
  }), React.createElement("div", {
      className: "title"
  }, "Circle Catcher"), React.createElement("div", {
      className: "tech"
  }, "HTML CSS JS")), React.createElement("div", {
      className: "project"
  }, React.createElement("img", {
      className: "preview",
      src: "./img/savedlinks.png"
  }), React.createElement("div", {
      className: "title"
  }, "Saved Links"), React.createElement("ul", {
      className: "tech"
  }, React.createElement("li", null, "HTML"), React.createElement("li", null, "SCSS"), React.createElement("li", null, "TypeScript"), React.createElement("li", null, "Node.js"), React.createElement("li", null, "MySQL"))));
}
*/

function Projects() {
    let projectNames = Array.from(projInfo.keys());
    let c = [];
    for (let i in projectNames) c.push(React.createElement(project,{key: projectNames[i], projectName: projectNames[i]}));
    return React.createElement("div", {className: "reactApp"}, c, React.createElement("div",null,"shrink font size in tech boxes by using clientWidth of project VS sum of tech txt boxes"));
}

function project(props) {
    let name = props.projectName;
    let project = projInfo.get(name);
    let techStack = [];
    for (let i in project.tech) techStack.push(React.createElement("div", {key:i}, project.tech[i]));
    return React.createElement("div", {className: "project"},
    React.createElement("img", {className: "preview", src: `./img/${name}.png`}),
    React.createElement("div", {className: "title"}, project.title),
    React.createElement("div", {className: "tech"}, techStack),
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