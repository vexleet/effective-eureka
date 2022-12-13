import './style.css'
import {computed, reactive, ref} from './ref';

const count = ref(0)

const countEl = document.getElementById('count')!
const countButtonEl = document.getElementById('count-button')!

computed(() => {
  countEl.innerHTML = count.value.toString()
})

countButtonEl.addEventListener('click', () => {
  count.value++
})

const person = reactive({
  firstName: 'Kristian',
  lastName: 'Malamov'
})

const myFullName = computed(() => person.firstName + ' ' + person.lastName)

console.log(myFullName.value);

person.firstName = 'vex'

console.log(myFullName.value);

person.lastName = 'LEET'

console.log(myFullName.value);

// setInterval(() => {
//   count.value++
// }, 1000)