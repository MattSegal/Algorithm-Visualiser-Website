const cocktailSort = (array) => (compare, swap) => {
  const end = array.length - 1
  let swapped = true
  let idx, temp
  while (swapped) {
    swapped = false
    
    // Scan from start to end
    for (idx = 0; idx < end; idx++) {
      compare(idx, idx + 1)
      if (array[idx] > array[idx+1]) {
        temp = array[idx]
        array[idx] = array[idx+1] 
        array[idx+1] = temp
        swapped = true
        swap(idx, idx + 1)
      }
    }

    // If no swaps were done, then the array is sorted
    if (!swapped) break
    
    // Otherwise, scan from end back to start
    for (idx = end; idx > 0; idx--) {
      compare(idx, idx - 1)
      if (array[idx] < array[idx - 1]) {
        temp = array[idx]
        array[idx] = array[idx - 1] 
        array[idx - 1] = temp
        swap(idx, idx - 1)
      }
    }
  }
}

module.exports = cocktailSort