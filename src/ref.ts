const keysFunctions = new Map<string, Set<Function>>()

// export function ref(value: number) {
//
// }

let effect: Function;

export function track(key: string) {
  if(!keysFunctions.has(key)) {
    keysFunctions.set(key, new Set())
  }

  const keyTriggers = keysFunctions.get(key)!
  keyTriggers.add(effect)

  keysFunctions.set(key, keyTriggers)
}

export function trigger(key: string) {
  if(keysFunctions.has(key)) {
    for (const myTrigger of keysFunctions.get(key)!.values()) {
      myTrigger()
    }
  }
}

export function helloWorld() {
  let num1 = 2
  let num2 = 3
  let sum = num1 + num2

  effect = () => {
    sum = num1 + num2
  }

  track('num1')

  num1 = 3
  console.log(sum);

  trigger('num1')

  console.log(sum);

}

