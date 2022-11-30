const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Аменюков"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артём",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Ольга",
            "id_4": "Татьяна",
            "id_5": "Юлия",
            "id_6": "Ксения",
            "id_7": "Эмилия",
            "id_8": "Елена",
            "id_9": "Элла",
            "id_10": "Ярослава"
        }
    }`,
    patronymicJson: `{
        "count": 11,
        "list": {     
            "id_1": "Александров",
            "id_2": "Максимов",
            "id_3": "Иванов",
            "id_4": "Артёмов",
            "id_5": "Дмитриев",
            "id_6": "Сергеев",
            "id_7": "Михаилов",
            "id_8": "Даниилов",
            "id_9": "Егоров",
            "id_10": "Андреев",
            "id_11": "Игорев"
        }
    }`,
    jobsJson: `{
        "count": 7,
        "list": {     
            "id_1": "Программист",
            "id_2": "Строитель",
            "id_3": "Военнослужащий",
            "id_4": "Дизайнер",
            "id_5": "Актёр",
            "id_6": "Арт-директор",
            "id_7": "Документовед"
        }
    }`,
    monthsJson: `{
        "count": 12,
        "list": {     
            "id_1": "января",
            "id_2": "февраля",
            "id_3": "марта",
            "id_4": "апреля",
            "id_5": "мая",
            "id_6": "июня",
            "id_7": "июля",
            "id_8": "августа",
            "id_9": "сентября",
            "id_10": "октября",
            "id_11": "ноября",
            "id_12": "декабря"
        }
    }`,
    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },
    //Генератор имен в зависимости от пола
    randomFirstName: function() {
        if (this.person.gender ==  personGenerator.GENDER_MALE) {           //проверка пола  
           return this.randomValue(this.firstNameMaleJson); 
        }else {
            return this.randomValue(this.firstNameFemaleJson); 
        }
    },

     randomSurname: function() {

        return this.randomValue(this.surnameJson);

    },
    //Получаем случайный пол
    randomGender: function () {
        const number = Math.round(Math.random());
        const randomGender = (number === 1) ? personGenerator.GENDER_MALE : personGenerator.GENDER_FEMALE;
        return randomGender;
    },
    // получакм случайный день
    randomDateDay:function () {
        let day;
        const month = this.person.month;
        if  (month == 1 || month == 3 || month == 4 || month == 7 || month == 8 || month == 10 || month == 12){ //Проверка на месяц, в котором 31 день
            day = this.randomIntNumber(31, 1);
        } else if (month == 2) {
            (this.person.year % 4 == 0) ? (day = this.randomIntNumber(29, 1)) : (day = this.randomIntNumber(28, 1)); //Проверка на високосную дату
        }else { //месяц в котором 30 дней 
            day = this.randomIntNumber(30, 1);
        }
        return day;
    },
    //Получаем случайное число месяца
    randomDatemonth:function () {
        return this.randomIntNumber(12, 1);
    },
    //Получаем случайный год рождения
    randomDateYear:function () {
        return this.randomIntNumber(2022, 1930);
    },
    //генератор отчества, зависит от пола
    randomPatronymic: function () {
      let patronymic = this.randomValue(this.patronymicJson);           //генерируем отчество
      (this.person.gender == personGenerator.GENDER_MALE) ? (patronymic = patronymic + "ич") : (patronymic = patronymic + "на")     //добавляем окончание в зависимости от пола
      return patronymic;
    },
    //генератор работы
    randomJob: function () {
        let job = this.randomValue(this.jobsJson);                      //переменная для сгенерированной работы
        if (this.person.gender == personGenerator.GENDER_FEMALE){       //для женского пола идет проверка
            while (job == "Строитель" || job == "Военнослужащий") {     //пока работа "строитель" или "военнослужащий" заново идет генерация работы
                job = this.randomValue(this.jobsJson);
            }
            return job;
        }else {
            return job;
        } 
    },
    //трансформирование месяца из числа в текст
    monthToText: function () {
        const month = JSON.parse(this.monthsJson);  //список текстовых месяцев
        const propmonth = `id_${this.person.month}`; //id месяца сопоставляется с сгенерированным числовым представлением
        return month.list[propmonth];
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();               //пол
        this.person.firstName = this.randomFirstName();         //имя
        (this.person.gender == personGenerator.GENDER_MALE) ?       
            (this.person.surname = this.randomSurname()) : (this.person.surname = this.randomSurname() + "а") ; //фамилия, в зависимости от пола добавляется окончание
        this.person.year = this.randomDateYear();               //год рождения
        this.person.month = this.randomDatemonth();             //месяц числовой
        this.person.monthText = this.monthToText();             //месяц текстовый
        this.person.day = this.randomDateDay();                 //день
        this.person.patronymic = this.randomPatronymic();       //отчество
        (this.person.year > 1962 && this.person.year < 2004) ? 
            (this.person.job = this.randomJob()) : (this.person.job = 'Нет'); //наличие работы ограничено датой рождения, если возраст больше 60 лет или меньше 18 - работы нет
        return this.person;
    }
};

