const bAdd = document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = <HTMLInputElement>document.querySelector('#cost');
const inputCurrency: HTMLInputElement = document.querySelector('#currency')!;

const expenses = new Expenses('USD');

render();

bAdd!.addEventListener('click',e=>{
    if(inputTitle!.value !== '' && inputCost!.value !== '' && !isNaN(parseFloat(inputCost!.value))){
        const title = inputTitle!.value;
        const cost = parseFloat(inputCost!.value);
        const currency = inputCurrency!.value as currency;

        expenses.add({title:title, cost:{value:cost, currency: currency}});

        render();
    } else {
        alert('Por favor, llena todos los campos');
    }
})

function render(){
    let html = '';

    expenses.getItems().forEach(item => {
        const {id, title, cost} = item;
        const {value, currency} = cost;

        html += `
        <div class="item">
            <div><span class="currency">${currency}</span> ${cost.value}</div>
            <div>${title}</div>
            <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
        </div>
        `;
    });

    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();

    $$('.bEliminar').forEach(bEliminar =>{
        bEliminar.addEventListener('click', e =>{
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');
            
            expenses.remove(parseInt(id!));

            render();
        })
    })
};

function $(selector:string):HTMLElement{
    return document.querySelector(selector) as HTMLElement;
}

function $$(selector:string):NodeListOf<HTMLElement>{
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}