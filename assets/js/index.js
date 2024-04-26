let alunos = [];

function adicionaDadosAluno() {
    var id = 0;

    if (!localStorage.getItem('alunos'))
        id = 0;
    else
        id = JSON.parse(localStorage.getItem('alunos')).length;

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

    const media1 = (parseFloat(prova1) * 0.8) + (parseFloat(aep1) * 0.1) + (parseFloat(integrada1) * 0.1).toFixed(2);
    const media2 = (parseFloat(prova2) * 0.8) + (parseFloat(aep2) * 0.1) + (parseFloat(integrada2) * 0.1).toFixed(2);
    const mediaFinal = ((media1 + media2) / 2);

    let statusAluno = ""
    if (mediaFinal > 10 || mediaFinal < 0) {
        alert("Média final inválida, tente novamente.");
        return;
    }
    else if (mediaFinal >= 6) {
        statusAluno = 'Aprovado';
    }
    else if (mediaFinal < 6 && mediaFinal >= 3) {
        statusAluno = 'Recuperação';
    }
    else {
        statusAluno = 'Reprovado';
    }

    let aluno = {
        Id: id,
        Nome: nome.trim(),
        Ra: ra,
        Email: email.trim(),
        Prova1: prova1,
        Aep1: aep1,
        Integrada1: integrada1,
        Media1: media1,
        Prova2: prova2,
        Aep2: aep2,
        Integrada2: integrada2,
        media2: media2,
        mediaFinal: mediaFinal,
        status: statusAluno
    }
    try {

        let alunosLocalStorage = JSON.parse(localStorage.getItem('alunos')) || [];

        alunosLocalStorage.push(aluno);

        localStorage.setItem('alunos', JSON.stringify(alunosLocalStorage));

        alert('Aluno cadastrado com sucesso.');

    } catch {
        alert("Algo deu errado ao adicionar aluno.");
    }
}

function limpaCampos() {
    document.getElementById('formCadastro').reset();
}

function executaCadastro() {
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

function manipulaItem(id) {
    alert("Voce esta entrando na função de manipulação e deleção!!!")
    let escolha = prompt("Escolha qual coluna deseja escolher:\nex: Nome, Ra, Prova 1BI, etc");
    if (!escolha) {
        alert("Escolha uma coluna.");
        return;
    }

    const acceptedValues = ['Nome', 'Ra', 'Email', 'Prova 1BI', 'AEP 1BI', 'Integrada 1BI', 'Prova 2BI', 'AEP 2BI', 'Integrada 2BI'];

    if (!acceptedValues.includes(escolha)) {
        alert('Escolha uma coluna válida.');
        return;
    }

    let alunos = localStorage.getItem('alunos');
    alunos = JSON.parse(alunos);

    let aluno = alunos[id];

    switch (escolha) {
        case 'Nome':
            updateSwitch(`${escolha}`, id, aluno, alunos);
            break;

        case 'Ra':
            updateSwitch(`${escolha}`, id, aluno, alunos);
            break;

        case 'Email':
            updateSwitch(`${escolha}`, id, aluno, alunos);
            break;

        case 'Prova 1BI':
            updateSwitch('Prova1', id, aluno, alunos);
            break;

        case 'AEP 1BI':
            updateSwitch('Aep1', id, aluno, alunos);
            break;

        case 'Integrada 1BI':
            updateSwitch('Intregrada1', id, aluno, alunos);
            break;

        case 'Prova 2BI':
            updateSwitch('Prova2', id, aluno, alunos);
            break;

        case 'AEP 2BI':
            updateSwitch('Aep2', id, aluno, alunos);
            break;

        case 'Integrada 2BI':
            updateSwitch('Intregrada2', id, aluno, alunos);
            break;

        default:
            alert('Escolha uma coluna válida.');
    }
}

function updateSwitch(campo, id, aluno, alunos) {
    let alteracao = prompt(`Insira o novo ${campo}:`);
    if (!alteracao) {
        alert('Por favor preencha as informações corretamente');
        return;
    }

    textoEscolhido = document.getElementById(`campo${campo}` + id);
    textoEscolhido.innerHTML = alteracao;
    text = textoEscolhido.innerText;
    updateInfo(`${campo}`, text, id, aluno, alunos);
}

function updateInfo(info, value, id, aluno, alunos) {
    aluno[`${info}`] = value;
    alunos[id] = aluno;
    adicionaLocalStorage(alunos);
}

function adicionaLocalStorage(alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

function recuperaLocalStorage() {
    let dados = JSON.parse(localStorage.getItem("alunos"));
    return dados;
}

function montaTabela() {
    let dados = recuperaLocalStorage();
    let tabela = document.querySelector('#table tbody');
    let contador = 0
    for (contador = 0; contador < dados.length; contador++) {
        let item = tabela.insertRow();
        item.id = "aluno" + dados[contador].id;

        if (dados[contador].status == "Recuperação") {
            item.classList.add("recuperacao")
        } else if (dados[contador].status == "Reprovado") {
            item.classList.add("reprovado")
        } else {
            item.classList.add("aprovado")
        }

        item.innerHTML =
            "<td id='" + "campoNome" + contador + "'>" + dados[contador].Nome + "</td>"
            + "<td id='" + "campoRa" + contador + "'>" + dados[contador].Ra + "</td>"
            + "<td id='" + "campoEmail" + contador + "'>" + dados[contador].Email + "</td>"
            + "<td id='" + "campoProva1" + contador + "'>" + dados[contador].Prova1 + "</td>"
            + "<td id='" + "campoAep1" + contador + "'>" + dados[contador].Aep1 + "</td>"
            + "<td id='" + "campoIntegrada1" + contador + "'>" + dados[contador].Integrada1 + "</td>"
            + "<td id='" + "campoMedia1" + contador + "'>" + dados[contador].Media1 + "</td>"
            + "<td id='" + "campoProva2" + contador + "'>" + dados[contador].Prova2 + "</td>"
            + "<td id='" + "campoAep2" + contador + "'>" + dados[contador].Aep2 + "</td>"
            + "<td id='" + "campoIntegrada2" + contador + "'>" + dados[contador].Integrada2 + "</td>"
            + "<td id='" + "campoMedia2" + contador + "'>" + dados[contador].media2 + "</td>"
            + "<td id='" + "campoMediaFinal" + contador + "'>" + dados[contador].mediaFinal + "</td>"
            + "<td id='" + "campoStatus" + contador + "'>" + dados[contador].status + "</td>"
            + "<td id='" + dados[contador].id + "'><button onclick='manipulaItem(" + dados[contador].Id + ")'>Editar</button></td>"
    }
}

window.onload = function () { montaTabela(); }
