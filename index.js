const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';
const root = document.getElementById("root");
root.innerText = "Loading...";
console.log(fetch(API_URL))

fetch(API_URL)
.then((response) => response.json())
.then(file => {
    console.log(file);
    const fighters = JSON.parse(atob(file.content));
    console.log(fighters);
    
    let names = fighters.map(fighter => {
        console.log(fighter.name);
        return fighter.name;
    }).join('\n');
    root.innerText = names;
})
.catch((err) => {
    console.error(err.message);
});

// let myPromise = new Promise(
//     function(resolve, reject) {
//         setTimeout(() => {
//             console.log("pause is end");
//             reject();
//         }, 5000);
//     }
// );

// myPromise
// .then(function() {
//     console.log("async code is done!!! It's successed!!");
// })
// .catch(function() {
//     console.error("Oupss. It's error.");
// })

// console.log(myPromise);