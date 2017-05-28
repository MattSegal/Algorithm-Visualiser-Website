import 'babel-polyfill'

function* cocktailSort(array) {
    var swapped = true // init for while
    var idx,swap
    var end = array.length-1
    // debug
    var oldArr
    while (swapped) {
        swapped = false
        for (idx=0;idx<end;idx++) { // start to end
            if (array[idx] > array[idx+1]) { // out of order
                swap = array[idx]
                array[idx] = array[idx+1] 
                array[idx+1] = swap
                swapped = true
                // update Model + Controller
                Model.array = array
                yield {idx : idx ,targetIdx : idx+1}
            }
        }
        if (!swapped) break // if no swaps then sorted
        for (idx=end;idx>=0;idx--) { // end to start
            if (array[idx] > array[idx+1]) { // out of order
                swap = array[idx]
                array[idx] = array[idx+1] 
                array[idx+1] = swap
                swapped = true
                // update Model + Controller
                Model.array = array
                yield {idx : idx+1,targetIdx : idx}
            }
        }
    }
    return array
}

module.exports = cocktailSort