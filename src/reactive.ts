const mySet = new Set<Function>()

export function addToTrigger(method: Function) {
  mySet.add(method)
}

export function trigger() {
  mySet.forEach((setTrigger) => setTrigger())
}