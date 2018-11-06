let isScrolled = 0;

for (let i = 0; i < document.querySelector("#seasons").children.length; i++) {
    document.querySelectorAll(".wine-button")[i].addEventListener("click", function(){
        if(isScrolled === 0) {
            document.querySelectorAll(".wine-button")[i].parentElement.scrollTop += window.innerHeight/100*80;
            isScrolled = 1
        } else if (isScrolled === 1) {
            document.querySelectorAll(".wine-button")[i].parentElement.scrollTop -= window.innerHeight/100*80;
            isScrolled = 0;
        }
    })
}