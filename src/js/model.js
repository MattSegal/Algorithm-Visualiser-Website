import bubbleSort from './sorters/bubbleSort'
import cocktailSort from './sorters/cocktailSort'
import insertionSort from './sorters/insertionSort'
import mergeSort from './sorters/mergeSort'
import CONST from './constants'
// other sort possibilities
// selection sort
// quicksort!
// shell sort
// stooge sort

module.exports = {
    array : [],
    arrayLength : CONST.INITIAL_BARS,
    maxValue : CONST.INITIAL_VAL,
    sortDelay : CONST.INITIAL_DELAY,
    sortMethod : 'mergeSort',
    isSorting : false,

    swap: function(i, j) {
      const temp = this.array[j]
      this.array[j] = this.array[i]
      this.array[i] = temp
    },

    randomArray : function() {
      this.array = Array(this.arrayLength).fill(0)
        .map(() => Math.ceil(this.maxValue * Math.random()))
    },

    updateArray: function(array) {
      this.array = array
    },

    reverseArray: function() {
      this.array = this.array
        .sort((a,b) => a - b)
        .reverse()
    },

    runSort : function(swap, compare, update) {
      // pass in array by value
      const arrayCopy = this.array.slice()
      switch (this.sortMethod) {
        case 'bubbleSort':
          bubbleSort(arrayCopy)(swap, compare)
          break
        case 'insertionSort':
          insertionSort(arrayCopy)(swap, compare)
          break
        case 'cocktailSort':
          cocktailSort(arrayCopy)(swap, compare)
          break
        case 'mergeSort':
          mergeSort(arrayCopy)(update, compare)
          break
      }
    },

    isSorted : function() {
      for (var idx = 0; idx < this.array.length; idx++) {
        if (this.array[idx] > this.array[idx+1]) {
          return false
        }
      }
      return true
    }
}
