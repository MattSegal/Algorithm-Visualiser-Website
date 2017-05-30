import bubbleSort from './sorters/bubbleSort'
import cocktailSort from './sorters/cocktailSort'
import insertionSort from './sorters/insertionSort'
import mergeSort from './sorters/mergeSort'
import selectionSort from './sorters/selectionSort'

let Model = {
    array : [],
    arrayLength : 30,
    maxValue : 60,
    sortMethod : 'bubbleSort',
    sortDelay : 20, // ms
    isSorting : false,

    randomArray : function() {
      this.array = Array(this.arrayLength).fill(0)
        .map(() => Math.ceil(this.maxValue * Math.random()))
      console.log(this.array)
    },

    updateArray: function(array) {
      this.array = array
    },

    reverseArray: function() {
      this.array = this.array
        .sort((a,b) => a - b)
        .reverse()
    },

    getSortMethod : function() {
      switch (this.sortMethod) {
        case 'bubbleSort':
          return bubbleSort(this.updateArray.bind(this))(this.array)
          break
        case 'insertionSort':
          return insertionSort(this.array)
          break
        case 'selectionSort':
          return selectionSort(this.array)
          break
        case 'cocktailSort':
          return cocktailSort(this.array)
          break
        case 'mergeSort':
          return mergeSort(this.array)
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

// other sort possibilities
// quicksort!
// shell sort
// stooge sort


// function testSort(sortGen,arr) {
//     Model.array = arr
//     console.log('TEST SORT')
//     var array = arr.slice() // lame!
//     var sortMove = sortGen(arr.slice())
//     var move = sortMove.next()
//     var temp, i, j
//     while (!move.done) {
//         console.log('ITER')
//         i = move.value.idx
//         j = move.value.targetIdx
//         temp = array[i]
//         array[i] = array[j]
//         array[j] = temp
//         console.log(Model.array)
//         move = sortMove.next()
//     }
//     console.log('END TEST')
//     // console.log(array)
//     console.log(Model.array)

// }







