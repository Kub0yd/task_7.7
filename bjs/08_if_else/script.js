$(window).on('load', function(){        
    $('#ModalCenter').modal('show');
    $(".alert").hide();
     }); 
let answerNumber = 0;    
let orderNumber = 0;
let gameRun = false;
let minValue = 0;
let maxValue = 0;
let alertText = document.querySelector('.alert span');
const InputMin = document.querySelector('#min-value');
const InputMax = document.querySelector('#max-value');

const orderNumberField = document.getElementById('orderNumberField'); //поле Вопрос №
const answerField = document.getElementById('answerField');//поле  "Вы загадали число"
document.querySelector('.btn-primary').addEventListener('click', () => {
     
    if (parseInt(InputMin.value)>= parseInt(InputMax.value)){ //Алерт
        
        alertText.textContent = "Минимальное число должно быть больше максимального!"
        $(".alert").show();
        return;
    } else if (isNaN(parseInt(InputMin.value)) || isNaN(parseInt(InputMax.value)) ){
        alertText.textContent = "Введите числа корректно!"
        $(".alert").show();
    } else if (parseInt(InputMin.value) < parseInt(InputMax.value)) {
        minValue = parseInt(InputMin.value);
        maxValue = parseInt(InputMax.value);
        answerNumber  = Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
        orderNumber = 1;
        gameRun = true;
        $('#ModalCenter').modal('hide');
        orderNumberField.innerText = orderNumber;
        answerField.innerText = `Вы загадали число ${answerNumber }?`;
    }
})
//let minValue = parseInt(prompt('Минимальное знание числа для игры','0')); //приводим строку в число
//let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
//alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
// let answerNumber  = 2;//Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
// let orderNumber = 1;
// let gameRun = true;

 // Кнопка заново
document.getElementById('btnRetry').addEventListener('click', function () {
    $('#ModalCenter').modal('show');
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})

document.getElementById('btnOver').addEventListener('click', function () {
    console.log(minValue);
    console.log(gameRun);
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали неправильное число!\n\u{1F914}` : (phraseRandom === 1) ?
                `Я сдаюсь..\n\u{1F92F}` :
                `Вы жульничаете?!\n\u{1F611}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answerNumber }?` : (phraseRandom === 1) ?
                `Наверное это число ${answerNumber }`:
                `Непростая задача, но это ${answerNumber }?..`;

            answerField.innerText = answerPhrase;
        }
    }
})
//
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали неправильное число!\n\u{1F914}` : (phraseRandom === 1) ?
                `Я сдаюсь..\n\u{1F92F}`:
                `Вы жульничаете?!\n\u{1F611}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answerNumber }?` : (phraseRandom === 1) ?
                `Наверное это число ${answerNumber }`:
                `Непростая задача, но это ${answerNumber }?..`;

            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){

        const phraseRandom = Math.round( Math.random() * 2);
        const answerPhrase = (phraseRandom === 0) ?
            `Я всегда угадываю\n\u{1F60E}` : (phraseRandom === 1) ?
            `Это было легко\n\u{1F60F}`:
            `Снова победа! Приходите еще!\n\u{1F605}`;

        answerField.innerText = answerPhrase;
        gameRun = false; 
    }
})

