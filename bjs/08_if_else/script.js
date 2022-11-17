let minValue = parseInt(prompt('Минимальное знание числа для игры','0')); //приводим строку в число
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField'); //поле Вопрос №
const answerField = document.getElementById('answerField');//поле  "Вы загадали число"

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;
 // Кнопка заново
    document.getElementById('btnRetry').addEventListener('click', function () {
    orderNumber = 1;
    minValue = 0;
    maxValue = 100;
    orderNumberField.innerText = orderNumber;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
    answerNumber  = Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
    gameRun = true;
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
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
// код для кнопки "меньше"
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
            maxValue = answerNumber  - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})

