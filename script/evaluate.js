// function evaluate(arena){

// 	// Diagonal Evaluation

// 	if (arena[0][0] == arena[1][1] && arena[1][1] arena[2][2]){

// 		if (arena[2][2] == player_1){
// 			return 10;
// 		}
// 		else if (arena[2][2] == (-player_1)){
// 			return -10;
// 		}
// 	}

// 	else if (arena[0][2] == arena[1][1] && arena[1][1] arena[2][0]){

// 		if (arena[0][2] == player_1){
// 			return 10;
// 		}
// 		else if (arena[0][2] == (-player_1)){
// 			return -10;
// 		}

// 	}
	

// 	// Row Evaluation

// 	for(let row = 0; row < 3; row++){

// 		if(arena[row][0] == arena[row][1] && arena[row][1] == arena[row][2]){

// 			if (arena[row][2] == player_1){
// 				return 10;
// 			}
// 			else if (arena[row][2] == (-player_1)){
// 				return -10;
// 			}
// 		}
// 	}

// 	// Column evaluation

// 	for(let col = 0; col < 3; col++){

// 		if(arena[col][0] == arena[col][1] && arena[col][1] == arena[col][2]){

// 			if (arena[col][2] == player_1){
// 				return 10;
// 			}
// 			else if (arena[col][2] == (-player_1)){
// 				return -10;
// 			}
// 		}
// 	}
// }
