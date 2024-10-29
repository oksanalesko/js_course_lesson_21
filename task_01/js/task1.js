"use strict"

if (confirm("Почати тестування?")) {
	window.onload = function () {
		// Задача 1 =================================================
		// Крок 0. Введення даних, позначення величин

		const startTime = new Date()
		const timeOnSiteContainer = document.querySelector("#task-1 .condition")

		// Крок 1. Обчислення результатів

		// функція, що оновлює час на сайті
		function updateTimeOnSite() {
			const currentTime = new Date()
			const diffTime = currentTime - startTime
			// ms різниці переводимо у хвилини та секунди
			const minutes = Math.floor(diffTime / 60000)
			const seconds = Math.floor((diffTime % 60000) / 1000)
			// виводимо хвилини і секунди на сайті в контейнер
			timeOnSiteContainer.innerText = `Ви знаходитесь на сайті ${minutes} хв, ${seconds} сек.`
		}

		// крок 2. Виведення результатів

		// щосекунди оновлюємо час на сайті
		setInterval(updateTimeOnSite, 1000)

		// Задача 2 =====================================================

		// Крок 0. Введення даних, позначення величин
		let procedureStart = new Date()
		// виводимо час початку процедури
		showProcedureStart(procedureStart)

		// Крок 1. Обчислення результатів
		// функція для виводу часу початку процедури
		function showProcedureStart(startTime) {
			document.getElementById("procedureStart").innerText = `Процедура почалася о ${startTime.toLocaleTimeString()}`
		}
		// функція, що отримує поточну тривалість процедури у хвилинах
		function getPassedMinutes(startTime) {
			let currentTime = new Date()
			return (currentTime - startTime) / 60000
		}
		// функція, що виводить тривалість процедури і статус процедури
		function updateProcedureDurationStatus(startTime, duration) {
			let passedMinutes = getPassedMinutes(startTime)
			// Якщо тривалість досягає 30 хв, перериваємо функцію setInterval
			if (passedMinutes >= 30) {
				passedMinutes = 30
				clearInterval(intervalId)
			}
			document.getElementById("procedureProcessTime").innerText = `Процедура триває ${Math.floor(
				passedMinutes
			)} хвилин`
			document.getElementById("isProcedureProcess").innerText = isProcedureProcess(startTime, duration)
				? "Процедура ще триває"
				: "Процедура закінчилася"
		}
		// функція показує, чи ще триває процедура
		function isProcedureProcess(startTime, duration) {
			return getPassedMinutes(startTime) < duration
		}
		// крок 2. Виведення результатів

		// щосекунди запускаємо оновлення статусу процедури
		const intervalId = setInterval(() => {
			updateProcedureDurationStatus(procedureStart, 30)
		}, 1000)

		// Задача 3 =====================================================

		// Крок 0. Введення даних, позначення величин

		const workTimeContainer = document.querySelector("#task-3 .condition")
		updateWorkTimeStatus(workTimeContainer)

		// Крок 1. Обчислення результатів

		function updateWorkTimeStatus(container) {
			let currentTime = new Date()
			let endOfWorkDay = new Date()
			// Встановлюємо час кінця робочого дня 17:00:00
			endOfWorkDay.setHours(17, 0, 0, 0)
			let remainingTime = endOfWorkDay - currentTime
			if (remainingTime > 0) {
				let hours = Math.floor(remainingTime / (1000 * 60 * 60))
				let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
				// для динамічності виведеного часу рахуємо і секунди)
				let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
				container.innerText = `До кінця робочого дня залишилось ${hours} годин, ${minutes} хвилин і ${seconds} секунд`
			} else {
				container.innerText = "Робочий день закінчився"
			}
		}

		// крок 2. Виведення результатів

		// щосекунди оновлюємо час до кінця робочого дня
		setInterval(() => {
			updateWorkTimeStatus(workTimeContainer)
		}, 1000)

		// Задача 4 =====================================================

		// Крок 0. Введення даних, позначення величин

		// створила масив з об'єктами міст (назва, часовий пояс)
		const cities = [
			{name: "Лондон", timeZone: "Europe/London"},
			{name: "Париж", timeZone: "Europe/Paris"},
			{name: "Сідней", timeZone: "Australia/Sydney"},
		]
		// виклик функції оновлення часу
		updateTimeForCities(cities)

		// Крок 1. Обчислення результатів

		function updateTimeForCities(cities) {
			let now = new Date()
			// знаходимо контейнер для виводу
			const container = document.getElementById("timeContainer")
			if (container) {
				container.innerHTML = ""
				cities.forEach((city) => {
					let cityTime = new Date(now.toLocaleString("en-US", {timeZone: city.timeZone}))
					let p = document.createElement("p")
					p.innerText = `${city.name}: ${cityTime.toLocaleTimeString()}`
					container.appendChild(p)
				})
			}
		}

		// крок 2. Виведення результатів

		setInterval(() => updateTimeForCities(cities), 60000)
	}
}
