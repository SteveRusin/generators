// https://jsonplaceholder.typicode.com/ 
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

const usersUrls = [];
let usersGen;
let singleton = true;
let interval;
for (let i = 1; i <= 10; i++) {
    usersUrls.push(`https://jsonplaceholder.typicode.com/users/${i}`)
}

function* generator() {
    for (let user of usersUrls) {
        yield fetch(user);
    }
}

function genWrapper(generator) {
    let fetched;
    singleton = false;
    usersGen = generator();
    interval = setInterval(() => {
        fetched = usersGen.next();

        if (fetched.done) return clearInterval(interval); // exit if all fetched or stop button is pressed

        fetched.value
            .then(response => response.json())
            .then(user => console.log(`Hi, I'm %c${user.name.match(/[^\s]+/)}!`, 'background: 	#00008B; color: #7FFF00'))
    }, 2000)
}




start.addEventListener('click', () => singleton && genWrapper(generator));
stop.addEventListener('click', () => {
    usersGen && usersGen.return();
    clearInterval(interval)
    singleton = true;
}) 