var colorSet = [];
var pickedColor;
var easyOption = false;
var newGame = document.querySelector("#newGame");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var h1 = document.querySelector("h1");
var message = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var currentColor = document.querySelector("#colorDisplay");

main();

function main() {
	initColorSet();
	assignColor();
	pickAColor();
	initButtons();
	initSquares();
	hard.classList.add("selected");
	// alert(pickedColor);	
}



function initButtons() {
	newGame.addEventListener("click", function() {
		cleanUp();
		initColorSet();
		assignColor();
		pickAColor();
	});

	hard.addEventListener("click", function() {
		cleanUp();
		initColorSet();
		assignColor();
		for(var i = 0; i < 6; i++) {
			squares[i].style.display = "block";
		}
		pickAColor();
		this.classList.toggle("selected");
		newGame.classList.remove("selected");
		easy.classList.remove("selected");
	});
	easy.addEventListener("click", function() {
		easyOption = true;
		cleanUp();
		initColorSet();
		assignColor();
		for(var i = 0; i < 6; i++) {
			if (i < 3) {
				squares[i].style.display = "block";
			} else {
				squares[i].style.display = "none";
			}
		}
		pickedColor = colorSet[Math.floor((Math.random() * 3))];
		currentColor.textContent = pickedColor;
		this.classList.toggle("selected");
		newGame.classList.remove("selected");
		hard.classList.remove("selected");
	});
}

function changeAllColor() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
	h1.style.backgroundColor = pickedColor;
}

function initSquares() {
	for(var i = 0; i < squares.length; i++) {
		// alert("fuck");
		squares[i].addEventListener("click", function() {
			// console.log(this.style.backgroundColor);
			if (this.style.backgroundColor === pickedColor) {
				message.textContent = "WIN!";
				newGame.textContent = "TRY AGAIN?"
				changeAllColor();
			} else {
				// message.textContent = "INCORRECT";
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function cleanUp() {
	for(var i = 0; i < 6; i++) {
		colorSet.pop();
	}
}

function assignColor() {
	for(var i = 0; i < colorSet.length; i++) {
		squares[i].style.backgroundColor = colorSet[i];
	}
}

function pickAColor() {
	if (easyOption) {
		pickedColor = colorSet[Math.floor((Math.random() * 3))];	
	} else {
		pickedColor = colorSet[Math.floor((Math.random() * 6))];	
	}
	currentColor.textContent = pickedColor;
}

function initColorSet() {
	h1.style.backgroundColor = "steelblue";
	newGame.textContent = "NEW GAME"
	message.textContent = "";
	for(var i = 0; i < 6; i++) {
		colorSet.push(colorRandom());
	}
}

function colorRandom() {
	var red = Math.floor((Math.random() * 256));
	var green = Math.floor((Math.random() * 256));
	var blue = Math.floor((Math.random() * 256));
	return "rgb(" + red + ", "	+ green + ", " + blue + ")";
}