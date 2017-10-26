const { compact } = require('./utils')

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

function intersec (inputSet, negativeSet) {
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
  const mergeNegativeItems = generateRangeFromMinMaxItems(negativeSet)
  const mergeInputItems = generateRangeFromMinMaxItems(inputSet)

  console.log(result)
  //
  // for (const inputs of inputSet) {
  //   const min = inputs[0]
  //   const max = inputs[1] || inputs[0]
  //   console.time('test')
  //   const rangeItems = generateRangeItems(min, max)
  //   console.timeEnd('test')
  //   // collection.push(rangeItems.filter((n) => (!rangeForRejectItems.includes(n)) ? n : undefined))
  // }
  //
  // const mergeCollection = [].concat.apply([], collection)
  // const uniqCollection = Array.from(new Set(mergeCollection))
  // return uniqCollection
}

/// expect tests
let inputSet = []
let negativeSet = []

console.log(' ======= 1. ===========')
inputSet = [
  [ 1, 5 ],
  [ 2, 10 ]
]
negativeSet = [
  [ 3, 5 ],
]
// console.log('[[1,2], [8,20]]', '--- result ---', )
console.log(intersec(inputSet, negativeSet))
// //
// console.log(' ======= 2. ===========')
// inputSet = [
//   [ 3, 15 ],
//   [ 2, 20 ],
//   [ 5, 10 ]
// ]
// negativeSet = [
//   [ 3, 5 ],
//   [ 8, 10]
// ]
// console.log(`[[2], [6,7], [11,20]]`, '--- result ---', intersec(inputSet, negativeSet))
//
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
// console.log(`[[1,5], [12,29], [51,100]]`, '--- result ---', intersec(inputSet, negativeSet))
//
// console.log(' ======= 4. ===========')
// inputSet = [ [ 1, 7 ], [ 10, 20 ], [ 25, 100 ] ]
// negativeSet = [ [ 2, 5 ], [ 11, 21 ], [ 30, 50 ] ]
// console.log(`[[1], [6,7], [10], [25,29], [51,100]]`, '--- result ---', intersec(inputSet, negativeSet))
