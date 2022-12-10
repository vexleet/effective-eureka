import './style.css'
import {computed, ref} from './ref';

let num1 = ref(2)
let num2 = ref(3)


const sum = computed(() => num1.value + num2.value)
const subtraction = computed(() => num1.value - num2.value)

num1.value = 10

console.log(sum.value());
console.log(subtraction.value());

num1.value = 4
num2.value = 4

console.log(sum.value());
console.log(subtraction.value());