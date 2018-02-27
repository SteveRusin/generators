// https://jsonplaceholder.typicode.com/ 

const usersUrls = [];

for (let i = 1; i <= 10; i++) {
    usersUrls.push(`https://jsonplaceholder.typicode.com/users/${i}`)
}

function* generator() {
    for (let userUrl of usersUrls) {
        const request = yield fetch(userUrl);
        request.then(user => console.log(user.name));
    }
}

function genWrapper(generator) {
    const usersGen = generator();

    function handleGen(yeilded) {

        if (!yeilded.done) {
            yeilded.value.then(serverResponse => handleGen(usersGen.next(serverResponse.json())))
        }
    }

    return handleGen(usersGen.next());
}


genWrapper(generator);