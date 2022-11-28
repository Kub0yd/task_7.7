const personGenerator = {
    surnameJson: `{  
        "count": 15,
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
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
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

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function() {
        if (this.person.gender ==  personGenerator.GENDER_MALE) {
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
        const mounth = this.person.mounth;
        if  (mounth == 1 || mounth == 3 || mounth == 4 || mounth == 7 || mounth == 8 || mounth == 10 || mounth == 12){ //Проверка на месяц, в котором 31 день
            day = this.randomIntNumber(31, 1);
        } else if (mounth == 2) {
            (this.person.year % 4 == 0) ? (day = this.randomIntNumber(29, 1)) : (day = this.randomIntNumber(28, 1)); //Проверка на високосную дату
        }else { //месяц в котором 30 дней 
            day = this.randomIntNumber(30, 1);
        }
        return day;
    },
    //Получаем случайное число месяца
    randomDateMounth:function () {
        return this.randomIntNumber(12, 1);
    },
    //Получаем случайный год рождения
    randomDateYear:function () {
        return this.randomIntNumber(2022, 1930);
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName();
        (this.person.gender == personGenerator.GENDER_MALE) ?        
            (this.person.surname = this.randomSurname()) : (this.person.surname = this.randomSurname() + "а") ;
        this.person.year = this.randomDateYear();
        this.person.mounth = this.randomDateMounth();
        this.person.day = this.randomDateDay();
        console.log( this.person.year);
        console.log(typeof(this.person.day));
        console.log(typeof(this.person.mounth));
        return this.person;
    }
};
