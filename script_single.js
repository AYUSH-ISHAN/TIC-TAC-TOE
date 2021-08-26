
do{

	var p1_name = prompt("Please enter valid Player name", "Player 1");

}while(p1_name == null || p1_name == "");

document.getElementById("player_name").innerHTML = p1_name;

let arena = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
]

// for cross we take it to represent it wih 1
// for circle we take -1 and for no enter we have 0

var choice;
var player_1;
const best_array = [];

var P1_score = 0;
var P2_score = 0;

const x = document.getElementById("X");
const o = document.getElementById("O");


checker = null;
win_checker = 0;

function Choice(obj, choose){

	choice = choose;
	player_1 = choose;
	checker = 1;
	x.disabled = true;
	o.disabled = true;
	return choice;

}

function AIBoxChoose(){

	OptimalIndex(arena);

	row = best_array[0];
	col = best_array[1];

	index = row*3 + col;
	console.log(index, row, col);
	document.getElementById(index).innerHTML = (player_1 == "X") ? "O" : "X";


}

function BoxChoose(obj, num){

	if(checker == null){
		alert("Choose X or O for Player 1");
	}

	row = Math.floor(+num / 3);
	cols = +num % 3;
	
	if(choice == 1){    // we have X as choice

		obj.innerHTML = "X";
		arena[row][cols] = 1;
		choice = -1;

	}

	else if(choice == -1){

		obj.innerHTML = "O";
		arena[row][cols] = -1;
		choice = 1;
	}
	win_checker += 1;
	if (win_checker>=5){

		WinCheck(arena); // You have o put Win check part here 
		//only as this function will be executed each time a button is pressed.
		let str = WinCheck(arena);

		if (str != null){
			document.querySelectorAll(".box").forEach(elem => {
			//elem.innerHTML = " ";
			elem.disabled = true;  // Colour to not change
		});
		}
		if (str == "X"){
			if (player_1 == 1){
					// screen pop up of player 1 won this round ..
				P1_score += 1;
				document.getElementById("match_score").innerHTML = `${p1_name} won !!`;
				document.getElementById("player_1").innerHTML = P1_score;
			}
			else if(player_1 == -1){
				P2_score += 1;
				document.getElementById("match_score").innerHTML = `${p2_name} won !!`;
				document.getElementById("player_2").innerHTML = P2_score;
			}
		}
		else if (str == "O"){
			if (player_1 == -1){
					// screen pop up of player 2 won this round ..
				P1_score += 1;
				document.getElementById("match_score").innerHTML = `${p1_name} won !!`;
				document.getElementById("player_1").innerHTML = P1_score;
			}
			else if (player_1 == 1){
				P2_score += 1;
				document.getElementById("match_score").innerHTML = `${p2_name} won !!`;
				document.getElementById("player_2").innerHTML = P2_score;
			}
		}
		else if (str == null && win_checker == 9){

			document.getElementById("match_score").innerHTML = "It is a TIE ";
		}
	}
	AIBoxChoose();
}

function isMoveLeft(arena){

	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			if (arena[i][j] != 0){
				return false;
			}
		}
	}
	return true;
}

function evaluate(arena){

	str = WinCheck(arena);

	val = (str == "X" && player_1 == 1) ? 10 : -10;
	val = (str == "O" && player_1 == -1) ? 10 : -10;

	if (str == null){     // check whether to replace 'null' with notdefined..
		return 0;
	}

	return val;
}

function MiniMax(arena, depth, isMax){

	if(isMoveLeft(arena)){            // check whether we need to put '== false' there.
		return 0;
	}

	let score = evaluate(arena)

	if(score == 10){
		return 10;
	}

	else if(score == -10){
		return -10;
	}

	if (isMax){

		let best = -1000;

		for(let i = 0; i<3; i++){
			for(let j = 0; j<3 ; j++){

				if (arena[i][j] == 0){

					arena[i][j] == player_1;

					best = Math.max(MiniMax(arena, depth+1, !isMax));

					arena[i][j] == 0;
				}
			}
		}

		return best;
	}

	else{

		let best = 1000;

		for(let i = 0; i<3; i++){
			for(let j = 0; j<3 ; j++){

				if (arena[i][j] == 0){

					arena[i][j] == (-player_1);

					best = Math.min(MiniMax(arena, depth+1, !isMax));  // check by putting !isMax

					arena[i][j] == 0;
				}
			}
		}

		return best;
	}
}


function OptimalIndex(arena){

	let best_val = -1000;
	// row = best_array[0];
	// col = best_array[1];

	for (let i=0; i<3; i++){
		for(let j=0; j<3; j++){

			if(arena[i][j] == 0){

				arena[i][j] == player_1;

				let move_val = MiniMax(arena, 0, false);

				arena[i][j] == 0;

				if(move_val > best_val){

					best_val = move_val;
					best_array[0] = i;
					best_array[1] = j;
				}
			}
		}
	}
}

function WinCheck(arena){

	let str;

	// diagonal _check

	var p_dia = (+arena[0][0]) + (+arena[1][1]) + (+arena[2][2]);
	var s_dia = (+arena[0][2]) + (+arena[1][1]) + (+arena[2][0]);

	if (p_dia == 3 || s_dia == 3){
		str = "X";
		return str;
	}

	else if (p_dia == -3 || s_dia == -3){
			str = "O";
			return str;
	}

	// checking along column

	for(let i=0; i<3; i++){

		let sum = 0;

		for(let j=0; j<3; j++){
			sum += (+arena[i][j]);
		}

		if (sum == 3){

			str = "X";
			return str;
		}

		else if(sum == -3){

			str = "O";
			return str;
		}

	}

	// checking along row

	for(let i=0; i<3; i++){

		let sum = 0;

		for(let j=0; j<3; j++){
			sum += (+arena[j][i]);
		}

		if (sum == 3){

			str = "X";
			return str;
		}

		else if(sum == -3){

			str = "O";
			return str;
		}
	}
}


function res_game(obj){

	document.querySelectorAll(".box").forEach(elem => {
			elem.innerHTML = " ";
			elem.disabled = false;
	});

	x.disabled = false;
	o.disabled = false;

	checker = null;
	win_checker = 0;
	choice = null;

	document.getElementById("match_score").innerHTML = " ";
	arena_normal(arena);

}

function arena_normal(arena){

	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			arena[i][j] = 0;
		}
	}
}

function res_score(obj){
			// try to create a node of table to show the score board...
	document.getElementById("player_1").innerHTML = "0";
	document.getElementById("player_2").innerHTML = "0";

// after reset score, we have to reset the game..

	document.querySelectorAll(".box").forEach(elem => {
			elem.innerHTML = " ";
			elem.disabled = false;
	});

	x.disabled = false;
	o.disabled = false;

	checker = null;
	win_checker = 0;
	choice = null;

	document.getElementById("match_score").innerHTML = " ";
	arena_normal(arena);

}

function ShowScore(obj){

	window.addEventListener('resize', update);
	var table = window.document.getElementById("score_board");
	function update(){
		x.innerHTML = "Browser inner window width: " + 
		  window.innerWidth + ", height: " + window.innerHeight + ".";
	}

	var newWindowObj = window.open("index.html", "newWindow", 
	"menubar=true,location=true,resizable=false,scrollbars=false,width=400,height=300,top=200,left=200");
}
