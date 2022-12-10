import './style.css'
import {computed, ref} from './ref';

const count = ref(0)

const countEl = document.getElementById('count')!
const countButtonEl = document.getElementById('count-button')!

computed(() => {
  countEl.innerHTML = count.value.toString()
})

countButtonEl.addEventListener('click', () => {
  count.value++
})

// setInterval(() => {
//   count.value++
// }, 1000)