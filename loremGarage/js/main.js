const nav = document.querySelector(".navbar-collapse")
const yearSpan = document.querySelector(".year-span")

const date = new Date().getFullYear()
yearSpan.innerText = date

document.addEventListener("click", () => {
	if (nav.classList.contains("show")) {
		nav.classList.remove("show")
	}
})
