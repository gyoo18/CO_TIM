var header;
var estOuvert = false;

document.addEventListener("DOMContentLoaded", ()=>{
    header = document.getElementsByTagName("header")[0];
});

document.addEventListener("scroll",()=>{
    if(window.scrollY > 50 && !estOuvert){
        header.classList.remove("grand");
        header.classList.add("petit");
        estOuvert = true;
    }else if(window.scrollY < 50 && estOuvert){
        header.classList.remove("petit");
        header.classList.add("grand");
        estOuvert = false;
    }
});