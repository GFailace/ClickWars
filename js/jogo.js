var timerId = null; //variável que armazena a chamada da função timeout

screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait")) {
  // orientation was locked
} else {
  // orientation lock failed
}

function iniciaJogo(){

	var url = window.location.search;	
	var nivel_jogo = url.replace("?", "");
	var tempo_segundos = 0;

	if(nivel_jogo == 1) { //1 fácil -> 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) { //2 normal -> 60segundos
		tempo_segundos = 60;
	}
	
	if(nivel_jogo == 3) { //3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de items
	var qtde_items = 70;
	
	cria_items(qtde_items);

	//imprimir qtde items inteiros
	document.getElementById('inteiros').innerHTML = qtde_items;
	document.getElementById('estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
	
}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function remove_eventos() {
    var i = 1; //contado para recuperar items por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('it'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('it'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function game_over(){
	
	swal({
		type: 'error',
		title: 'Fim de jogo, você foi humilhado pelos stormtroopers e deve se juntar a primeira ordem!',
		showCloseButton: true,
		footer: '<input type="button" value="Reiniciar!" onclick="history.go(0)" class="btn btn-lg btn-primary" /> <button class="btn btn-lg btn-primary"><a class="bt" href="index.html">Menu</a></button>',
		showConfirmButton: false
	})
	remove_eventos();
    /*alert('Fim de jogo, você foi humilhado pelos stormtroopers e deve se juntar a Primeira Ordem!');*/
}


function cria_items(qtde_items){

	for(var i = 1; i <= qtde_items; i++){

		var item = document.createElement("img");
		item.src = 'imagens/stormtrooper_small.png';
		item.style.margin = '5px';
		item.id = 'it'+i;
		item.className = 'stmt'
		item.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(item);
	}
}

function estourar(e){

	var id_item = e.id;

	document.getElementById(id_item).setAttribute("onclick","");
	document.getElementById(id_item).src = 'imagens/caveira_small.png';

	pontuacao(-1);

}

function pontuacao(acao){

	var inteiros = document.getElementById('inteiros').innerHTML;
	var estourados  = document.getElementById('estourados').innerHTML;

	inteiros = parseInt(inteiros);
	estourados = parseInt(estourados);

	inteiros = inteiros + acao;
	estourados = estourados - acao;

	document.getElementById('inteiros').innerHTML = inteiros;
	document.getElementById('estourados').innerHTML = estourados;

	situacao_jogo(inteiros);


}

function situacao_jogo(inteiros){
	if(inteiros == 0){
		swal({
			type: 'success',
			title: 'Parabéns, você conseguiu salvar a aliança Rebelde da ameaça!',
			showCloseButton: true,
			footer: '<input type="button" value="Reiniciar!" onclick="history.go(0)" class="btn btn-lg btn-primary" /> <button class="btn btn-lg btn-primary"><a class="bt" href="index.html">Menu</a></button>',
			showConfirmButton: false
		})
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}
