const firstName = document.getElementById('firstNameOutput');
const gender =  document.getElementById('genderOutput');
const surname = document.getElementById('surnameOutput');
const birthYear =  document.getElementById('birthYearOutput');
const buttonClear = document.getElementById("button-clear");

window.onload = function()
{   
    const initPerson = personGenerator.getPerson();
    let day = "";
    let mounth = "";
    firstName.innerText = initPerson.firstName;
    gender.innerText = initPerson.gender;
    surname.innerText = initPerson.surname;
    (initPerson.day < 10) ? (day = '0' + initPerson.day) : (day = initPerson.day); //если день меньше 10 добавляем 0 для читабельности
    (initPerson.mounth < 10) ? (mounth = '0' + initPerson.mounth) : (mounth = initPerson.mounth);
    birthYear.innerText = day + '.' + mounth + '.' + initPerson.year;
}; 

buttonClear.addEventListener('click', () => {
    firstName.innerText = "";
    gender.innerText = "";
    surname.innerText = "";
    birthYear.innerText = "";
})