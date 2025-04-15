var estChatbotOuvert = false;
var icône;
var chat;
var chat_x;
var chat_message;
var chat_envoyer;
var chat_conversation;
var historique = "Bonjour, si vous avez une question, je suis là pour vous aider!";
var message = "";
var api = "";
var n_messages = 0;

document.addEventListener("DOMContentLoaded",()=>{
    icône = document.getElementsByClassName("chatbot_icône")[0];
    chat = document.getElementsByClassName("chat")[0];
    chat_x = document.getElementsByClassName("chat_x")[0];
    chat_message = document.getElementsByClassName("chat_message")[0];
    chat_envoyer = document.getElementsByClassName("chat_envoyer")[0];
    chat_conversation = document.getElementsByClassName("chat_conversation")[0];

    var cookie_str = decodeURIComponent(document.cookie);
    if (new RegExp("historique").test(cookie_str)){
        var cookies = cookie_str.split(";");
        for (var i = 0; i < cookies.length; i++){
            if(new RegExp("historique").test(cookies[i])){
                historique = cookies[i].split("=")[1];

                var messages = historique.split("\\n");
                for (var i = 0; i < messages.length; i++){
                    if(messages[i] === ""){
                        continue;
                    }
                    if(messages[i].split(" : ")[0] == "Lui"){
                        chat_conversation.innerHTML += `
                        <div class="chat_ligne droite">
                            <div class="chat_bulle utilisateur">`
                                +messages[i].split(" : ")[1].replace(/\\n/gi,"\n")+
                        `    </div>
                        </div>`
                    } else {
                        chat_conversation.innerHTML += `
                        <div class="chat_ligne gauche">
                            <div class="chat_bulle bot">`
                                +messages[i].split(" : ")[1].replace(/\\n/gi,"\n")+
                        `    </div>
                        </div>`
                    }
                }
            }
        }
    }else{
        chat_conversation.innerHTML += `
        <div class="chat_ligne gauche">
            <div class="chat_bulle bot">`
                +historique+
        `    </div>
        </div>`
        historique = "Vous : "+historique+"\n";
    }

    if(window.location.href.includes("?") && window.location.href.includes("api=")){
        api = new URL(window.location.href).searchParams.get("api");
        tester_api(()=>{
            var date = new Date();
            var temps = date.getTime();
            var tempsExpiration = temps + 48*36000;
            date.setTime(tempsExpiration);
            document.cookie = "api="+api+"; expires "+date.toUTCString()+";";
        });
    }else if (new RegExp("api").test(cookie_str)){
        var cookies = cookie_str.split(";");
        for (var i = 0; i < cookies.length; i++){
            if(new RegExp("api").test(cookies[i])){
                api = cookies[i].split("=")[1];
            }
        }
    }

    if (new RegExp("n_messages").test(cookie_str)){
        var cookies = cookie_str.split(";");
        for (var i = 0; i < cookies.length; i++){
            if(new RegExp("n_messages").test(cookies[i])){
                n_messages = cookies[i].split("=")[1];
            }
        }
    }

    icône.addEventListener("click",()=>{
        if (estChatbotOuvert){
            fermer_chat();
            estChatbotOuvert = false;
        }else{
            ouvrir_chat();
            estChatbotOuvert = true;
        }
    });
    chat_x.addEventListener("click",()=>{
        if(estChatbotOuvert){
            fermer_chat();
            estChatbotOuvert = false;
        }
    });
    chat_envoyer.addEventListener("click",()=>{
        if(chat_message.value !== "" && n_messages < 100){
            message = chat_message.value;
            if(api === ""){
                api = message;
                tester_api(()=>{
                    chat_conversation.innerHTML += `
                    <div class="chat_ligne">
                        <div class="chat_bulle bot" style="max-width: 100%; background-color: #5F25;">
                            Clé valide. Vous pouvez converser avec le robot.
                        </div>
                    </div>
                    `
                    var date = new Date();
                    var temps = date.getTime();
                    var tempsExpiration = temps + 48*36000;
                    date.setTime(tempsExpiration);
                    document.cookie = "api="+api+"; expires "+date.toUTCString()+";";
                });
                chat_message.value="";
            }else{
                chat_conversation.innerHTML += `
                <div class="chat_ligne droite">
                    <div class="chat_bulle utilisateur">`
                        +chat_message.value+
                `     </div>
                </div>`
                chat_requête(chat_message.value, (réponse)=>{
                    chat_conversation.innerHTML += `
                    <div class="chat_ligne gauche">
                        <div class="chat_bulle bot">`
                            +réponse+
                    `   </div>
                    </div>`
                    historique += "Lui : "+message+"\n";
                    historique += "Vous : "+réponse+"\n";
                    n_messages ++;

                    if (n_messages >= 100){
                        chat_conversation.innerHTML += `
                        <div class="chat_ligne">
                            <div class="chat_bulle bot" style="max-width: 100%; background-color: #F525;">
                                Vous avez beaucoup conversé avec le robot conversationnel. Cette page se veut une démo. Afin de prévenir les abus votre accès a été bloqué. Veuillez revenir dans 48h.
                            </div>
                        </div>
                        `
                    }
                    
                    var date = new Date();
                    var temps = date.getTime();
                    var tempsExpiration = temps + 48*36000;
                    date.setTime(tempsExpiration);
                    document.cookie = "historique="+historique.replace(/\n/gi,"\\n")+"; expires "+date.toUTCString()+";";
                    document.cookie = "api="+api+"; expires "+date.toUTCString+";";
                    document.cookie = "n_messages="+n_messages+"; expires "+tempsExpiration+";";
                });
            }
            chat_message.value = "";
        }
    });
});

function ouvrir_chat(){
    icône.classList.remove("grand");
    icône.classList.add("petit");
    chat.classList.remove("petit");
    chat.classList.add("grand");
}

function fermer_chat(){
    icône.classList.remove("petit");
    icône.classList.add("grand");
    chat.classList.remove("grand");
    chat.classList.add("petit");
}

async function chat_requête(message, gérerRetour){
    const requête = await fetch("https://api.mistral.ai/v1/chat/completions",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+api
        },
        body: JSON.stringify({
            "model":"open-mistral-nemo",
            "messages":[
                {
                    "role":"system",
                    "content":"Vous êtes un chatbot serviable et courtois sur un site d\'inscription au cégep. Veuillez répondre par des réponses courtes de type textos. Voici votre conversation jusqu'à présent : "+historique
                },
                {
                    "role":"user",
                    "content":message
                }
            ]
        })
    }).then(
        (réponse)=>réponse.json()
    ).then(
        (texte)=>{
            try{
                gérerRetour(texte["choices"][0]["message"]["content"]);
            }catch(error){
                gérerRetour("Une erreur est survenue");
            }
        }
    );

}

async function tester_api(estValide){
    const requête = await fetch("https://api.mistral.ai/v1/chat/completions",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":"Bearer "+api
        },
        body: JSON.stringify({
            "model":"open-mistral-nemo",
            "messages":[
                {
                    "role":"user",
                    "content":"test"
                }
            ]
        })
    }).then(
        (réponse)=>réponse.json()
    ).then(
        (texte)=>{
            if(texte["message"] === "Unauthorized"){
                api = "";
                chat_conversation.innerHTML += `
                <div class="chat_ligne">
                    <div class="chat_bulle bot" style="max-width: 100%; background-color: #F525;">
                        Aucune clé api valide n'a été détectée. Veuillez entrer une clé api Mistral AI valide pour converser avec le robot conversationnel.
                    </div>
                </div>
                `
            }else if(estValide != null){
                estValide();
            }
        }
    );
}