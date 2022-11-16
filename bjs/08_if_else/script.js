$(window).on('load', function(){        
    $('#ModalCenter').modal('show');
     }); 

let answerNumber = 0;    
let orderNumber = 0;
let gameRun = false;

const InputMin = document.querySelector('#min-value');
const InputMax = document.querySelector('#max-value');
document.querySelector('.btn-primary').addEventListener('click', () => {
     
    if (parseInt(InputMin.value)>= parseInt(InputMax.value)){
        $('.btn-primary').popover({
            content: 'Минимальное значение должно быть меньше максимального!'
        })
        return;
    } else if (isNaN(parseInt(InputMin.value)) || isNaN(parseInt(InputMax.value)) ){
        alert('sdsdsd')
    } else if (parseInt(InputMin.value) < parseInt(InputMax.value)) {
        let minValue = parseInt(InputMin.value);
        let maxValue = parseInt(InputMax.value);
        answerNumber  = Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
        orderNumber = 1;
        gameRun = true;
        $('#ModalCenter').modal('hide');
        console.log('minValue = '+ minValue);
        console.log('maxValue = '+ maxValue);
        console.log(InputMin);
        console.log(InputMax.value);
    }
    //console.log((parseInt(InputMax.value) = NaN))
})
//let minValue = parseInt(prompt('Минимальное знание числа для игры','0')); //приводим строку в число
//let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
//alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
// let answerNumber  = 2;//Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
// let orderNumber = 1;
// let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField'); //поле Вопрос №
const answerField = document.getElementById('answerField');//поле  "Вы загадали число"

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;
 // Кнопка заново
document.getElementById('btnRetry').addEventListener('click', function () {
    $('#ModalCenter').modal('show');
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})
//
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false; 
    }
})

