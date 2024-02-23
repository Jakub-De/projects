const game = document.querySelector(".game")
const bottomText = document.querySelector(".bottom-text")
const btnRestart = document.querySelector(".btn-restart")
const resultList = document.querySelector(".result-list")

let playerArray = []
let oponentArray = []
let results = []
const amount = 3
const max = amount * amount
const xIcon = '<i class="fas fa-multiply"></i>'
const circleIcon = '<i class="far fa-circle"></i>'

const createSquare = id => {
	const newSquare = document.createElement("div")
	newSquare.classList.add("square")
	newSquare.dataset.id = id
	newSquare.dataset.chosen = false
	game.appendChild(newSquare)
}

const createBoard = () => {
	id = 1
	game.style.width = `${amount * 100} px`
	for (let i = 0; i < amount; i++) {
		for (let j = 0; j < amount; j++) {
			createSquare(id)
			id++
		}
		const br = document.createElement("div")
		br.classList.add("break")
		game.appendChild(br)
	}
}

const oponentChoiseId = () => {
	let generatedNumber = false
	let randomNumber = Math.floor(Math.random() * max + 1)
	do {
		if (
			playerArray.includes(randomNumber) ||
			oponentArray.includes(randomNumber)
		) {
			randomNumber = Math.floor(Math.random() * max + 1)
		} else {
			generatedNumber = true
		}
	} while (generatedNumber == false)
	return randomNumber
}

const handleClick = e => {
	const clickedSquare = e.target
	const clickedSquareId = e.target.dataset.id
	if (clickedSquare.getAttribute("data-chosen") == "false") {
		clickedSquare.setAttribute("data-chosen", true)
		clickedSquare.innerHTML = xIcon
		playerArray.push(parseInt(clickedSquareId))
		if (
			playerArray.length + oponentArray.length < max &&
			checkResult(playerArray) == false
		) {
			bottomText.innerText = "Zaczekaj na ruch przeciwnika"
			const ranodmTime = Math.floor(Math.random() * 2000 + 1000)
			setTimeout(oponentMove, ranodmTime)
		}
		showResult()
		game.removeEventListener("click", handleClick)
	}
}

const oponentMove = () => {
	const oponentChoise = oponentChoiseId(max)
	const squares = document.querySelectorAll(".square")
	squares.forEach(square => {
		if (
			square.getAttribute("data-id") == oponentChoise &&
			square.getAttribute("data-chosen") == "false"
		) {
			square.setAttribute("data-chosen", true)
			oponentArray.push(parseInt(oponentChoise))
			square.innerHTML = circleIcon
		}
	})
	bottomText.innerText = "Twój ruch"
	showResult()
}

const checkResult = array => {
	if (
		(array.includes(1) && array.includes(2) && array.includes(3)) ||
		(array.includes(4) && array.includes(5) && array.includes(6)) ||
		(array.includes(7) && array.includes(8) && array.includes(9)) ||
		(array.includes(1) && array.includes(4) && array.includes(7)) ||
		(array.includes(2) && array.includes(5) && array.includes(8)) ||
		(array.includes(3) && array.includes(6) && array.includes(9)) ||
		(array.includes(1) && array.includes(5) && array.includes(9)) ||
		(array.includes(3) && array.includes(5) && array.includes(7))
	) {
		return true
	} else {
		return false
	}
}

const showResult = () => {
	if (checkResult(playerArray) == true) {
		bottomText.innerText = "Wygrana"
		showButton()
		results.push("Wygrana")
		handleResults()
	} else if (checkResult(oponentArray) == true) {
		bottomText.innerText = "Przeciwnik wygrywa"
		showButton()
		results.push("Przeciwnik wygrał")
		handleResults()
	} else if (
		playerArray.length + oponentArray.length == max &&
		checkResult(playerArray) == false &&
		checkResult(oponentArray) == false
	) {
		bottomText.innerText = "Remis"
		showButton()
		results.push("Remis")
		handleResults()
	} else {
		game.addEventListener("click", handleClick)
	}
}

const handleLocalStorage = () => {
	localStorage.removeItem("results")
	localStorage.setItem("results", results)
}

const pushLocalStorageToArray = () => {
	const tempString = localStorage.getItem("results")
	if (tempString != null) {
		const tempArray = tempString.split(",")
		results = tempArray
		showScoreBoard()
	}
}

const handleResults = () => {
	resultList.innerHTML = ""
	if (results.length > 10) {
		results.shift()
	}
	showScoreBoard()
	handleLocalStorage()
}

const showScoreBoard = () => {
	results.reverse().forEach(result => {
		const li = document.createElement("li")
		li.innerText = result
		resultList.appendChild(li)
	})
	results.reverse()
}

const showButton = () => {
	btnRestart.style.top = "50px"
	game.removeEventListener("click", handleClick)
}

const startGame = () => {
	createBoard()
	pushLocalStorageToArray()
	bottomText.innerText = "Twój ruch"
}

const restartGame = () => {
	btnRestart.style.top = ""
	bottomText.innerText = "Twój ruch"
	const squares = document.querySelectorAll(".square")
	squares.forEach(square => {
		square.setAttribute("data-chosen", false)
		square.innerHTML = ""
	})
	playerArray = []
	oponentArray = []
	game.addEventListener("click", handleClick)
}

startGame()
game.addEventListener("click", handleClick)
btnRestart.addEventListener("click", restartGame)
