let listaNumerosAleatorios = [];
let quantidadeNumerosSorteados = prompt('Quantos numeros você deseja que o jogo tenha');
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

function mensagemInicial(){
// chama a função e substituí no html o valor que eu quero para suas respectivas tags
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('h2','Boa Sorte!')
    exibirTextoNaTela('p', 'Informe um número entre 1 a '+quantidadeNumerosSorteados)
}

// na chamada da função eu passo a tag ex: h1, p, h2 e o texto que eu quero para substiuir no html
// o campo recebe a tag e no innerhtml eu passo o texto que ira ficar na tag
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //resposiveVoice.speak ira fazer a leitura dos textos na tela, onde eu passo o campo que quero ler, tipo do idioma
    // rate será o tempo de leitura das palavras
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.1})
}

function gerarNumeroAleatorio(){
  let numeroSorteadoLista = parseInt(Math.random() * quantidadeNumerosSorteados + 1);
  // recebo o tamanho de caracteres que tem na lista
  let quantidadeNumerosNaLista = listaNumerosAleatorios.length;
  //vejo se a quantidade de caracteres da lista é igual a quantidade maxima que pode ser sorteado sem repetir
  if (quantidadeNumerosNaLista == quantidadeNumerosSorteados){
    listaNumerosAleatorios = [];
  }
  // includes permite que eu veja se o numerosorteadolista já existe na minha listanumerosaleatorios
    if(listaNumerosAleatorios.includes(numeroSorteadoLista)){
       console.log(listaNumerosAleatorios);
       return gerarNumeroAleatorio();
    }else{
        listaNumerosAleatorios.push(numeroSorteadoLista);
        console.log(listaNumerosAleatorios);
        return numeroSorteadoLista;
    }
}

function verificarChute(){
    let numeroInformado = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'Tentativas: ' : 'Tentativa: ';
    let mensagem = palavraTentativas+tentativas;

    if(numeroInformado == numeroAleatorio){
        exibirTextoNaTela('h1','Parabéns você acertou!!!')
        exibirTextoNaTela('h2',mensagem);
        exibirTextoNaTela('p', 'Clique em Novo jogo e tente acertar novamente o número secreto');
        //retirando do html o atributo disable para habilitar o botão novo jogo de id=reiniciar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if( numeroInformado < numeroAleatorio){
            exibirTextoNaTela('h1','Número informado é menor');
            exibirTextoNaTela('h2', 'Tente Novamente');
            exibirTextoNaTela('p',mensagem); 
        } else{
            exibirTextoNaTela('h1','Número informado é maior');
            exibirTextoNaTela('h2', 'Tente Novamente');
            exibirTextoNaTela('p',mensagem); 
        }
        tentativas++;
        limpaCampoNumeroInformado();
    }
}

// função que seleciona o valor inputado pelo usuário como na tela só tem 1 campo passamos o input direto, caso
//tivesse mais campos, passariamos o id e depois retornamos o valor em branco para ele
function limpaCampoNumeroInformado(){
    let numeroInformado = document.querySelector('input');
    numeroInformado.value = '';
}

function novoJogo(){
    mensagemInicial();
    tentativas=1;
    limpaCampoNumeroInformado();
    //seta o valor disable para o botão novo jogo no html
    document.getElementById('reiniciar').setAttribute('disabled',true);
    numeroAleatorio = gerarNumeroAleatorio();
}