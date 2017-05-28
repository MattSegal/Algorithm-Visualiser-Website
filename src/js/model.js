import bubbleSort from './sorters/bubbleSort'
import cocktailSort from './sorters/cocktailSort'
import insertionSort from './sorters/insertionSort'
import mergeSort from './sorters/mergeSort'
import selectionSort from './sorters/selectionSort'

let Model = {
    // array data
    array : [],
    // array meta info
    arrayLength : 30, // set bar margin to less if you do more than 30 or so
    maxValue : 30,
    // sort data
    sortMethod : '',
    sortDelay : 20, // ms
    // app state 
    isSorting : false,
    randomArray : function() {
      this.array = Array(this.arrayLength).fill(0)
        .map(() => Math.ceil(this.maxValue * Math.random()))
    },
    updateArray: function(array) {
      this.array = array
    },
    reverseArray: function() {
      this.randomArray
      this.array = this.array.sort().reverse()
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
      const len = this.array.length
      for (var idx = 0; idx < len; idx++) {
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







