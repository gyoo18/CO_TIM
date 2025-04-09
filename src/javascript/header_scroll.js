var header;
var estPetit = false;

document.addEventListener("DOMContentLoaded", ()=>{
    header = document.getElementsByTagName("header")[0];
});

document.addEventListener("scroll",()=>{
    if(window.scrollY > 50 && !estPetit){
        header.classList.remove("grand");
        header.classList.add("petit");
        estPetit = true;
    }else if(window.scrollY < 50 && estPetit){
        header.classList.remove("petit");
        header.classList.add("grand");
        estPetit = false;
    }
});