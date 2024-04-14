//PART ONE//

let validURL = 'http://numbersapi.com';

//1
let favNumber = 5;
$.getJSON(`${validURL}/${favNumber}?json`)
    .then(data => {
    console.log(data);
  });



//2
let favNumbers = [1,2,3]
$.getJSON(`${validURL}/${favNumbers}?json`)
    .then(data => {
    console.log(data);
  })


//3
const ul = document.querySelector('.num-list');

function getFact() {
    favNumber = prompt('Pick a number:');
    return axios.get(`${validURL}/${favNumber}`);
}

let fourNumPromises = [];

for (let i = 0; i < 4; i++){
    fourNumPromises.push(getFact())
}

Promise.all(fourNumPromises)
    .then(n => {
        n.forEach(num => {
            console.log(num.data)
            const li = document.createElement('li');
            li.innerText = num.data;
            ul.appendChild(li);
        });    
    })
    .catch(err => console.log(err, 'ERROR!!'))


