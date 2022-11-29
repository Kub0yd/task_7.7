const firstName = document.getElementById('firstNameOutput');
const gender =  document.getElementById('genderOutput');
const surname = document.getElementById('surnameOutput');
const birthYear =  document.getElementById('birthYearOutput');
const buttonClear = document.getElementById("button-clear");
const buttonGenerate = document.getElementById("button-generate");
const patronymic = document.getElementById('patronymic');
const job = document.getElementById('job');

function generateData () {
    const initPerson = personGenerator.getPerson();
    let day = "";
    firstName.innerText = initPerson.firstName;
    gender.innerText = initPerson.gender;
    surname.innerText = initPerson.surname;
    (initPerson.day < 10) ? (day = '0' + initPerson.day) : (day = initPerson.day); //если день меньше 10 добавляем 0 для читабельности
    month = initPerson.monthText;
    birthYear.innerText = day + ' ' + month + ' ' + initPerson.year;
    patronymic.innerText = initPerson.patronymic;
    job.innerText = initPerson.job;
}
window.onload = generateData ();

buttonClear.addEventListener('click', () => {
    firstName.innerText = "";
    gender.innerText = "";
    surname.innerText = "";
    birthYear.innerText = "";
    patronymic.innerText = '';
    job.innerText = '';
})
buttonGenerate.addEventListener('click',() => {
    generateData ();
});