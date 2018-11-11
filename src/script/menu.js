/*
 * This script is the one responsible for the interactivity of the season menus.
 * Written completely by Erik Mjaaland Skår
 */
let defaultWidth = "25%"; //the width of the seasons when the page is loaded
let hoverWidth = "30%"; //the width of the season that is currently hovered
let siblingsHoverWidth = "calc(70%/3)"; //the width of the siblings of the season that is currently being hovered
let clickWidth = "60%"; //the width of the season that is being clicked
let siblingsClickWidth = "calc(40%/3)" //the width of the siblings of the season that is being clicked
let isClicked = 0; //checks if any season is currently clicked

const borderColors = ['#E94B3C', '#F3872F', '#a9511e', '#485167'];


function expandOnHover() { //the function that changes the width of the seasons when one is hovered
    if(isClicked === 0) {
        shrinkAllChildrenOfParent(siblingsHoverWidth);
        document.querySelector("#" +this.id).style.width = hoverWidth;
        //console.log(this.id);
    }
}
for (let i = 0; i < document.querySelector("#seasons").children.length; i++) { //adds the different eventListeners to the under-season divs
    //console.log( document.querySelector("#seasons").children[i]);
    document.querySelector("#seasons").children[i].addEventListener("mouseover", expandOnHover); //adds the expandOnHover function to all the divs
    document.querySelector("#seasons").children[i].addEventListener("click", expandOnClick); //adds the expandOnClick function to all the divs
    //document.querySelector("#seasons").addEventListener("mouseleave", resetToDefault); //optional if you want the menus to be hidden on scroll

}
function shrinkAllChildrenOfParent(siblingwidth) { //the function which makes sure all the seasons are the appropriate size based on which action is currently being done
    for(let i = 0; i < document.querySelector("#seasons").children.length; i++) {
    document.querySelector("#seasons").children[i].style.width = siblingwidth;
    document.querySelector("#seasons").children[i].children[0].style.visibility = "hidden";
    }
}
function resetToDefault() { //function to make the divs to go back to the default width
        shrinkAllChildrenOfParent(defaultWidth);
        isClicked = 0;
}

function expandOnClick() { //the function which is responsible for expanding the div when clicked and making the content inside visible
    if (isClicked === 0) {
        shrinkAllChildrenOfParent(siblingsClickWidth);
        document.querySelector("#" +this.id).style.width = clickWidth;
        document.querySelector("#" +this.id).children[0].style.visibility = "visible";
        isClicked = 1;
        //console.log("expanded");
    } else if (isClicked === 1) { //if one div is already in a "click-expanded" state, then no other div should be expanded and it should reset to default
        resetToDefault();
        isClicked = 0;
        //console.log("default");
    }
}

for(let i = 0; i < document.querySelectorAll(".under-season").length; i++) {
  document.querySelectorAll(".under-season")[i].children[0].style.borderColor = borderColors[i];
  document.querySelectorAll(".exit-button")[i].addEventListener("click", function() {
    isClicked = 0;
    document.querySelectorAll(".under-season")[i].style.width = "25%";
    document.querySelectorAll(".under-season")[i].children[0].style.visibility = "hidden";
    console.log("it almost works");
  });
}
