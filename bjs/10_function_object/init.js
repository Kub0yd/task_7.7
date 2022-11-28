
window.onload = function()
{   
    const initPerson = personGenerator.getPerson();
    let day = "";
    let mounth = "";
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    (initPerson.day < 10) ? (day = '0' + initPerson.day) : (day = initPerson.day); //если день меньше 10 добавляем 0 для читабельности
    (initPerson.mounth < 10) ? (mounth = '0' + initPerson.mounth) : (mounth = initPerson.mounth);
    document.getElementById('birthYearOutput').innerText = day + '.' + mounth + '.' + initPerson.year;
}; 

document.getElementById("button-clear").onclick()