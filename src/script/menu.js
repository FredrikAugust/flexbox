let defaultWidth = "25%";
let hoverWidth = "30%";
let siblingsHoverWidth = "calc(70%/3)";
let clickWidth = "60%";
let siblingsClickWidth = "calc(40%/3)"
let isClicked = 0;

function expandOnHover() {
    if(isClicked==0) {
        shrinkAllChildrenOfParent(this, siblingsHoverWidth);
        document.querySelector("#" +this.id).style.width = hoverWidth;
        console.log(this.id);
    }
}
for (i=0;i<document.querySelector("#seasons").children.length;i++) {
    //console.log( document.querySelector("#seasons").children[i]);
    document.querySelector("#seasons").children[i].addEventListener("mouseover", expandOnHover);
    document.querySelector("#seasons").children[i].addEventListener("click", expandOnClick);
    //document.querySelector("#seasons").addEventListener("mouseleave", resetToDefault);

}
function shrinkAllChildrenOfParent(dontshrink, siblingwidth) {
    for(i=0;i<document.querySelector("#seasons").children.length;i++) {
    document.querySelector("#seasons").children[i].style.width = siblingwidth;
    document.querySelector("#seasons").children[i].children[0].style.visibility = "hidden";
    }
}
function resetToDefault() {
        shrinkAllChildrenOfParent(this, defaultWidth);
        isClicked = 0;
}

function expandOnClick() {
    if (isClicked == 0) {
        shrinkAllChildrenOfParent(this, siblingsClickWidth);
        document.querySelector("#" +this.id).style.width = clickWidth;
        document.querySelector("#" +this.id).children[0].style.visibility = "visible";
        isClicked=1;
        //console.log("expanded");
    } else {
        resetToDefault();
        isClicked=0;
        //console.log("default");
    }
}
