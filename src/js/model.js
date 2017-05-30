import bubbleSort from './sorters/bubbleSort'
import cocktailSort from './sorters/cocktailSort'
import insertionSort from './sorters/insertionSort'
import mergeSort from './sorters/mergeSort'
import selectionSort from './sorters/selectionSort'
// other sort possibilities
// quicksort!
// shell sort
// stooge sort

// This is weird
let Model = {
    array : [],
    arrayLength : 30,
    maxValue : 60,
    sortMethod : 'bubbleSort',
    sortDelay : 20, // ms
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

    getSorter : function() {
      // pass in array by value
      switch (this.sortMethod) {
        case 'bubbleSort':
          return bubbleSort(this.array.slice())
          break
        case 'insertionSort':
          return insertionSort(this.array.slice())
          break
        case 'selectionSort':
          return selectionSort(this.array.slice())
          break
        case 'cocktailSort':
          return cocktailSort(this.array.slice())
          break
        case 'mergeSort':
          return mergeSort(this.array.slice())
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

module.exports = Model
