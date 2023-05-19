let result = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
result
    .then((data) => data.json())
    .then((result) => {
        console.log(result);
        return result;
    })
    .catch((result) => {
        console.log(new Error(result));
    });



    
    