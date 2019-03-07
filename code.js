//дожидаемся полной загрузки страницы
window.onload = function () {

	// Все варианты выигрышей
	var winSteck = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	]
	var goodMoves = [0, 2, 6, 8];
	var badMoves = [1, 3, 5, 7];

	var player;
	var computer;
	var steps = 9;
	var win = false;
	var whoMoved;
	var playerPoints = 0;
	var computerPoints = 0;


	function getRandomArbitary(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	// Рандомно выбирает кто будет ходить первым
	var randomStartPlayer = function(){
		// Если выпадает 0 то ходит компьютер, если 1 то игрок
		if(getRandomArbitary(0, 1) == 0){
			return "player";
		} else{
			return "computer";
		}
	}

	var enemyStep = function(){
		var randomNum;
		var elems = document.querySelectorAll('.sqr');
		var randomCheck;
		if(steps != 0){
			// Логика ходов компьютера
			// Если было 0 или 1 ходов и центр не занят, 
			// то нет опасности, можно ходить в центр
			if(steps >= 8 && !elems[4].innerHTML){
				randomNum = getRandomArbitary(4, 4);
				randomCheck = elems[4].innerHTML;
			} else{
				// НАЧАЛО если можно победить!
				// Если центр уже занят, проверим может ли компьютер победить
				// __
				// cтанет правдой, когда будут 2 очка в var-combo и свободное поле для победы
				var computerCanWin = false;
				var playerCanWin = false;
				var combo = 0; // Считает кол-во совпадений ходящего
				var lastMove = 0; // свободные поля при
				var lastMoveOnField = undefined;
				// Берем каждый вариант победного комбо
				for(var i = 0; i < winSteck.length; i++){
					computerCanWin = false;
					combo = 0; // Считает кол-во совпадений ходящего
					lastMove = 0; // свободные поля при
					lastMoveOnField = undefined;
					// Берем каждый элемент победного комбо и ищем на доске Х или О ходящего
					for(var j = 0; j <= 2; j++){
						if(elems[winSteck[i][j]].innerHTML == computer){
							combo += 1;
						} else if(!elems[winSteck[i][j]].innerHTML && elems[winSteck[i][j]].innerHTML != player){
							lastMove += 1;
							lastMoveOnField = winSteck[i][j];
						}
						if(combo == 2 && lastMove == 1){
							computerCanWin = true;
							break;
						}
					}
					if(computerCanWin == true){
						break;
					}
				}
				// КОНЕЦ если можно победить!	
				// НАЧАЛО если может победить игрок! (и не может компьютер)
				if(!computerCanWin){
						// cтанет правдой, когда будут 2 очка в var-combo и свободное поле для победы
					playerCanWin = false;
					var combo = 0; // Считает кол-во совпадений ходящего
					var lastMove = 0; // свободные поля при
					var lastMoveOnField = undefined;
					// Берем каждый вариант победного комбо
					for(var i = 0; i < winSteck.length; i++){
						playerCanWin = false;
						combo = 0; // Считает кол-во совпадений ходящего
						lastMove = 0; // свободные поля при
						lastMoveOnField = undefined;
						// Берем каждый элемент победного комбо и ищем на доске Х или О ходящего
						for(var j = 0; j <= 2; j++){
							if(elems[winSteck[i][j]].innerHTML == player){
								combo += 1;
							} else if(!elems[winSteck[i][j]].innerHTML && elems[winSteck[i][j]].innerHTML != computer){
								lastMove += 1;
								lastMoveOnField = winSteck[i][j];
							}
							if(combo == 2 && lastMove == 1){
								playerCanWin = true;
								break;
							}
						}
						if(playerCanWin == true){
							break;
						}
					}
				}
				// КОНЕЦ если может победить игрок

				// Теперь проверяем все условия в порядке:
				// если может победить компьютер, 
				// если может победить игрок,
				// else - ходим из списка хороших и плохих ходов
				if(computerCanWin == true){
					randomNum = getRandomArbitary(lastMoveOnField, lastMoveOnField);
					randomCheck = elems[randomNum].innerHTML;
				}else if(playerCanWin == true){
					randomNum = getRandomArbitary(lastMoveOnField, lastMoveOnField);
					randomCheck = elems[randomNum].innerHTML;
				}else{

					// Начало. Этот блок редактирует занятость хороших и плохих ходов
					var newGoodArr = [];
					if(goodMoves.length != 0){
						for(var i = 0; i < goodMoves.length; i++){
							if(!elems[goodMoves[i]].innerHTML){
								newGoodArr.push(goodMoves[i]);
							}
						}
						goodMoves = newGoodArr;
					}else{
						var newBadArr = [];
						console.log(badMoves);
						if(badMoves.length != 0){
							for(var i = 0; i < badMoves.length; i++){
								if(!elems[badMoves[i]].innerHTML){
									newBadArr.push(badMoves[i]);
								}
							}
							badMoves = newBadArr;
						}
					}
					// Конец. Этот блок редактирует занятость хороших и плохих ходов

					// Ходим и вычеркиваем ход из хороших и плохих ходов,
					// пока есть такая возможность
					do {
						if(goodMoves.length != 0){
							var random = goodMoves[getRandomArbitary(0, goodMoves.length-1)];
							randomNum = random;
							randomCheck = elems[randomNum].innerHTML;
						}else if(badMoves.length != 0){
							var random = badMoves[getRandomArbitary(0, badMoves.length-1)];
							randomNum = random;
							randomCheck = elems[randomNum].innerHTML;
						}else{
							break;
						}
					} while (randomCheck);
				}
			}
			elems[randomNum].innerHTML = computer;
			if(computer == "X"){
				elems[randomNum].style.color = "blue";
			} else{
				elems[randomNum].style.color = "red";
			}
			checkWin();
			if(win != true){
				steps -= 1;
				if(steps != 0){
					whoMoved = "player";
				} else{
					writeResult();
				}
			}
		} else{
			writeResult();
		}
	}

	var checkWin = function(){
		var winTriple = 0; // Отсчитывает 3 победные клетки
		var who;
		if(whoMoved == "player"){
			who = player;
		} else{
			who = computer;
		}
		var winLine = [];
		winSteck.forEach(function(item){
			var checkArr = item;
			item.forEach(function(checkArr){
				var sqrs = document.getElementsByClassName('sqr');
				if(sqrs[checkArr].innerHTML == who){
					winTriple += 1;
					winLine.push(checkArr);
				}
				// проверяет условия победы у того, кто ходил
				if(winTriple >= 3){
					var winMessage = document.getElementById("winField");
					winMessage.innerHTML = "Победил " + whoMoved + "!";
					hidder.style.width = "270px";
					hidder.style.height = "270px";
					win = true;
					winLine.forEach(function(winBlock){
						if(player == "X" && whoMoved == "player"){
							sqrs[winBlock].style.backgroundColor = "blue";
							sqrs[winBlock].style.color = "#bbb";
						} else if(player == "O" && whoMoved == "player"){
							sqrs[winBlock].style.backgroundColor = "red";
							sqrs[winBlock].style.color = "#bbb";
						} else if(computer == "X" && whoMoved == "computer"){
							sqrs[winBlock].style.backgroundColor = "blue";
							sqrs[winBlock].style.color = "#bbb";
						} else if(computer == "O" && whoMoved == "computer"){
							sqrs[winBlock].style.backgroundColor = "red";
							sqrs[winBlock].style.color = "#bbb";
						}
					});
					if(whoMoved == "player"){
						var playerPoints_ = document.getElementById("playerPoints");
						playerPoints += 1;
						playerPoints_.innerHTML = playerPoints;
					} else{
						var computerPoints_ = document.getElementById("computerPoints");
						computerPoints += 1;
						computerPoints_.innerHTML = computerPoints;
					}
					// Иначе если закончились свободные ходы, то написать ничью
				} else if(steps == 0){
					writeResult();
				}
			})
			winTriple = 0;
			winLine = [];
		});
	}

	var writeResult = function(){
		var winMessage = document.getElementById("winField");
		winMessage.innerHTML = "Ничья!";
		hidder.style.width = "270px";
		hidder.style.height = "270px";
	}

	var restartButton = document.getElementById("replay");
	restartButton.addEventListener('click', function() {
		var elems = document.querySelectorAll('.sqr')
		elems.forEach(function(elem) {
			elem.innerHTML = "";
		});
		var winMessage = document.getElementById("winField");
		winMessage.innerHTML = "Игра началась!";
		hidder.style.width = "0px";
		hidder.style.height = "0px";
		win = false;
		whoMoved = randomStartPlayer();
		steps = 9;
		goodMoves = [0, 2, 6, 8];
		badMoves = [1, 3, 5, 7];
		startGame();
	});

	
	var playerPoints_ = document.getElementById("playerPoints");
	playerPoints_.innerHTML = 0;
	var computerPoints_ = document.getElementById("computerPoints");
	computerPoints_.innerHTML = 0;

	var startGame = function(){

		var elems = document.querySelectorAll('.sqr')
		elems.forEach(function(elem) {
			elem.style.background = "#aab";
		});

		whoMoved = randomStartPlayer();

		if(whoMoved == "player"){
			player = "X";
			computer = "O";
		} else{
			player = "O";
			computer = "X";
			setTimeout(enemyStep, 300);
		}
	}

	startGame();

	var elems = document.querySelectorAll('.sqr')
	elems.forEach(function(elem) {
		elem.addEventListener('click', function() {
			if(steps != 0){
				if(this.innerHTML == "" && whoMoved == "player"){
					this.innerHTML = player;
					if(player == "X"){
						this.style.color = "blue";
					} else{
						this.style.color = "red";
					}
					checkWin();
					if(win == false){
						steps -= 1;
						whoMoved = "computer";
						setTimeout(enemyStep, 500);
					}
				}
			} else{
				checkWin();
				writeResult();
			}
		})
	})

}