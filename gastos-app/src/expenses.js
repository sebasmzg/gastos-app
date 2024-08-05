"use strict";
// Definimos una clase llamada arrayList que tiene una propiedad items que es de tipo T[]
//<T> es un tipo genérico que se define en tiempo de ejecución
//t[] es un array de cualquier tipo
//tipo void se usa para funciones que no retornan nada
//[...value] es un spread operator que copia el contenido de un array
class arrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
// Definimos una clase llamada expenses que implementa la interfaz Iexpenses
class Expenses {
    constructor(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = new arrayList();
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'COP':
                        return item.cost.value * 4104;
                    default:
                        return item.cost.value;
                }
                break;
            case 'COP':
                switch (currency) {
                    case 'USD':
                        return item.cost.value / 4104;
                    default:
                        return item.cost.value;
                }
                break;
            default:
                return 0;
        }
    }
    getTotal() {
        const total = this.getItems().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);
        return `$${total.toFixed(2).toString()} ${this.finalCurrency}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id !== id;
        });
        this.expenses.createFrom(items);
        return true;
    }
}
