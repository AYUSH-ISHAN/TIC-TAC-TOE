// const _ = require("lodash");  

// ask the name of player

do{

	var p1_name = prompt("Please enter valid Player name", "Player 1");

}while(p1_name == null || p1_name == "");

document.getElementById("player_name").innerText = p1_name;

// ask whether they will go first  ?

// const first_move = confirm("Will you go first ?"); 

// global variables decalration and their default setting.

let arena = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
]

// var choice; 
let player, playerAI;  // keeps the track of players symbol choic  

var P1_score = 0;  // these two lines keep track of scores of each player.
var P2_score = 0;

const x = document.getElementById("X");  // the choice box tracker..
const o = document.getElementById("O");

checker = null;
win_checker = 0;

// Symbol choosing and assigning.. symnols..

function Choice(obj, choose){

	// choice = choose;
	player = choose;
	playerAI = (player == 1) ? -1 : 1;
	checker = 1;
	x.disabled = true;
	o.disabled = true;

	if (!confirm('Do you want to go First')) {
	    document.getElementById(4).disabled = true;
	    document.getElementById(4).innerHTML = (playerAI == 1) ? "X" : "O";

	    if (playerAI == "X") {
	      arena[1][1] = 1;
	    } else {
	      arena[1][1] = -1;
	    }
	 }
	return choose;

}

// declaring a function which will give me final result for a particular user

function giveResult(arena, user){

	let result = WinCheck(arena);

	if(result === "X"){
			result = 1;
	}
	else if(result === "O"){
		result = -1;
	}

	if(result === undefined){
		return "Tie";
	}
	else if(result === user){
		return true;
	}
	else if(result === false){
		return false;
	}

}

// decalring function that is called when each ox is selected..

function BoxChoose(obj, num){

	if (player === undefined) {
    window.navigator.vibrate(200);
    alert("Please select X or O");
    return;
  }

  UserEntery(+obj.getAttribute("id"), player);
  obj.innerHTML = (player == 1) ? "X" : "O";

  if (giveResult(arena, player) == false) {
    index = OptimalIndex()
    document.getElementById(index).innerHTML = (playerAI == 1) ? "X" : "O";
    addElement(index, playerAI);

    if (giveResult(arena, playerAI) == true) {
      document.getElementById("match_score").innerHTML = "Aww!Earth Lost Her Best Defender!"
      document.getElementById("match_score").style.display = "block";
      window.navigator.vibrate(200);
      document.querySelectorAll('.input').forEach(elem => {
        elem.disabled = true;
      });
    } else if (giveResult(arena, playerAI) == "Tie") {
      document.getElementById("match_score").innerHTML = "I see this as an Absolute Win!"
      document.getElementById("match_score").style.display = "block";
      window.navigator.vibrate(200);
    }
  } else {
    document.getElementById("match_score").innerHTML = "I see this as an Absolute Win!"
    document.getElementById("match_score").style.display = "block";
    window.navigator.vibrate(200);
  }
}

// declaring function to enter the innerHTML part and disabling hat location

function UserEntery(id, user){

	row = Math.floor(+id / 3);
	cols = +id % 3;
			
	if(user == 1){    // we have X as choice

		arena[row][cols] = 1;
	}

	else{

		arena[row][cols] = -1;
	}

	document.getElementById(id).disabled = true;
}
// declaring a function to check the winner..

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

	for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (+arena[i][j] == 0) {
        return false;
      }
    }
  }
	return str;
}


function OptimalIndex(){
 	
 	return MiniMax(arena, 0, playerAI);
}

function MiniMax(arena_2, user, depth){

		if (giveResult(arena_2, player) == "Tie") {
		    return 0;
		}
		if (giveResult(arena_2, player)) {
		    return depth - 10;
		} 
		else if (giveResult(arena_2, playerAI)) {
		    return 10 - depth;
		} 
		else {

			let best_array = [];
			//console.log(best_array);

			for (let i = 0; i < 3; i++) {
		      for (let j = 0; j < 3; j++) {
			        if (arena_2[i][j] != 0) continue;

			        dummy_arena = arena_2.map(value => value.map(number => number));

			        dummy_arena[i][j] = (user == 1) ? 1 : -1;
			        //console.log(dummy_arena);

			        let vase;
			        if(user == playerAI){

			        	vase = MiniMax(dummy_arena, player, depth + 1);
			        }
			        else{
			        	vase = MiniMax(dummy_arena, playerAI, depth + 1);

			        }

			        best_array.push({

			        	sum: vase,
			        	cell: {
			        		row: i,
			        		col: j
			        	}
			        });
		    	}
		}
		//console.log(dummy_arena);
		console.log(best_array);
		if(user == playerAI){

			const max = _.maxBy(best_array, (c) => {
				return c.sum;
			});
			if(depth == 0){
				return ((+max.best_array.row)*3 + (+max.best_array.col));
			}else{
				return max.sum;
			}
		}

		if (user == player) {
      const min = _.minBy(best_array, (c) => {
        return c.sum;
      });
      if (depth == 0) {
        return ((+min.best_array.row) * 3 + (+min.best_array.col));
      } 
      else
        return min.sum;
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

// code for restart game, show score and make arena as newly made one..

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
