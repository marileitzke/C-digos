const myModal = new bootstrap.Modal("#transactionModal"); //Nomeia e configura um modal (janelinha/botão) através do ID específico (nesse caso da página Transactions)
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []  // [] Significa uma lista
};

document.getElementById("buttomlogout").addEventListener("click", logout);  //Para responder a uma ação do usuário, primeiro use document.getElementById(), cujo nos parênteses deve estar o ID de onde o usuário interagiu. Para responder a ação do usuário use .addEventListener("click", logout); Onde nesse caso responde o click do usuário no botão com ID buttomlogout com a função que criamos chamada logout.

checkLogged(); // 1º Verificar se a pessoa está logada


function checkLogged(){
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){     //Se não estiver logado
        
        window.location.href = "login.html";  //Volta pro login
        return;

    }

    const dataUser = localStorage.getItem(logged); //Pegar as informações do usuário logado, caso elas existam.
    if(dataUser) {
        data = JSON.parse(dataUser); //JSON.parse reverte a transformação para objeto.
    }

    getTransactions ();
}

//Adicionar Lançamento
document.getElementById("transaction-form").addEventListener("submit", //Nesse caso o evento não é click e sim submit, pois é algo que será adicionado as nossas informações.
function(e){ e.preventDefault(); //Essa função é para que o usuário não seja redirecionado da página, o que costuma ser o padrão (default)

    //As próximas const são para pegar os valores que o usuário adicionar.
    const value = parseFloat(document.getElementById("value-imput").value); //Como vou fazer cálculos com esse valor, é importante usar afunção parseFloat para transformar o valor em float. (número que possa ter vírgula)
    const description = document.getElementById("description-imput").value;
    const date = document.getElementById("date-imput").value;
    const type = document.querySelector('input[name="type-input"]:checked').value; // document.querySelector procura no html algum componente que condiz com o valor que foi colocado entre parênteses. Checked me dá o valor (entre os que estão com o name="type-input") que está checado/marcado.

    data.transactions.unshift ({ 
     value: value, type:type, description:description, date:date }); // Chamo a let lá de cima e adiciono valores. Push adiciona no final da lista, unshift adiciona no topo da minha lista

        saveData(data); //Chama a função de salvar data        
        e.target.reset(); //Reseta o formulário para nova data ser inserida.

        myModal.hide(); //Fecha a janelinha

        getTransactions ();

        alert("Lançamento adicionado com sucesso.");

        
    });

function logout () {   //Função apra deslogar                        
    sessionStorage.removeItem("logged");  
    localStorage.removeItem("session");
    window.location.href = "login.html";
}

function saveData(data){ //Função para salvar dados
    localStorage.setItem(data.login, JSON.stringify(data)); //Salva data do usuário logado em forma de objeto.

}

//Buscar registros

function getTransactions () {
    const transactions = data.transactions;
    let transHTML = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";
            if (item.type === "2") {
                type = "Saída"
            }

            transHTML += `
            <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.description}</td>
             </tr>`

        })
    }
    document.getElementById("transactions-list").innerHTML = transHTML;
}
