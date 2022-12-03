import './style.css'
import {addToTrigger, trigger} from './reactive';

let num1 = 2
let num2 = 3
let sum = num1 + num2

function update() {
  sum = num1 + num2
}

addToTrigger(update)

console.log(sum);

num1 = 3

trigger()

console.log(sum);
