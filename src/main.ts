import './style.css'
import {track, trigger} from './ref';

let num1 = 2
let num2 = 3
let sum = num1 + num2

function update() {
  sum = num1 + num2
}

track('sum', update)

console.log(sum);

num1 = 5

trigger('sum')

console.log(sum);

const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    console.log(target, prop, receiver);
    return Reflect.get(...arguments);
  },
};

const proxy2 = new Proxy(target, handler2);

const test = () => proxy2.message1

console.log(test());