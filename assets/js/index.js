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

    if (!verificaNota(prova1) || !verificaNota(aep1) || !verificaNota(integrada1) || !verificaNota(prova2) || !verificaNota(aep2) || !verificaNota(integrada2)) {
        alert('Não é possível adicionar notas maiores que 10 ou menores que 0');
        return;
    }

    const media1 = (parseFloat(prova1) * 0.8) + (parseFloat(aep1) * 0.1) + (parseFloat(integrada1) * 0.1);
    console.log('Media 1', media1);
    const media2 = (parseFloat(prova2) * 0.8) + (parseFloat(aep2) * 0.1) + (parseFloat(integrada2) * 0.1);
    console.log('Media 2', media2);
    const mediaFinal = (media1 + media2) / 2;
    console.log('Media Final', mediaFinal);

    let statusAluno = ""

    if(mediaFinal >= 6) {
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

    alunos.push(aluno);
    adicionaLocalStorage(alunos);

    console.log(alunos);
}

function verificaNota(atividade) {
    if (atividade > 10 || atividade < 0)
        return false;
    return true;
}

function adicionaLocalStorage(alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunos));
    alert('Aluno cadastrado com sucesso.');
}