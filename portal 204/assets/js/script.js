document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menuIcon');
    const fecharIcon = document.querySelector('.fecharIcon');
    const navBarMobile = document.querySelector('.navBarMobile');
    const segundaHorario = document.querySelector('.segundaHorario');
    const tercaHorario = document.querySelector('.tercaHorario');
    const quartaHorario = document.querySelector('.quartaHorario');
    const quintaHorario = document.querySelector('.quintaHorario');
    const sextaHorario = document.querySelector('.sextaHorario');

    function verificarDia() {
        const dataAtual = new Date();
        const diaDaSemana = dataAtual.getDay();

        if (diaDaSemana === 1) {
            segundaHorario.classList.add('show');
        } else if (diaDaSemana === 2) {
            tercaHorario.classList.add('show');
        } else if (diaDaSemana === 3) {
            quartaHorario.classList.add('show');
        } else if (diaDaSemana === 4) {
            quintaHorario.classList.add('show');
        } else if (diaDaSemana === 5) {
            sextaHorario.classList.add('show');
        } else {
            console.log('Erro ao verificar o dia da semana');
        }
    }

    verificarDia();

    menuIcon.addEventListener('click', function() {
        navBarMobile.classList.toggle('active');
        menuIcon.classList.add('inactive');
        fecharIcon.classList.add('activeFecharIcon');
        fecharIcon.classList.remove('fecharIcon');
    });

    fecharIcon.addEventListener('click', function() {
        navBarMobile.classList.remove('active');
        menuIcon.classList.remove('inactive');
        fecharIcon.classList.remove('activeFecharIcon');
        fecharIcon.classList.add('fecharIcon');
    }); 
});



