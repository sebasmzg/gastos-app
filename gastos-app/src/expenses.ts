type currency = 'COP' | 'USD'; // Definimos un tipo de dato llamado currency que solo puede ser 'COP' o 'USD'

// Definimos una interfaz llamada price que tiene dos propiedades, value que es de tipo number y currency que es de tipo currency
interface price{
    value: number,
    currency: currency
}

// Definimos una interfaz llamada expenseItem que tiene tres propiedades, id que es de tipo number, title que es de tipo string y cost que es de tipo price
interface expenseItem{
    id?: number,
    title: string,
    cost: price
}

// Definimos una interfaz llamada Iexpenses que tiene tres propiedades, expenses que es de tipo arrayList<expenseItem>, finalCurrency que es de tipo currency y un método add que recibe un expenseItem y retorna un boolean
interface Iexpenses{
    expenses: arrayList<expenseItem>,
    finalCurrency: currency,
    add(item:expenseItem):boolean,
    get(index:number):expenseItem|null,
    getTotal():string,
    remove(id:number):boolean
}

// Definimos una clase llamada arrayList que tiene una propiedad items que es de tipo T[]
//<T> es un tipo genérico que se define en tiempo de ejecución
//t[] es un array de cualquier tipo
//tipo void se usa para funciones que no retornan nada
//[...value] es un spread operator que copia el contenido de un array
class arrayList<T>{
    private items:T[] = [];

    add(item:T):void{
        this.items.push(item);
    }

    get(index:number):T|null{
        const item:T[] = this.items.filter((x:T,i:number)=>{
            return i === index;
        })

        if(item.length === 0){
            return null;
        } else{
            return item[0];
        }
    }

    createFrom(value:T[]):void{
        this.items = [...value];
    }

    getAll():T[]{
        return this.items;
    }
}

// Definimos una clase llamada expenses que implementa la interfaz Iexpenses
class Expenses implements Iexpenses{

    expenses: arrayList<expenseItem>;
    finalCurrency: currency;

    private count = 0;

    constructor(currency: currency){
        this.finalCurrency = currency;
        this.expenses = new arrayList<expenseItem>();
    }

    add(item: expenseItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }

    get(index:number): expenseItem | null {
        return this.expenses.get(index);
    }

    getItems():expenseItem[]{
        return this.expenses.getAll();
    }

    private convertCurrency(item: expenseItem, currency: currency){
        switch(item.cost.currency){
            case 'USD':
                switch(currency){
                    case 'COP':
                        return item.cost.value * 4104;
                    default:
                        return item.cost.value;
                }
                break;
            case 'COP':
                switch(currency){
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

    getTotal(): string {
        const total = this.getItems().reduce( (acc,item) =>{
            return acc += this.convertCurrency(item,this.finalCurrency);
        },0);

        return `$${total.toFixed(2).toString()} ${this.finalCurrency}`
    }

    remove(id: number): boolean {
        const items = this.getItems().filter(item =>{
            return item.id !== id;
        });

        this.expenses.createFrom(items);
        return true;
    }

}