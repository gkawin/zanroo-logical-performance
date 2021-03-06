function compact (array) {
  let resIndex = 0
  const result = []
  if (array == null) {
    return result
  }
  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

function generateRangeItems (min, max) {
  if (!min || !max) return []
  console.time('generateRangeItems')
  const arr = Array.from({ length: (max + 1) }, (v, i) => (i < min) ? undefined : i)
  console.timeEnd('generateRangeItems')
  return arr
}

function merge (items) {
  console.time('merge')
  const arr = [].concat.apply([], items)
  console.timeEnd('merge')
  return arr
}

function uniq(arr) {
  // Set iterator is store the unique item. and the performance better than filter and indexOf.
  if (arr.length <= 1) return arr
  console.time('uniq')
  const len = arr.length
  let seen = new Set()
  let result = []
  outer:
  for (let i = 0; i < len; i++) {
    const item = arr[i]
    if (seen.has(item)) continue outer
    seen.add(item)
    result.push(item)
  }
  console.timeEnd('uniq')
  return result
}

function sort (arr) {
  if (arr.length <= 1) return arr
  const len = arr.length
  const pivotIdx = parseInt(len / 2)
  const pivotVal = arr[pivotIdx]
  const less = []
  const more = []
  const same = []
  for (let i = 0; i < len; i++) {
    const item = arr[i]
    if (item === pivotVal) same.push(item)
    if (item < pivotVal) less.push(item)
    if (item > pivotVal) more.push(item)
  }
  return sort(less).concat(same, sort(more))
}

function generateRangeFromMinMaxItems (items) {
  let collection = []
  let idx = 0
  for (const item of items) {
    const max = item[1] || item[0]
    const min = item[0]
    collection[idx++] = compact(generateRangeItems(min, max))
  }
  return uniq(merge(collection))
}

function findHiLow (arr) {
  if (!arr) return []
  const len = arr.length
  const min = arr[0]
  const max = arr[len-1]
  return len === 1 ? [min] : [min, max]
}

function groupConsecutiveWithRange (arr) {
  if (arr.length <= 1) return arr
  const len = arr.length
  let result = []
  let temp = []
  let difference
  for (let i = 0; i < len; i++) {
    const item = arr[i]
    if (difference !== (item - i)) {
      if (difference !== undefined) {
        result.push(findHiLow(temp))
        temp = []
      }
      difference = item - i
    }
    temp.push(item)
  }
  //push last groupped consecutive item
  if (temp.length) {
    result.push(findHiLow(temp))
  }
  return result
}

function main (inputSet, negativeSet) {
  const mergedNegativeItems = generateRangeFromMinMaxItems(negativeSet)
  const mergedInputItems = new Set(generateRangeFromMinMaxItems(inputSet))
  const len = mergedNegativeItems.length
  outer:
  for (var i = 0; i < len; i++) {
    const negative = mergedNegativeItems[i]
    if (mergedInputItems.has(negative)) {
      mergedInputItems.delete(negative)
      continue outer
    }
  }

  return groupConsecutiveWithRange(sort(uniq([...mergedInputItems])))
}

/// expect tests
let inputSet = []
let negativeSet = []
//
console.log(' ======= 1. ===========')
inputSet = [
  [ 1, 5 ],
  [ 2, 20 ]
]
negativeSet = [
  [ 3, 7 ],
]
console.log('[[1,2], [8,20]]', '--- result ---', main(inputSet, negativeSet))
// //
//
console.log(' ======= 2. ===========')
inputSet = [
  [ 3, 15 ],
  [ 2, 20 ],
  [ 5, 10 ]
]
negativeSet = [
  [ 3, 5 ],
  [ 8, 10 ]
]
console.log(`[[2], [6,7], [11,20]]`, '--- result ---', main(inputSet, negativeSet))

console.log(' ======= 3. ===========')
inputSet = [
  [ 1, 7 ],
  [ 5, 20 ],
  [ 25, 100 ]
]
negativeSet = [
  [ 6, 9 ],
  [ 8, 11 ],
  [ 30, 50 ]
]
console.log(`[[1,5], [12,29], [51,100]]`, '--- result ---', main(inputSet, negativeSet))

console.log(' ======= 4. ===========')
inputSet = [
  [ 1, 7 ],
  [ 10, 20 ],
  [ 25, 100 ],
]
negativeSet = [
  [ 2, 5 ],
  [ 11, 21 ],
  [ 30, 50 ],
]
console.log(`[[1], [6,7], [10], [25,29], [51,100]]`, '--- result ---', main(inputSet, negativeSet))
