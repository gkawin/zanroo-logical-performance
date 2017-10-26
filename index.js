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
  console.time('generateRangeItems')
  const a = Array.from({ length: (max + 1) }, (v, i) => (i < min) ? undefined : i)
  console.timeEnd('generateRangeItems')
  return a
}

function merge (items) {
  console.time('merge')
  const a = [].concat.apply([], items)
  console.timeEnd('merge')
  return a
}

function uniq(arr) {
  console.time('uniq')
  let seen = {}
  const result = arr.filter((item) => seen.hasOwnProperty(item) ? false : (seen[item] = true))
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

function main (inputSet, negativeSet) {
  const mergeNegativeItems = generateRangeFromMinMaxItems(negativeSet)
  let seenItem = {}
  let collection = []
  let idx = 0
  for (const input of inputSet) {
    const min = input[0]
    const max = input[1] || input [0]
    const range = compact(generateRangeItems(min, max))
    const rangeLength = range.length
    for (var i = 0; i < rangeLength; i++) {
      const testItem = range[i]
      if (mergeNegativeItems.includes(testItem)) {
        continue
      } else {
        if (!seenItem.hasOwnProperty(testItem)) {
          collection[idx++] = testItem
          seenItem[testItem] = true
        }
      }
    }
  }
  collection = sort(collection)
  return collection
}

/// expect tests
let inputSet = []
let negativeSet = []

// console.log(' ======= 1. ===========')
// inputSet = [
//   [ 1, 5 ],
//   [ 2, 20 ]
// ]
// negativeSet = [
//   [ 3, 7 ],
// ]
// console.log('[[1,2], [8,20]]', '--- result ---', main(inputSet, negativeSet))
// //

console.log(' ======= 2. ===========')
inputSet = [
  [ 15, 20 ],
  [ 1, 15 ],
  [ 5, 10 ]
]
negativeSet = [
  [ 3, 5 ],
  [ 8, 10]
]
console.log(`[[2], [6,7], [11,20]]`, '--- result ---', main(inputSet, negativeSet))

// console.log(' ======= 3. ===========')
// inputSet = [
//   [ 1, 7 ],
//   [ 5, 20 ],
//   [ 25, 100 ]
// ]
// negativeSet = [
//   [ 6, 9 ],
//   [ 8, 11 ],
//   [ 30, 50 ]
// ]
// console.log(`[[1,5], [12,29], [51,100]]`, '--- result ---', main(inputSet, negativeSet))
//
// console.log(' ======= 4. ===========')
// inputSet = [
//   [ 1, 7 ],
//   [ 10, 20 ],
//   [ 25, 100 ],
// ]
// negativeSet = [
//   [ 2, 5 ],
//   [ 11, 21 ],
//   [ 30, 50 ]
// ]
// console.log(`[[1], [6,7], [10], [25,29], [51,100]]`, '--- result ---', main(inputSet, negativeSet))
