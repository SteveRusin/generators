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
    yield* Object.entries(obj)
}

function genWrapper(generator, obj, key) {
    const myGen = generator(obj, key);


    function handleGen(yeilded) {
        if (yeilded.value[0] === key) {
            return yeilded.value[1];
        }

        if (yeilded.value && typeof yeilded.value[1] === 'object') {
            return genWrapper(generator, yeilded.value[1], key);
        }

        

        return handleGen(myGen.next())

    }

    return handleGen(myGen.next());
}


console.log(genWrapper(generator, nestedObj, 'key8'))
