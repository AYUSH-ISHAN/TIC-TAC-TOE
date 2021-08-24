
// Taking PLayers name 


// Put PRINCE OF PERSIA song  .....

// make it a symbol type thing and then analyse using Conditiona  ? : :

do{

	var p1_name = prompt("Please enter valid Player 1 name", "Player 1");

}while(p1_name == null || p1_name == "");

do{
	var p2_name = prompt("Please enter Player 2 name", "Player 2");

}while(p2_name == null || p2_name == "");

// when click on show score then a window appears or a kind of pop of the score

// check the efficiency by both including 'onclick' in Java file and HTML file.

let arena = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
]

// for cross we take it to represent it wih 1
// for circle we take -1 and for no enter we have 0

var choice;
var player_1;

var P1_score = 0;
var P2_score = 0;

const x = document.getElementById("X");
const o = document.getElementById("O");


checker = -1
win_checker = 0

function Choice(obj, choose){

	choice = choose;
	player_1 = choose;
	checker = 1;
	x.disabled = true;
	o.disabled = true;
	return choice;

}

function BoxChoose(obj, num){

	if(checker == -1){
		alert("Choose X or O for Player 1");
	}

	row = Math.floor(num / 3);
	cols = num % 3;
	
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
	//if (win_checker>=5){

		// WinCheck();  You have o put Win check part here 
		// only as this function will be executed each time a button is pressed.
		// let str = WinCheck(arena);
		// if (str == "X"){
		// 	if (player_1 == 1){
		// 			// screen pop up of player 1 won this round ..
		// 		P1_score += 1;
		// 		document.getElementById("match_score").innerHTML = "Player 1 won !!";
		// 	}
		// 	else if(player_1 == -1){
		// 		P2_score += 1;
		// 		document.getElementId("match_score").innerHTML = "Player 2 won !!";
		// 	}
		// }
		// if (str == "O"){
		// 	if (player_1 == -1){
		// 			// screen pop up of player 2 won this round ..
		// 		P1_score += 1;
		// 		document.getElementId("match_score").innerHTML = "Player 1 won !!";
		// 	}
		// 	else if (player_1 == 1){
		// 		P2_score += 1;
		// 		document.getElementId("match_score").innerHTML = "Player 2 won !!";
		// 	}
		// }

	//}

}

function WinCheck(arena){

	let str;

	// diagonal _check

	var p_dia = (+arena[0][0]) + (+arena[1][1]) + (+arena[2][2]);
	var s_dia = (+arena[0][2]) + (+arena[1][1]) + (+arena[2][0]);

	if (p_dia == 3 || s_dia == 3){
		str = "X"
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

		else 
			if(sum == -3){

			str = "O";
			return str;
		}
	}
}


function res_game(obj){

	document.querySelectorAll('.input').forEach(elem => {

		elem.innerHTML = " ";
		elem.disabled = false;
	});

	x.disabled = false;
	o.disabled = false;

	checker = -1;
	win_checker = 0;

	document.getElementById("match_score").innerHTML = " ";
	arena_normal(arena);

}

function arena_normal(arena){

	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			arena[i][j] == 0;
		}
	}
}

function res_score(obj){

}


