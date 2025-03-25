var theme_couleur = "clair";

function changer_theme(){
    var themes = document.getElementsByTagName("link");
    for (var i = 0; i < themes.length; i++){
        var href = themes[i].href;
        if (theme_couleur == "clair"){
            themes[i].setAttribute("href", href.replace("clair","sombre"));
        }else{
            themes[i].setAttribute("href", href.replace("sombre","clair"));
        }
    }

    themes = document.getElementsByTagName("img");
    for (var i = 0; i < themes.length; i++){
        var href = themes[i].src;
        if (theme_couleur == "clair"){
            themes[i].setAttribute("src", href.replace("clair","sombre"));
        }else{
            themes[i].setAttribute("src", href.replace("sombre","clair"));
        }
    }

    if(theme_couleur == "clair"){
        theme_couleur = "sombre";
    }else{
        theme_couleur = "clair";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        changer_theme();
    }
},false);