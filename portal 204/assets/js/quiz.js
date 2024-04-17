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

    let questaoAtual = 0;
    let questoesCorretas = 0;

    carregarQuestao();

    document.querySelector(".scoreArea button").addEventListener('click', resetarQuiz);

    function carregarQuestao() {
        if (questions[questaoAtual]) {
            let questao = questions[questaoAtual];

            let pct = Math.floor((questaoAtual/questions.length) * 100)

            document.querySelector(".barraDeProgresso").style.width = `${pct}%`;

            document.querySelector(".scoreArea").style.display = 'none';
            document.querySelector(".containerQuestao").style.display = 'block';

            document.querySelector(".questao").innerHTML = questao.question;

            let optionsHtml = "";
            for(let i in questao.options) {
                optionsHtml += `<div data-op="${i}" class="opcao"><span>${parseInt(i)+1}</span>${questao.options[i]}</div>`;
            }

            document.querySelector(".opcoes").innerHTML = optionsHtml;

            document.querySelectorAll(".opcoes .opcao").forEach(item => {
                item.addEventListener('click', opcaoSelecionada);
            })

        } else {
            finishQuiz();
        }
    }

    function opcaoSelecionada(e) {
        let opcao = parseInt(e.target.getAttribute("data-op"));
        if(questions[questaoAtual].answer == opcao) {
            questoesCorretas++;
        }

        questaoAtual++;
        carregarQuestao();
    }

    function finishQuiz() {
        let points = Math.floor((questoesCorretas / questions.length) * 100);

        if(points < 30) {
            document.querySelector(".scoreText1").innerHTML = "Ta triste!";
            document.querySelector(".scorePct").style.color = "crimson";
        } else if(points >= 30 && points < 70) {
            document.querySelector(".scoreText1").innerHTML = "Ta bom!";
            document.querySelector(".scorePct").style.color = "gold";
        } else if(points >= 70) {
            document.querySelector(".scoreText1").innerHTML = "Ta louco!";
            document.querySelector(".scorePct").style.color = "#0d630d";
        }

        document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
        document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${questoesCorretas}!`;

        document.querySelector(".scoreArea").style.display = 'block';
        document.querySelector(".containerQuestao").style.display = 'none';
        document.querySelector(".barraDeProgresso").style.width = '100%';
    }

    function resetarQuiz() {
        questaoAtual = 0;
        questoesCorretas = 0;
        carregarQuestao();
    }
});



