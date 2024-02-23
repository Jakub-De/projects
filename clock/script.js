const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

const handleClock = () => {
	const date = new Date()

	const actualHour = date.getHours()
	const actualMinute = date.getMinutes()
	const actualSecond = date.getSeconds()

	seconds.style.rotate = actualSecond * 6 + 180 + "deg"
	minutes.style.rotate = actualSecond / 10 + actualMinute * 6 + 180 + "deg"
	hours.style.rotate = actualSecond / 120 + actualMinute / 2 + (actualHour % 12) * 30 + 180 + "deg"
}

setInterval(handleClock, 1000)
