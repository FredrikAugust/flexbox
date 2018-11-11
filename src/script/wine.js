let isScrolled = 0;

for (let i = 0; i < document.querySelector("#seasons").children.length; i++) {
    document.querySelectorAll(".wine-button")[i].addEventListener("click", function(e){
        e.stopPropagation();
        if(isScrolled === 0) {
            document.querySelectorAll(".wine-button")[i].parentElement.scrollTop += window.innerHeight/100*80;
            isScrolled = 1
            document.querySelectorAll(".wine-button")[i].innerHTML = "show menu";
        } else if (isScrolled === 1) {
            document.querySelectorAll(".wine-button")[i].parentElement.scrollTop -= window.innerHeight/100*80;
            isScrolled = 0;
            document.querySelectorAll(".wine-button")[i].innerHTML = "show wine";
        }
    })
    document.querySelectorAll(".wine-menu")[i].style.backgroundColor = borderColors[i];
    document.querySelectorAll(".wine-button")[i].style.backgroundColor = borderColors[i];
    document.querySelectorAll(".form>.menu-title")[i].style.color = borderColors[i];
}

