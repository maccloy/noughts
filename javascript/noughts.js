let currentPlayer = 1;

const emptySquare = 0;
const noughtSquare = 1;
const crossSquare = 2;

const emptyImage = "url(img/empty.png)";
const noughtImage = "url(img/nought.png)";
const crossImage = "url(img/cross.png)";

const winningNoughtImage = "url(img/winningNought.png)";
const winningCrossImage = "url(img/winningCross.png)";

const basicImages = [emptyImage, crossImage, noughtImage];
const winningImages = [emptyImage, winningCrossImage, winningNoughtImage];

var boardTracker = { 
	"topLeft": 0, 
	"topCentre": 0, 
	"topRight": 0, 
	"middleLeft": 0, 
	"middleCentre": 0, 
	"middleRight": 0, 
	"bottomLeft": 0, 
	"bottomCentre": 0, 
	"bottomRight": 0, 
}; 

function chooseCell(cell) {
	if (boardTracker[cell] == 0) {
		document.getElementById(cell).style.backgroundImage=basicImages[currentPlayer];
		boardTracker[cell] = currentPlayer;
		
		checkForWin();
	}
	switchPlayer();
	checkForDraw();
}

function checkForDraw() {
	let total = 0;

	for (cell in boardTracker) {
		let value = boardTracker[cell];
		if (value > 0) {
			total++;
		}
	}

	if (total == 9) {
		document.getElementById("label").innerHTML = "Draw";
	}

	console.clear()
	console.log(total)

}

function winningCell(cell) {
	document.getElementById(cell).style.backgroundImage=winningImages[currentPlayer];
}

function switchPlayer() {
	switch (currentPlayer) {
		case 1:
			currentPlayer = 2;
			break;
		case 2:
			currentPlayer = 1;
			break;
    }
	updateInfoDisplay();
}

function updateInfoDisplay() {
	if (currentPlayer != 3) {
        document.getElementById("label").innerHTML = "Player: " + currentPlayer;
    }
}

function checkForWin() {
	checkHorizontalWin();
	checkVerticalWin();
	checkDiagonalWin();
}

function checkDiagonalWin() {
	checkForwardSlash();
	checkBackSlash();
}

function checkHorizontalWin() {
	checkTopRow();
	checkMiddleRow();
	checkBottomRow();
}

function checkVerticalWin() {
	checkLeftColumn();
	checkMiddleColumn();
	checkRightColumn();
}

function endGame() {
    document.getElementById("label").innerHTML = "Winner: " + currentPlayer;
	currentPlayer = 3;
}

function checkMiddleRow() {
	checkForThreeInARow(["middleLeft", "middleCentre", "middleRight"]);
}

function checkTopRow() {
	checkForThreeInARow(["topLeft", "topCentre", "topRight"]);
}

function checkBottomRow() {
	checkForThreeInARow(["bottomLeft", "bottomCentre", "bottomRight"]);
}

function checkLeftColumn() {
	checkForThreeInARow(["topLeft", "middleLeft", "bottomLeft"]);
}

function checkMiddleColumn() {
	checkForThreeInARow(["topCentre", "middleCentre", "bottomCentre"]);
}

function checkRightColumn() {
	checkForThreeInARow(["topRight", "middleRight", "bottomRight"]);
}

// Diagonal wins
function checkForwardSlash() {
	checkForThreeInARow(["bottomLeft", "middleCentre", "topRight"]);
}

function checkBackSlash() {
	checkForThreeInARow(["topLeft", "middleCentre", "bottomRight"]);
}

function hightlightWinningCells(cells) {
	for (i = 0; i < cells.length; i++) {
		document.getElementById(cells[i]).style.backgroundImage=winningImages[currentPlayer];
	}
	endGame();
}

function checkForThreeInARow(cell) {
	if ((boardTracker[cell[0]] == currentPlayer) && (boardTracker[cell[1]] == currentPlayer) && (boardTracker[cell[2]] == currentPlayer)) {
		hightlightWinningCells(cell);
	}
}