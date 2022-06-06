export function compareArrays(arr1: Array<any>, arr2: Array<any>): boolean {
  const len: number = arr1.length
  if (len !== arr2.length) {
    return false
  }
  arr1.sort()
  arr2.sort()
  for (let i = 0; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}