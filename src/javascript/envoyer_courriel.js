document.addEventListener("DOMContentLoaded", (e)=>{
    document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
        e.preventDefault();
        envoyerCourriel();
    });
})

function envoyerCourriel(){
    var nom = document.getElementById("nom").value;
    var courriel = document.getElementById("courriel").value;
    var message = document.getElementById("message").value;
    
    alert("(Ceci est une simulation)\n"+nom+", un courriel vous a été envoyé à "+courriel+" contenant le message suivant :\n"+message);
}