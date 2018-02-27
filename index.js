// https://jsonplaceholder.typicode.com/ 

const usersUrls = [];

for (let i = 1; i <= 10; i++) {
    usersUrls.push(`https://jsonplaceholder.typicode.com/users/${i}`)
}


function* generator() {
    const users = [];
    for (let userUrl of usersUrls) {
        yield fetch(userUrl)
            .then(res => res.json())
            .then(user => users.push(user.name));
    }
    return users;
}

function genWrapper(generator, callback) {
    const usersGen = generator();
    let fetched;
    do {
        fetched = usersGen.next();
    } while (!fetched.done)
    return fetched.value;
}


console.log("open me", genWrapper(generator));

