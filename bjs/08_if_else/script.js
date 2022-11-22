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
        let answer = toWord();  //Подставляем текстовое представление числа
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
            let answer = toWord();  //Подставляем текстовое представление числа
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
            let answer = toWord(); //Подставляем текстовое представление числа
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
            `Снова победа!\n\u{1F605}`;

        answerField.innerText = answerPhrase;
        gameRun = false; 
    }
})

let units = ["ноль","один","два","три","четыре","пять","шесть","семь","восемь","девять"];
let desunits = ["десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать",] 
let des =["двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"];
let hund = ["сто","двести","триста","четыреста","пятьсот","шестьсот","семьсот","восемьсот","девятьсот"];

function toWord() {
    let answer = String(answerNumber);
    let minus = '-';
    let isMinus;
    let hundNum;
   
    if (answer.includes(minus)){
        answer = answer.replace('-', '');   //Если число содержит минус, вырежим его
        isMinus = true;                     //Если есть минус, поставим переменную в true
    }else {
        isMinus = false;
    }
    if  (answer.length === 3){
        hundNum = answer[0];
        answer =  answer.replace(hundNum, '')
    }
    if (answer.length === 2) {                                    //Если длина числа 2 (10,64 и т.п)
        if (answer[0] == 1) {                                     //Если первая цифра числа = 1
            (!isMinus) ? wordAnswer = desunits[answer[1]] :       //Тогда берем значение из массива с индексом равным второй цифре числа (15 - берем индекс 5)
            wordAnswer ='минус ' + desunits[answer[1]];           //Если есть минус - ставим префикс "минус" 
        }else {                                                   //Если первая цифра числа не 1
            let firstNum = answer[0];                             //Вводим переменную, равную первой цифре числа
            let secNum = answer[1];                               //Вводим переменную, равную второй цифре числа
            //Если вторая цифра ноль, берем значение из массива des, иначе прибавляем к des значение из units
            //Идет проверка на отрицательное значение
            (secNum == 0) ? ((!isMinus) ? wordAnswer = des[firstNum - 2] : wordAnswer = "минус " + des[firstNum - 2]) : 
            ((!isMinus) ? (wordAnswer = des[firstNum - 2]+ ' ' + units[answer[1]]) : (wordAnswer = 'минус ' + des[firstNum - 2]+ ' ' + units[answer[1]]))
        }
    }else if (answer.length === 1) {
        (!isMinus) ? wordAnswer = units[answer[0]] : wordAnswer ='минус ' + units[answer[0]] ;
    }
    //Представление ряда сотен решил добавлять к значению десятков, для этого ввел переменную isHund, которая становится true если длина входящего числа = 3
    if (!!hundNum) {  //Проверка определена ли переменная, отвечающая за сотни
        if (answer % 100 === 0) {   //если остаток от деления равен 0 значит круглое число (100,200 и т.д.)
            (!isMinus) ? (wordAnswer = hund[hundNum-1]) : (wordAnswer = 'минус ' + hund[hundNum-1] )  
        }else if (answer % 100 !== 0 && answer % 100 < 10 ) {
            (!isMinus) ? (wordAnswer = hund[hundNum-1] + ' '+ units[answer % 100 ]) : (wordAnswer = 'минус ' + hund[hundNum-1] + ' '+ units[answer % 100 ])
        }else {
          (!isMinus) ? (wordAnswer = hund[hundNum-1] + ' ' + wordAnswer) : (
           wordAnswer = wordAnswer.replace(' ', ` ${hund[hundNum-1]} `))  //Если есть слово "минус" заменяем пробел после него на пробел+текст сотен
        } 
        
        
    }

    return wordAnswer;
}