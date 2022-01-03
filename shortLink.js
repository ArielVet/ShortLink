// True: Wait for Element to Appear
// False: Wait for Element to DiAppear
let waitForElement = true;
let divStyle;
let id;


//Scans for a press of the share Button, and saves the id
$(document.body).on('click',".kU8ebCMnbXfjCWfqn0WPb", function () {
    let commentsAnchor = $(this).parent().siblings()[0];
    let url = location.pathname;
    if (!url.includes("/comments/")){
        //Find the button that is pressed and locates the closest Comment element to it (aka comment button of post)
        url = commentsAnchor.getAttribute('href');
    }

    //Extracts post ID from URL
    let code = url.replace(url.substring(0, url.indexOf("/comments/") + 10), "");
    id = code.substring(0, code.indexOf("/")); 
});

//Scan for apperance of the share div and ass the new button
new MutationObserver( () => {
    //A flip flop switch dtecting appearance and disapernce 
    let myDiv = document.getElementsByClassName("_2uYY-KeuYHKiwl-9aF0UiL PWY92ySDjTYrTAiutq4ty")[0];

    if (waitForElement){
        if (document.body.contains(myDiv)){
            waitForElement = false;
            divStyle = myDiv.getAttribute("style");
            console.log("Appeared");
            addButton(myDiv);
        }
    } else {

        if (!document.body.contains(myDiv)){
            waitForElement = true;
            console.log("Disappeard");
        }
        else if (divStyle != undefined && myDiv.getAttribute("style") != divStyle){
            divStyle = myDiv.getAttribute("style");
            addButton(myDiv);
            console.log("updated");
        }

    }
    
}).observe(document, {subtree: true, childList: true});

//Generates the Short Link Button
let addButton = div => {
    
    let newButton = document.createElement("button");
    newButton.id = 'shortLinkShare';
    newButton.setAttribute('role', "menuitem");
    newButton.classList.add("_10K5i7NW6qcm-UoCtpB3aK");
    newButton.classList.add("_3LwUIE7yX7CZQKmD2L87vf");
    newButton.classList.add("_2snJGyyGyyH38duHobOUKE");
    newButton.classList.add("_1oYEKCssGFjqxQ9jJMNj5G");
    // newButton.innerHTML = `<span class="pthKOcceozMuXLYrLlbL1"><i class="_1GObrri0j7y_9IWiGUfPjp icon" content=${chrome.extension.getURL("icon.png")}></i></span><span class="_2-cXnP74241WI7fpcpfPmg">Short Link</span>`
    newButton.innerHTML = `<span class="pthKOcceozMuXLYrLlbL1"><img src=${chrome.runtime.getURL("images/document.png")} width="16" height="20" style="vertical-align:middle"></span><span class="_2-cXnP74241WI7fpcpfPmg" style="margin-left:0.2em">Short Link</span>`
    
    div.insertBefore(newButton, div.childNodes[0]);
    // div.appendChild(newButton);
}

//Scans for press of Short Link Button and copies short url to pad
$('body').on('click',"#shortLinkShare", () => {
    let address = "https://redd.it/" + id; 
    navigator.clipboard.writeText(address);
});




