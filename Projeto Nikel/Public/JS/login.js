
//Saber quando o usuário clicou 
//document.getElementById("link-conta").addEventListener("click", function() {
 //   console.log("O usuário clicou no link Criar conta"); })


 const myModal = new bootstrap.Modal("#registerModal"); //Nomeia e configura um modal (janelinha/botão) através do ID específico (nesse caso da página Login)
 let logged = sessionStorage.getItem("logged");
 const session = localStorage.getItem("session");

 checkLogged();

 //Logar no sistema

 document.getElementById("loginform").addEventListener("submit",function(e){
        e.preventDefault();
        const email = document.getElementById("emailimput").value;
        const password = document.getElementById("passwordimput").value; 
        const checksession = document.getElementById("sessioncheck").checked; 

        const account = getAccount(email);

        if(!account){
            alert("Oops! Verifique o usuário ou a senha.");
            return;
        }

        if(account) {
            if(account.password !== password) {
                alert("Oops! Verifique o usuário ou a senha.");        
                return; }

                saveSession(email, checksession)

                window.location.href = "home.html";
        }

        
 });

//Criar conta//
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault(); 
    const email = document.getElementById("email-create-imput").value;
    const password = document.getElementById("password-create-imput").value;    


    if(email.lenght < 5) {alert("Preencha o campo com um email válido"); return;}
    if(password.lenght < 4) {alert("Utilize no mínimo 4 dígitos"); return;}
    


       saveAccount({
         login: email, password: password, transactions: []  });
   
        myModal.hide(); 
        alert("Conta criada com sucesso");         
});

function checkLogged(){
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html";

    }
}

function saveAccount(data) {
    console.log(data);
    localStorage.setItem(data.login, JSON.stringify(data)); // JSON.stringify transforma para objeto na hora de salvar. (Padrão)

}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);
    if(account) {
        return JSON.parse(account); //JSON.parse reverte a transformação para objeto.
    }

    return "";

}







