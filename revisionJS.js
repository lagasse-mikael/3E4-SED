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

//                 'a' + + 'a' = NaN => Not A Number
console.log(('b' + 'a' + + 'a' + 'a'))

function displayUser(nom,age){
    console.log(`${nom} a ${age} ans`)
}