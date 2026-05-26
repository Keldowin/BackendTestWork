// Разделяем функционал кода !

let database = []
let autoincrement = 1

const CurrencyService = {
    add: (name, ticker) => {
        const currency = {
            id: String(autoincrement++),
            name,
            ticker
        }
        database.push(currency)
        return currency
    },

    getById: (id) => database.find(c => c.id === id),

    getAll: () => database,

    update: (id, name, ticker) => {
        const index = database.findIndex(c => c.id === id)
        if (index === -1) return null

        database[index] = {
            id: id,
            name: name || database[index].name,
            ticker: ticker || database[index].ticker,
        }

        return database[index]
    },

    delete: (id) => {
        const index = database.findIndex(c => c.id === id)
        if (index === -1) return null

        return database.splice(index, 1)[0]
    },
    clear: () => { database = []; autoincrement = 1; }
}

module.exports = CurrencyService;