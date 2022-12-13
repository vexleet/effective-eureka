const keysFunctions = new WeakMap<object, Map<string, Set<Function>>>()

let activeEffect: Function | null;

function targetHasKey(target: object, key: string) {
  const targetMap = keysFunctions.get(target)

  if(targetMap) {
    return !!targetMap.get(key)
  }

  return false
}

function track(target: object, key: string) {
  if(!targetHasKey(target, key)) {
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

export function reactive<T extends object>(objValue: T) {
  const reactiveProxy = new Proxy<T>(objValue, {
    get(target: T, key: string, receiver: T): any {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target: T, key: string, newValue: any, receiver: T){
      trigger(target, key)
      return Reflect.set(target, key, newValue, receiver)
    }
  })

  return reactiveProxy
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


