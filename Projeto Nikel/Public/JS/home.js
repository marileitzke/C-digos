
const myModal = new bootstrap.Modal("#transactionModal"); //Nomeia e configura um modal (janelinha/botão) através do ID específico (nesse caso da página Transactions)
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []  // [] Significa uma lista
};


document.getElementById("buttomlogout").addEventListener("click", logout);  //Para responder a uma ação do usuário, primeiro use document.getElementById(), cujo nos parênteses deve estar o ID de onde o usuário interagiu. Para responder a ação do usuário use .addEventListener("click", logout); Onde nesse caso responde o click do usuário no botão com ID buttomlogout com a função que criamos chamada logout.

checkLogged(); // 1º Verificar se a pessoa está logada

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

        getCashIn(); //Já executa a função de trazer as entradas do usuário
        getCashOut();
        getTotal();

        alert("Lançamento adicionado com sucesso.");

        
    });

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

     getCashIn(); //Já executa a função de trazer as entradas do usuário
     getCashOut();
     getTotal();
}

function logout () {   //Função apra deslogar                        
    sessionStorage.removeItem("logged");  
    localStorage.removeItem("session");
    window.location.href = "login.html";
}

function saveData(data){ //Função para salvar dados
    localStorage.setItem(data.login, JSON.stringify(data)); //Salva data do usuário logado em forma de objeto.

}

function getCashIn() { //Pegar apenas os valores de entrada
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type ==="1"); //.filter percorre os itens e "filtra". Nesse caso ele vai encontrar os valores marcados como 1, que equivalem a entradas no html. 

    if(cashIn.length) {
        let cashHtml = `` ; //Crase é equivalente a uma string, mas pode utilziar código dentro dela.
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;          //Ou a gente mostra 5
        } else {
            limit = cashIn.length;  //Ou a gente mostra o que tem
        }

        for (let index = 0; index < limit; index++) { //toFixed é para limitar os valores decimais. ${} é para adicionar um valor que está no objeto no código.
            cashHtml +=  ` 
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                           <p> ${cashIn[index].description}</p> 
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` // += Eu pego o que eu já tinha e adiciono uma coisa a mais. Nesse caso, toda vez que um item novo for adicionado ao cashInHtml, esse código será imprimido na tela.
            
    }

    document.getElementById("cashInList").innerHTML = cashHtml; 
    }
           
}; //innerHTML manda adicionar o valor após o = na minha tag html selecionada.

function getCashOut() { //Pegar apenas os valores de saída
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type ==="2"); //.filter percorre os itens e "filtra". Nesse caso ele vai encontrar os valores marcados como 1, que equivalem a entradas no html. 

    if(cashOut.length) {
        let cashHtml = `` ; //Crase é equivalente a uma string, mas pode utilziar código dentro dela.
        let limit = 0 ;

        if(cashOut.length > 5) {
            limit = 5;          //Ou a gente mostra 5
        } else {
            limit = cashOut.length;  //Ou a gente mostra o que tem
        }
        for (let index = 0; index < limit; index++) { //toFixed é para limitar os valores decimais. ${} é para adicionar um valor que está no objeto no código.
            cashHtml += `  
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                           <p> ${cashOut[index].description}</p> 
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashOut[index].date}
                        </div>
                    </div>
                </div>
            </div>
        </div> `
         // += Eu pego o que eu já tinha e adiciono uma coisa a mais. Nesse caso, toda vez que um item novo for adicionado ao cashInHtml, esse código será imprimido na tela.
            
    }

    document.getElementById("cashOutList").innerHTML = cashHtml; 
    }
           
};

function getTotal(){
    const transactions = data.transactions;
    let total = 0;
    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    
    });

    document.getElementById("total").innerHTML = ` R$ ${total.toFixed(2)}`
}




