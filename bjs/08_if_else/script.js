$(window).on('load', function(){        
    $('#ModalCenter').modal('show'); //При запуске показываем модальное окно с выбором вариантов
    $(".alert").hide(); //Скрываем алерты
     });
//Объявляем переменные
let answerNumber = 0;    
let orderNumber = 0;
let gameRun = false;
let minValue = 0;
let maxValue = 0;
let alertText = document.querySelector('.alert span');//Селектор текста алерта (модальное окно)
let gameAlertText = document.querySelector('#game-alert-text');//Селектор текста алерта (окно игры)
//let InputMin = document.getElementById('btnRetry')
let InputMin = document.querySelector('#min-value');//Селектор поля мин.значение
let InputMax = document.querySelector('#max-value');//Селектор поля макс.значение
const orderNumberField = document.getElementById('orderNumberField'); //поле Вопрос №
const answerField = document.getElementById('answerField');//поле ответа
//Обработка кнопки Сохранить в модальном окне
document.querySelector('.btn-primary').addEventListener('click', () => {    
    if (parseInt(InputMin.value)>= parseInt(InputMax.value)){ 
        alertText.textContent = "Минимальное число должно быть больше максимального!"
        $("#modal-alert").show();
    } else if (isNaN(parseInt(InputMin.value)) || isNaN(parseInt(InputMax.value)) ){
        InputMin.value = 0;
        InputMax.value = 100;
        alertText.textContent = "Некоторые числа неопределены. Полям будут установлены стандартные значения."
        $("#modal-alert").show();
    } else if (parseInt(InputMin.value) < parseInt(InputMax.value)) {

        ((parseInt(InputMin.value) < -999) && (parseInt(InputMax.value) > 999)) ? 
            (minValue  = -999,
            maxValue = 999,
            gameAlertText.textContent = `Границы значений превышены, минимальное значение будет выставлено на ${minValue},
            а максимальное на ${maxValue}`,
            $("#game-alert").show()) :
                (parseInt(InputMin.value) < -999) ? 
                    (minValue  = -999,
                    gameAlertText.textContent = `Минимальное значение превышено, его значение будет установлено на ${minValue}`,
                    $("#game-alert").show()) :
                      (parseInt(InputMax.value) > 999) ? 
                        (maxValue = 999,
                        gameAlertText.textContent = `Максимальное значение превышено, его значение будет установлено на ${maxValue}`,
                        $("#game-alert").show()) :
                        (maxValue = parseInt(InputMax.value),
                        minValue = parseInt(InputMin.value),
                        $(".alert").hide());

        answerNumber  = Math.floor((minValue + maxValue) / 2); //округление числа до целых в меньшую сторону 
        let answer = toWord();
        orderNumber = 1;
        gameRun = true;
        $('#ModalCenter').modal('hide');
        orderNumberField.innerText = orderNumber;
        answerField.innerText = `Вы загадали число ${answer}?`;
        }
    //}
})
 // Кнопка заново
document.getElementById('btnRetry').addEventListener('click', function () {
    $('#ModalCenter').modal('show');
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
    gameRun = false;
})
//Обработка кнопки "Больше"
document.getElementById('btnOver').addEventListener('click', function () {
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
            let answer = toWord();
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answer }?` : (phraseRandom === 1) ?
                `Наверное это число ${answer }`:
                `Непростая задача, но это ${answer }?..`;

            answerField.innerText = answerPhrase;
        }
    }
})
//Обработка кнопки "Меньше"
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
            let answer = toWord();
            console.log(answer);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 0) ?
                `Вы загадали число ${answer }?` : (phraseRandom === 1) ?
                `Наверное это число ${answer }`:
                `Непростая задача, но это ${answer }?..`;

            answerField.innerText = answerPhrase;
        }
        console.log(answerNumber);
    }
})
//Обработка кнопки "Верно"
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random() * 2);
        const answerPhrase = (phraseRandom === 0) ?
            `Я всегда угадываю\n\u{1F60E}` : (phraseRandom === 1) ?
            `Это было легко\n\u{1F60F}`:
            `Снова победа! Старайтесь лучше!\n\u{1F605}`;

        answerField.innerText = answerPhrase;
        gameRun = false; 
    }
})

let units = ["один","два","три","четыре","пять","шесть","семь","восемь","девять"];
let desunits = ["десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадацть","девятнадцать",] 
let des =["двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"];
let hund = ["сто","двести","триста","четыреста","пятьсот","шестьсот","семьсот","восемьсот","девятьсот"];

function toWord() {
    let answer = String(answerNumber);
    if (answer.length === 2) {                              //Если длина числа 2 (10,64 и т.п)
        if (answer[0] = 1) {                                //Если первая цифра числа = 1
            wordAnswer = desunits[answer[1]]                //Тогда берем значение из массива с индексом равным второй цифре числа (15 - берем индекс 5)
        }else {                                             //Если первая цифра числа не 1
            let firstNum = answer[0];                       //Вводим переменную, равную первой цифре числа
            let secNum = answer[1];
            //Если вторая цифра ноль, берем просто значение из массива des, иначе прибавляем к des значение из units
            (secNum === 0) ? (wordAnswer = des[firstNum - 2]) : (wordAnswer = des[firstNum - 2]+ ' ' + units[answer[1]])
        }

    }
    if (answer.length === 1) {
        wordAnswer = units[answer[0]-1];
    }
    return wordAnswer;
}