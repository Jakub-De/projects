const yourIcon = document.querySelector(".your-icon")
const yourText = document.querySelector(".your-text")
const oponentIcon = document.querySelector(".oponent-icon")
const oponentText = document.querySelector(".oponent-text")
const buttons = document.querySelectorAll(".btn")
const result = document.querySelector(".result")
const resultInfo = document.querySelector(".result-info")
const playAgainBtn = document.querySelector(".play-again-btn")

const handleButtons = e => {
	disableButtons()
	const dataNumber = e.target.closest("button").getAttribute("data-number")
	const randomNumber = Math.floor(Math.random() * 3) + 1

	switch (dataNumber) {
		case "1":
			yourIcon.innerHTML = '<i class="fa-regular fa-hand-back-fist"></i>'
			yourText.innerHTML = "kamień"
			break
		case "2":
			yourIcon.innerHTML = '<i class="fa-regular fa-hand"></i>'
			yourText.innerHTML = "papier"
			break
		case "3":
			yourIcon.innerHTML = '<i class="fa-regular fa-hand-scissors"></i>'
			yourText.innerHTML = "nożyce"
			break
		default:
			break
	}

	setTimeout(handleOponent, 1000, randomNumber)
	setTimeout(resultFunction, 3000, dataNumber, randomNumber)
	// handleOponent(randomNumber)
	// resultFunction(dataNumber, randomNumber)
}

const handleOponent = randomNumber => {
	switch (randomNumber) {
		case 1:
			oponentIcon.innerHTML = '<i class="fa-regular fa-hand-back-fist"></i>'
			oponentText.innerHTML = "kamień"
			break
		case 2:
			oponentIcon.innerHTML = '<i class="fa-regular fa-hand"></i>'
			oponentText.innerHTML = "papier"
			break
		case 3:
			oponentIcon.innerHTML = '<i class="fa-regular fa-hand-scissors"></i>'
			oponentText.innerHTML = "nożyce"
			break
		default:
			break
	}
}

const disableButtons = () => {
	buttons.forEach(button => {
		button.setAttribute("disabled", "")
	})
}

const enableButtons = () => {
	buttons.forEach(button => {
		button.removeAttribute("disabled")
	})
}

const resultFunction = (yourNumber, oponentNumber) => {
	if (yourNumber == oponentNumber) {
		handleResult("gold", "Remis")
		// console.log("remis")
	} else if (
		(yourNumber == 1 && oponentNumber == 3) ||
		(yourNumber == 2 && oponentNumber == 1) ||
		(yourNumber == 3 && oponentNumber == 2)
	) {
		handleResult("yellowgreen", "Wygrałeś 😃")
		// console.log("wygrana")
	} else if (
		(yourNumber == 1 && oponentNumber == 2) ||
		(yourNumber == 2 && oponentNumber == 3) ||
		(yourNumber == 3 && oponentNumber == 1)
	) {
		handleResult("tomato", "Przegrałeś 😔")
		// console.log("przegrana")
	}
}

const handleResult = (newColor, text) => {
	result.classList.add("result-show")
	resultInfo.innerText = text
	result.style.backgroundColor = `${newColor}`
}

const playAgain = () => {
	result.classList.remove("result-show")
	result.style.backgroundColor = "transparent"
	yourIcon.innerHTML = '<i class="fa-solid fa-plus"></i>'
	yourText.innerHTML = ""
	oponentIcon.innerHTML = '<i class="fa-solid fa-plus"></i>'
	oponentText.innerHTML = ""
    enableButtons()
}

buttons.forEach(button => {
	button.addEventListener("click", handleButtons)
})

playAgainBtn.addEventListener("click", playAgain)
