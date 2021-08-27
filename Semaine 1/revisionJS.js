/* REVISION JAVASCRIPT */
// variables.
let nom = "Mikael";
let age = 19

// print.
displayUser(nom,age);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

// ??????????
const test = true + 1
const test2 = false + 1
const test3 = false + '9'
const test4 = 1 + '1'   // 11 , mais de type 'string' , donc ++ marche pas.

//                   'a' + + 'a' = NaN => Not A Number
//console.log(('b' + 'a' + + 'a' + 'a'))

function displayUser(nom,age){
    //console.log(`${nom} a ${age} ans`)
}

// Collection, tableau, liste

// de type NI?
const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue']

//for(let fruit of fruits)
//    console.log(fruit)
// OU
//fruits.forEach(fruit => console.log(fruit))

const sum = (a,b) => a+b
let resultat = sum(10,20)

//console.log(resultat)

const someFruits = fruits.filter(f => f.length >= 6)

//console.log(someFruits)

// Y'a pas grand difference entre 'const' et 'let' , il sont pareil pareil.
// 'const' ne pourra pas etre redefeni , donc il serait utile a utiliser avec des types de base
// mais avec des listes... pas bin bin necessaire , car on peut toujours push.

let numbers = [10,20,30,40]
const MULTIPLICATEUR = 3

const produits = numbers.map(number => number * MULTIPLICATEUR).filter(n => n >= 75).map(n => n * 15)

//console.log(produits)

const avenger = {
    alterEgo:'Peter Parker',
    hero:'Spider Man',
    movies:[{title:'Spiderman'}, {title:'Spiderman 2'}, {title:'Spiderman 3'}]
}

avenger.movies.forEach(film => console.log(film.title))