document.addEventListener('DOMContentLoaded', function () {
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

    let name = '';

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

    let questaoAtual = 0;
    let questoesCorretas = 0;

    document.querySelector(".scoreArea button").addEventListener('click', resetarQuiz);
    document.querySelector("#start").addEventListener('click', () => {
        if (document.querySelector("#name").value == "") {
            alert("Por favor, digite seu nome");
            return;
        }
        carregarQuestao();
        name = document.querySelector("#name").value;
        console.log(name);
    });
    const quizName = document.querySelector(".quizName")
    const questionHeader = document.querySelector(".questionHeader")

    function carregarQuestao() {
        if (questions[questaoAtual]) {
            quizName.style.display = 'none';
            questionHeader.style.display = 'block';
            let questao = questions[questaoAtual];

            let pct = Math.floor((questaoAtual / questions.length) * 100)

            document.querySelector(".barraDeProgresso").style.width = `${pct}%`;

            document.querySelector(".scoreArea").style.display = 'none';
            document.querySelector(".containerQuestao").style.display = 'block';
            document.querySelector(".titleQuestion").innerHTML = `Questão ${questaoAtual + 1} de ${questions.length}`;


            document.querySelector(".questao").innerHTML = questao.question;

            let optionsHtml = "";
            for (let i in questao.options) {
                optionsHtml += `<div id="op${i}" data-op="${i}" class="opcao"><span>${numeroParaLetra(parseInt(i))}</span>${questao.options[i]}</div>`;
            }

            document.querySelector(".opcoes").innerHTML = optionsHtml;

            document.querySelectorAll(".opcoes .opcao").forEach(item => {
                item.addEventListener('click', opcaoSelecionada);
            })

        } else {
            finishQuiz();
        }
    }

    function numeroParaLetra(numero) {

        return String.fromCharCode(65 + numero);
    }

    function opcaoSelecionada(e) {
        document.querySelectorAll(".opcoes .opcao").forEach(item => {
            item.removeEventListener('click', opcaoSelecionada);
        });

        let opcao = parseInt(e.target.getAttribute("data-op"));
        if (questions[questaoAtual].answer == opcao) {
            questoesCorretas++;
            document.querySelector(`#op${opcao}`).style.backgroundColor = "#0d630d";
        } else {
            document.querySelector(`#op${opcao}`).style.backgroundColor = "crimson";
        }

        questaoAtual++;
        setTimeout(carregarQuestao, 1500);
    }

    function finishQuiz() {
        let points = Math.floor((questoesCorretas / questions.length) * 100);

        let score;
        if (points === 100) {
            score = parseInt(points.toString().substring(0, 2));
        } else if(points === 0) {
            score = 1;
        } else {
            score = parseInt(points.toString().charAt(0));
        }

        if (points < 30) {
            document.querySelector(".scoreText1").innerHTML = "Ta triste!";
            document.querySelector(".scorePct").style.color = "crimson";
        } else if (points >= 30 && points < 70) {
            document.querySelector(".scoreText1").innerHTML = "Ta bom!";
            document.querySelector(".scorePct").style.color = "gold";
        } else if (points >= 70) {
            document.querySelector(".scoreText1").innerHTML = "Ta louco!";
            document.querySelector(".scorePct").style.color = "#0d630d";
        }

        document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
        document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${questoesCorretas}!`;

        document.querySelector(".scoreArea").style.display = 'flex';
        document.querySelector(".containerQuestao").style.display = 'none';
        document.querySelector(".barraDeProgresso").style.width = '100%';


        const data = {
            name: name,
            score: parseInt(score)
        };

        fetch('https://api-quiz-pgwu.onrender.com/ranking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar os resultados para o backend');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resultados enviados com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro ao enviar os resultados para o backend:', error);
            });
    }

    function resetarQuiz() {
        questaoAtual = 0;
        questoesCorretas = 0;
        carregarQuestao();
        const resultArea = document.querySelector('.resultArea');
        resultArea.innerHTML = '';
    }

    document.querySelector(".btnVerRanking").addEventListener('click', async () => {
        try {
            const response = await fetch('https://api-quiz-pgwu.onrender.com/ranking');
            const data = await response.json();

            const ranking = data.ranking;

            const resultArea = document.querySelector('.resultArea');
            resultArea.innerHTML = '';

            ranking.forEach((item, index) => {
                const rankingItem = document.createElement('div');
                rankingItem.classList.add('rankingItem');
                rankingItem.innerHTML = `
                    <span class="rankingPosition">${index + 1}</span>
                    <span class="rankingName">${item.name}</span>
                    <span class="rankingScore">${item.score}</span>
                `;
                resultArea.appendChild(rankingItem);
            });
        } catch (error) {
            console.error('Erro ao obter o ranking:', error);
        }
    });
});



