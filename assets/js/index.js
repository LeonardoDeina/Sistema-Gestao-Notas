let alunos = [{}];

function adicionaDadosAluno() {
    const id = alunos.length;
    const nome = document.getElementById('input_nome').value;
    const ra = document.getElementById('input_ra').value;
    const email = document.getElementById('input_email').value;
    const prova1 = document.getElementById('input_prova_1').value;
    const aep1 = document.getElementById('input_aep_1').value;
    const integrada1 = document.getElementById('input_prova_integrada_1').value;
    const prova2 = document.getElementById('input_prova_2').value;
    const aep2 = document.getElementById('input_aep_2').value;
    const integrada2 = document.getElementById('input_prova_integrada_2').value;

    if (!nome || nome.trim().length < 1 || !ra || ra.trim().length < 1 || !email || email.trim().length < 1 || !prova1 || !aep1 || !integrada1 || !prova2 || !aep2 || !integrada2) {
        alert('Não é possível adicionar um aluno com informações vazias ou inválidas');
        return;
    }

    if (!verificaProva(prova1) || !verificaAep(aep1) || !verificaAep(integrada1) || !verificaProva(prova2) || !verificaAep(aep2) || !verificaAep(integrada2)) {
        alert('As notas inseridas extrapolam os limites de nota.');
        return;
    }

    const media1 = (parseFloat(prova1) * 0.8) + (parseFloat(aep1) * 0.1) + (parseFloat(integrada1) * 0.1);
    const media2 = (parseFloat(prova2) * 0.8) + (parseFloat(aep2) * 0.1) + (parseFloat(integrada2) * 0.1);
    const mediaFinal = (media1 + media2) / 2;

    let statusAluno = ""
    if (mediaFinal > 10 || mediaFinal < 0) {
        alert("Média final inválida, tente novamente.");
        return;
    }
    else if(mediaFinal >= 6) {
        statusAluno = 'Aprovado';
    }
    else if (mediaFinal < 6 && mediaFinal >= 3) {
        statusAluno = 'Recuperação';
    }
    else {
        statusAluno = 'Reprovado';
    }

    console.log(statusAluno);

    let aluno = {
        id: id,
        nome: nome.trim(),
        ra: ra,
        email: email.trim(),
        prova1: prova1,
        aep1: aep1,
        integrada1: integrada1,
        media1: media1,
        prova2: prova2,
        aep2: aep2,
        integrada2: integrada2,
        media2: media2,
        mediaFinal: mediaFinal,
        status: statusAluno
    }
    try {
        alunos.push(aluno);
        adicionaLocalStorage(alunos);
        console.log(alunos);
    } catch {
        alert("Algo deu errado ao adicionar aluno.")
    }

}

function limpaCampos(){
    document.getElementById('formCadastro').reset();
}

function executaCadastro(){
    adicionaDadosAluno();
    limpaCampos();
}

function verificaProva(prova) {
    if (prova > 8 || prova < 0)
        return false;
    return true;
}
function verificaAep(aep) {
    if (aep > 1 || aep < 0)
        return false;
    return true;
}

function manipulaItem(id){
    alert("Voce esta entrando na função de manipulação e deleção!!!")
    let escolha = prompt("Escolha uma opção: 1 (EDITA NOME), 2 (EDITA EMAIL), 3 (EDITA RA), 4 (EXCLUI REGISTRO)")

    switch (escolha){
        case '1':
            let alteracaoN = prompt("Insira o novo nome:");
            let textoEscolhidoN = document.getElementById("campoNome"+id)
            textoEscolhidoN.innerHTML = alteracao
            break;
        case '2':
            let alteracaoM = prompt("Insira o novo email:");
            let textoEscolhidoM = document.getElementById("campoEmail"+id)
            textoEscolhidoM.innerHTML = alteracaoM
            break;
        case '3':
            let alteracaoR = prompt("Insira o novo RA:");
            let textoEscolhidoR = document.getElementById("campoRa"+id)
            textoEscolhidoR.innerHTML = alteracaoR
            break;
        case '4':
            
            break;
    }
 }


function adicionaLocalStorage(alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunos));
    alert('Aluno cadastrado com sucesso.');
}

function recuperaLocalStorage() {
    let dados = JSON.parse(localStorage.getItem("alunos"));
    return dados;
}

//Espaço para a função de montar a tabela//

function montaTabela(){
    let dados = recuperaLocalStorage();
    let tabela = document.querySelector('#table tbody');
    let contador = 1
    for (contador=1; contador < dados.length; contador++){
        let item = tabela.insertRow();
        item.id = "aluno"+ dados[contador].id;
    
        if (dados[contador].status=="Recuperação"){
            item.classList.add("recuperacao")
        }else if(dados[contador].status=="Reprovado"){
            item.classList.add("reprovado")
        }else{
            item.classList.add("aprovado")
        }
        
        item.innerHTML = //"<td>"+dados[contador].id+"</td>"
        "<td id='"+"campoNome"+contador+"'>"+dados[contador].nome+"</td>"
        + "<td id='"+"campoRa"+contador+"'>"+dados[contador].ra+"</td>"
        + "<td id='"+"campoEmail"+contador+"'>"+dados[contador].email+"</td>"
        + "<td id='"+"campoProva1"+contador+"'>"+dados[contador].prova1+"</td>"
        + "<td id='"+"campoAep1"+contador+"'>"+dados[contador].aep1+"</td>"
        + "<td id='"+"campoIntegrada1"+contador+"'>"+dados[contador].integrada1+"</td>"
        + "<td id='"+"campoMedia1"+contador+"'>"+dados[contador].media1+"</td>"
        + "<td id='"+"campoProva2"+contador+"'>"+dados[contador].prova2+"</td>"
        + "<td id='"+"campoAep2"+contador+"'>"+dados[contador].aep2+"</td>"
        + "<td id='"+"campoIntegrada2"+contador+"'>"+dados[contador].integrada2+"</td>"
        + "<td id='"+"campoMedia2"+contador+"'>"+dados[contador].media2+"</td>"
        + "<td id='"+"campoMediaFinal"+contador+"'>"+dados[contador].mediaFinal+"</td>"
        + "<td id='"+"campoStatus"+contador+"'>"+dados[contador].status+"</td>"
        + "<td id='"+dados[contador].id+"'><button onclick='manipulaItem("+dados[contador].id+")'>Editar</button></td>"
    }
}



window.onload = function() {montaTabela();}


