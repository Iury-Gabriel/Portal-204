document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menuIcon');
    const fecharIcon = document.querySelector('.fecharIcon');
    const navBarMobile = document.querySelector('.navBarMobile');

    var currentPage = window.location.pathname.split("/").pop(); // Obtém o nome do arquivo atual

    // Adiciona a classe 'active' ao link da página atual
    var links = document.querySelectorAll(".navBarDesktop ul li a, .navBarMobile ul li a");
    links.forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

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



