document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menuIcon');
    const fecharIcon = document.querySelector('.fecharIcon');
    const navBarMobile = document.querySelector('.navBarMobile');
    const segundaHorario = document.querySelector('.segundaHorario');
    const tercaHorario = document.querySelector('.tercaHorario');
    const quartaHorario = document.querySelector('.quartaHorario');
    const quintaHorario = document.querySelector('.quintaHorario');
    const sextaHorario = document.querySelector('.sextaHorario');

    var currentPage = window.location.pathname.split("/").pop(); // Obtém o nome do arquivo atual

    // Adiciona a classe 'active' ao link da página atual
    var links = document.querySelectorAll(".navBarDesktop ul li a, .navBarMobile ul li a");
    links.forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    function verificarDia() {
        const dataAtual = new Date();
        const diaDaSemana = dataAtual.getDay();
        const horaAtual = dataAtual.getHours();

        if (diaDaSemana === 1) {
            if (horaAtual >= 0 && horaAtual <= 17) {
                segundaHorario.classList.add('show');
            } else {
                tercaHorario.classList.add('show');
            }
        } else if (diaDaSemana === 2) {
            if (horaAtual >= 0 && horaAtual <= 17) {
                tercaHorario.classList.add('show');
            } else {
                quartaHorario.classList.add('show');
            }
        } else if (diaDaSemana === 3) {
            if (horaAtual >= 0 && horaAtual <= 17) {
                quartaHorario.classList.add('show');
            } else {
                quintaHorario.classList.add('show');
            }
        } else if (diaDaSemana === 4) {
            if (horaAtual >= 0 && horaAtual <= 17) {
                quintaHorario.classList.add('show');
            } else {
                sextaHorario.classList.add('show');
            }
        } else if (diaDaSemana === 5) {
            if (horaAtual >= 0 && horaAtual <= 17) {
                sextaHorario.classList.add('show');
            } else {
                segundaHorario.classList.add('show');
            }
        } else {
            segundaHorario.classList.add('show');
        }
    }

    verificarDia();

    menuIcon.addEventListener('click', function () {
        navBarMobile.classList.toggle('active');
        menuIcon.classList.add('inactive');
        fecharIcon.classList.add('activeFecharIcon');
        fecharIcon.classList.remove('fecharIcon');
    });

    fecharIcon.addEventListener('click', function () {
        navBarMobile.classList.remove('active');
        menuIcon.classList.remove('inactive');
        fecharIcon.classList.remove('activeFecharIcon');
        fecharIcon.classList.add('fecharIcon');
    });
});



