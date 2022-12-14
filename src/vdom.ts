import createElement from './vdom/createElement';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff';

const createVApp = (count) => createElement('div', {
  attrs: {
    id: 'app',
    dataCount: count,
  },
  children: [
    String(count),
    ...Array.from({length: count}, () => createElement('img', {
      attrs: {
        src: 'https://images.freeimages.com/images/large-previews/677/big-apple-1056753.jpg',
        width: '200px',
      },
    }))

  ]
})

let count = 0
let vApp = createVApp(count)
const $app = render(vApp)

let $rootEl = mount($app, document.getElementById('app'))

setInterval(() =>{
  count++
  const vNewApp = createVApp(Math.floor(Math.random() * 10))
  const patch = diff(vApp, vNewApp)
  $rootEl = patch($rootEl)
  vApp = vNewApp
}, 1000)

console.log($app);