// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    btnJogarNovamente.classList.remove('invisivel');
    btnReiniciar.classList.add('invisivel');
}

// Função jogar novamente
function jogarNovamente() {
    jogar = true;
    let divis = document.getElementsByClassName("carta");
    for (let i = 0; i < divis.length; i++) {
        divis[i].className = "carta col-6 col-md-3";
        let img = divis[i].querySelector("img");
        if (img) {
            img.remove(); // Remove qualquer imagem presente
        }
    }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
    obj.className = "carta acertou col-6 col-md-3";
    const img = new Image(100);
    img.id = "imagem";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
    obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;

        if (tentativas == 3) {
            btnJogarNovamente.classList.add('invisivel');
            btnReiniciar.classList.remove('invisivel');
        }

        let sorteado = Math.floor(Math.random() * 4); // Agora sorteia entre 0 e 3
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            obj.className = "carta errou col-6 col-md-3";
            const imgErro = new Image(100);
            imgErro.src = "https://compras.wiki.ufsc.br/images/thumb/5/56/Erro.png/600px-Erro.png?20180222192440"; // Caminho da imagem de erro
            obj.appendChild(imgErro);

            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente"');
    }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
