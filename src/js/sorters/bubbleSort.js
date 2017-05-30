const bubbleSort = (array) => (compare, swap) => {
  let temp
  for (let end = array.length - 1; end > 0; end--) {
    for (let idx = 0; idx < end; idx++) {
      compare(idx, idx + 1)
      if (array[idx] > array[idx + 1]) {
        swap(idx, idx + 1)
        temp = array[idx]
        array[idx] = array[idx+1]
        array[idx+1] = temp
      }
    }
  }
}

module.exports = bubbleSort