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

        var date = new Date();
        var temps = date.getTime();
        var tempsExpiration = temps + 48*36000;
        date.setTime(tempsExpiration);
        document.cookie = "theme=sombre; expires "+date.toUTCString()+";";
    }else{
        theme_couleur = "clair";

        var date = new Date();
        var temps = date.getTime();
        var tempsExpiration = temps + 48*36000;
        date.setTime(tempsExpiration);
        document.cookie = "theme=clair; expires "+date.toUTCString()+";";
    }
}

document.onreadystatechange = function (e){
    if(document.readyState === "complete"){
        var cookie_str = decodeURIComponent(document.cookie);
        if (new RegExp("theme").test(cookie_str)){
            var cookies = cookie_str.split(";");
            for (var i = 0; i < cookies.length; i++){
                if(new RegExp("theme").test(cookies[i])){
                    if (cookies[i].split("=")[1] === "sombre"){
                        changer_theme();
                        break;
                    }
                }
            }
        }else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            changer_theme();
        }
    }
};