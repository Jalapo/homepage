let authKey  = getKey();
    
let [key,expiry] = authKey?[authKey.value,authKey.expiry]:[0,0];
// if (Date.now()>exp) window.location.href="/admin/login";
var key_textDOM, key_statusDOM;
if (document.readyState !== 'loading') start();
else document.addEventListener('DOMContentLoaded', async() => {start();});

// let b = JSON.stringify({key: key});
/*fetch(`/admin/${key}`,{method:"GET"}).then(res=>{
    if (res.status!=200) window.location.href="/admin/login";
    document.getElementById("key_status").innerHTML = res.status==200;
}).catch(err=>document.getElementById("key_status").innerHTML=false);*/


async function start() {
    [key_textDOM,key_statusDOM] = initVars();
    // print key to page
    key_textDOM.innerHTML=key;
    // check status of key on server, redirect to login if not found
    let isKeyValid = await checkStatus();
    if (!isKeyValid) window.location.href="/admin/login";
    else key_statusDOM.innerHTML = `${ (expiry-Date.now()) / 1000 }s`;
    // click status button
    document.getElementById("status").addEventListener("click",async()=>{
        let isKeyValid = await checkStatus();
        if (!isKeyValid) {
            document.querySelector("#status").style.animation = "clickFail 0.2s ease-out";
            setTimeout(()=>{document.querySelector("#status").style.animation = "none";}, 200);
            // window.location.href="/admin/login";
        } else {
            document.querySelector("#status").style.animation = "clickSucceed 0.2s ease-out";
            setTimeout(()=>{document.querySelector("#status").style.animation = "none";}, 200);
        }
        let validTime = (expiry-Date.now()>0) ? (expiry-Date.now())/1000 : 0;
        key_statusDOM.innerHTML = `${validTime}s`;
    });
    // click update button
    document.getElementById("update").addEventListener("click",async()=>{
        let exp = await updateKey();
        if (exp != -1) {
            document.querySelector("#update").style.animation = "clickSucceed 0.2s ease-out";
            setTimeout(()=>{document.querySelector("#update").style.animation = "none";}, 200);
            expiry = parseInt(exp);
            localStorage.setItem('authKey',JSON.stringify({value:key, expiry:expiry}));
            key_statusDOM.innerHTML = `${ (expiry-Date.now()) / 1000 }s`;
        }
        else {
            document.querySelector("#update").style.animation = "clickFail 0.2s ease-out";
            setTimeout(()=>{document.querySelector("#update").style.animation = "none";}, 200);
            localStorage.removeItem('authKey');
            key_statusDOM.innerHTML = `0s`;
        }
    });
}

function initVars() {
    var kt = document.getElementById("key");
    var ks = document.getElementById("key_status");
    return [kt,ks];
}

function getKey() {
    let aK;
    try {aK = JSON.parse(localStorage.authKey);}
    catch(err) {aK = false;}
    finally {return aK;}
}

async function checkStatus() {
    // key has expired locally
    if (expiry-Date.now()<0) {
        // send delete request to server and delete local copy of key
        if (await deleteKey() && localStorage.getItem(key)) localStorage.removeItem(key);
        return false;
    }
    let p = await fetch(`/admin/${key}`,{method:"GET"});
    return p.status==200; // return true or false
}
async function updateKey() {
    let p = await fetch(`/admin/${key}`,{method:"PUT"});
    // return new expiry time if key is valid, otherwise return 0
    if (p.status!=200) return -1;
    else return await p.text();
}
async function deleteKey() {
    let p = await fetch(`/admin/${key}`,{method:"DELETE"});
    return p.status==200;
}