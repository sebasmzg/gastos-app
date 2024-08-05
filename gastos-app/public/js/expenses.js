"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Definimos una clase llamada arrayList que tiene una propiedad items que es de tipo T[]
//<T> es un tipo genérico que se define en tiempo de ejecución
//t[] es un array de cualquier tipo
//tipo void se usa para funciones que no retornan nada
//[...value] es un spread operator que copia el contenido de un array
var arrayList = /** @class */ (function () {
    function arrayList() {
        this.items = [];
    }
    arrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    arrayList.prototype.get = function (index) {
        var item = this.items.filter(function (x, i) {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    };
    arrayList.prototype.createFrom = function (value) {
        this.items = __spreadArray([], value, true);
    };
    arrayList.prototype.getAll = function () {
        return this.items;
    };
    return arrayList;
}());
// Definimos una clase llamada expenses que implementa la interfaz Iexpenses
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = new arrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.get(index);
    };
    Expenses.prototype.getItems = function () {
        return this.expenses.getAll();
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
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
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.getItems().reduce(function (acc, item) {
            return acc += _this.convertCurrency(item, _this.finalCurrency);
        }, 0);
        return "$".concat(total.toFixed(2).toString(), " ").concat(this.finalCurrency);
    };
    Expenses.prototype.remove = function (id) {
        var items = this.getItems().filter(function (item) {
            return item.id !== id;
        });
        this.expenses.createFrom(items);
        return true;
    };
    return Expenses;
}());
