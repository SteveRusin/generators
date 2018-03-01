const nestedObj = {
    key1: 'value1',
    key2: 'value2',
    key3: {
        key4: 'value4',
        key5: 'value5',
        key6: {
            key7: 'value7',
            key8: 'value8',
        },
        key9: 'value9'
    },
    key10: 'value10',
}

function* generator(obj) {
    yield* Object.entries(obj);
    return 'done';
}

function genWrapper(generator, obj, key) {
    const myGen = generator(obj, key);
    const nestedObjs = [];

    function handleGen({ value, done }) {
        const [yKey, yValue] = value;
        if (yKey === key) {
            return yValue;
        }

        if (typeof yValue === 'object') {
            nestedObjs.push(yValue)
        }

        if (done) {
            return !!nestedObjs.length ? nestedObjs.map(el => genWrapper(generator, el, key)) : 'Nothing found';
        }
        
        return handleGen(myGen.next())
    }

    return handleGen(myGen.next());
}

function unwrapResult(result) {
    return Array.isArray(result) ? result.reduce(el => el).toString() : result;
}

console.log(unwrapResult(genWrapper(generator, nestedObj, 'key9')))

