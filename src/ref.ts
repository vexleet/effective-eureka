const keysFunctions = new Map<string, Set<Function>>()

export function ref(value: number) {

}

export function track(key: string, triggerEvent: Function) {
  if(!keysFunctions.has(key)) {
    keysFunctions.set(key, new Set())
  }

  const keyTriggers = keysFunctions.get(key)!
  keyTriggers.add(triggerEvent)

  keysFunctions.set(key, keyTriggers)
}

export function trigger(key: string) {
  if(keysFunctions.has(key)) {
    for (const myTrigger of keysFunctions.get(key)!.values()) {
      myTrigger()
    }
  }
}