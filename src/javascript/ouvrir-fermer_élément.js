var éléments = [];

function getElementByClassName(root, name){
    var enfants = root.childNodes;
    for (var i = 0; i < enfants.length; i++){
        if (enfants[i].className === name){
            return enfants[i];
        }
    }
}

function fermer_élément(bouton){
    if (!(bouton in éléments.keys())){
        éléments.push({e:true});
    }

    if (éléments[bouton]){
        getElementByClassName( bouton.parentElement.parentElement, "bloc_contenu").style.setProperty("display","none");
        bouton.innerText = "+";
        éléments[bouton] = false;
    }else{
        getElementByClassName( bouton.parentElement.parentElement, "bloc_contenu").style.setProperty("display","flex");
        bouton.innerText = "-";
        éléments[bouton] = true;
    }
}


//Fermer les blocs au chargement de la page
document.addEventListener("DOMContentLoaded", function(){
    var blocs_fermables = document.getElementsByClassName("bloc_fermable_bouton");

    for (var i = 0; i < blocs_fermables.length; i++){
        getElementByClassName(blocs_fermables[i].parentElement.parentElement, "bloc_contenu").style.setProperty("display","none");
    }
}, false);