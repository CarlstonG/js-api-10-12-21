//Declarion stage
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const totalBtn = document.getElementById('total');

//initial state of data
let data = [];

getRandomUser();


// Fetch state
//fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };

  addData(newUser);
}

//Creating new element and passing it to DOM
//add new obj to data arr, passing arr from addData to > data to > obj
//format number as money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.6
}

//double money function
function doubleMoney() {
    data = data.map((user) => {
        return{...user, money:user.money * 2};
    });
    updateDOM();
}

//filter only millionaire
function showMillionaires(){
    data = data.filter((user) =>
        user.money > 1000000)
    updateDOM();
}

//sorting by richest a and b are helper function we need when sorting numbers
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//calculate total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthEl);
}



function addData(obj){
    data.push(obj)
    updateDOM();
}
//update dom
function updateDOM(providedData = data) {
//clear main div
main.innerHTML = '<h2><strong>Person </strong>Wealth</h2>';

providedData.forEach((item) => {
    const element = document.createElement('div');
    //person is the classname declared on css
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element);
})

}



//event listeners
//event listener add random user 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
totalBtn.addEventListener('click', calculateWealth);