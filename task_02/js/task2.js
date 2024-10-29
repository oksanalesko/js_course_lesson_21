"use strict"

if (confirm("Почати тестування?")) {
	window.onload = function () {
		// Крок 0. Введення даних, позначення величин

		const container = document.querySelector("#bank .condition")

		// Крок 1. Обчислення результатів
		// батьківський клас
		class Client {
			constructor(id, fullName, balance) {
				this.id = id
				this.fullName = fullName
				this.balance = balance
			}
			// функція для додавання грошей
			addMoney(sum) {
				return (this.balance += sum)
			}
			// функція для знімання грошей
			withdrawMoney(sum) {
				if (this.balance >= sum) {
					return (this.balance -= sum)
				} else {
					alert(`На рахунку бракує коштів для зняття суми: ${sum}!`)
					return this.balance
				}
			}
			toString() {
				return `Клієнт: ${this.fullName}, ID: ${this.id}, Баланс: ${this.balance} $`
			}
		}
		// клас-нащадок
		class GoldenClient extends Client {
			constructor(id, fullName, balance, creditLimit, interestOfCredit) {
				super(id, fullName, balance)
				this.creditLimit = creditLimit
				this.interestOfCredit = interestOfCredit
				this.creditUsed = 0
			}
			// функція для зняття грошей з урахуванням кредитного ліміту
			withdrawMoney(sum) {
				if (this.balance + this.creditLimit >= sum) {
					if (this.balance >= sum) {
						return (this.balance -= sum)
					} else {
						let creditNeeded = sum - this.balance
						this.creditUsed += creditNeeded
						this.balance = 0
						return -this.creditUsed
					}
				} else {
					alert(`Недостатньо коштів і кредитного ліміту для зняття суми: ${sum}!`)
					return this.balance - this.creditUsed
				}
			}
			// функція для визначення пені за використання кредитних коштів
			calcPenalty() {
				return this.creditUsed * (this.interestOfCredit / 100)
			}
			toString() {
				return `Golden Client: ${this.fullName}, ID: ${this.id}, Баланс: ${this.balance} $, Кредитний ліміт: ${
					this.creditLimit
				} $, Використано кредиту: ${this.creditUsed} $, Пені за використання кредиту: ${this.calcPenalty()} $`
			}
		}

		// клас Bank
		class Bank {
			// singleton class
			static bankRef
			constructor() {
				if (Bank.bankRef) {
					return Bank.bankRef
				}
				this.clients = []
				Bank.bankRef = this
			}
			// функція для додавання клієнтів
			addClient(client) {
				this.clients.push(client)
			}
			// функція для виводу всіх простих клієнтів
			listRegularClients() {
				return this.clients.filter((client) => !(client instanceof GoldenClient))
			}
			// функція для виводу всіх GoldenClient
			listGoldenClients() {
				return this.clients.filter((client) => client instanceof GoldenClient)
			}
			// функція для знаходження сумарної кількості грошей на рахунку
			totalBalance() {
				return this.clients.reduce((prevSum, client) => prevSum + client.balance, 0)
			}
			// функція для виводу списків клієнтів та загального балансу
			showClients(containerForShow) {
				const container = containerForShow
				if (container) {
					container.innerHTML = ""

					const regularClients = this.listRegularClients()
					const goldenClients = this.listGoldenClients()

					let regularTitle = document.createElement("h3")
					regularTitle.innerText = "Прості клієнти"
					container.append(regularTitle)

					regularClients.forEach((client) => {
						let p = document.createElement("p")
						p.innerText = client.toString()
						container.append(p)
					})

					let goldenTitle = document.createElement("h3")
					goldenTitle.innerText = "Golden клієнти"
					container.append(goldenTitle)

					goldenClients.forEach((client) => {
						let p = document.createElement("p")
						p.innerText = client.toString()
						container.append(p)
					})

					let totalBalance = document.createElement("p")
					totalBalance.innerText = `Сумарна кількість грошей на рахунках: ${this.totalBalance()} $`
					container.append(totalBalance)
				}
			}
		}
		// крок 2. Виведення результатів

		const bank = new Bank()

		const client1 = new Client("01", "Петро Сабов", 5000)
		const client2 = new Client("02", "Микола Миколайчук", 15000)
		const client3 = new Client("03", "Олена Мельник", 7500)
		const client4 = new GoldenClient("04", "Валерія Коваль", 58000, 100000, 9)
		const client5 = new GoldenClient("05", "Марія Рішко", 33000, 50000, 12)

		bank.addClient(client1)
		bank.addClient(client2)
		bank.addClient(client3)
		bank.addClient(client4)
		bank.addClient(client5)

		client1.addMoney(8000)
		client2.withdrawMoney(20000)
		client3.withdrawMoney(3000)
		client4.withdrawMoney(22500)
		client5.withdrawMoney(45000)

		bank.showClients(container)
	}
}
