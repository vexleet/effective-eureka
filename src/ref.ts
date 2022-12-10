const keysFunctions = new WeakMap<object, Map<string, Set<Function>>>()

let activeEffect: Function | null;

function track(target: object, key: string) {
  if(!keysFunctions.has(target)) {
    const newMap = new Map()
    newMap.set(key, new Set())
    keysFunctions.set(target, newMap)
  }

  if(activeEffect) {
    const currentSet = keysFunctions.get(target)!.get(key)!
    currentSet.add(activeEffect)
  }
}

function trigger(target: object, key: string) {
  if(keysFunctions.get(target)!.has(key)) {
    for (const myTrigger of keysFunctions.get(target)!.get(key)!.values()) {
      myTrigger()
    }
  }
}

export function ref<T>(value: T) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }

  return refObject
}

export function computed<T>(effect: () => T) {

  activeEffect = effect
  activeEffect()
  activeEffect = null

  return {
    get value() {
      return effect()
    }
  }
}


