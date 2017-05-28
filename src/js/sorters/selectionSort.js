import 'babel-polyfill'

function* selectionSort(array) {
    var len = array.length
    var swap
    for (var i = 0;i<len;i++) {
        // find the smallest element of array
        idx = i // index of smallest element
        smallestEl = array[i]
        for(var j=i;j<len;j++) {
            if (array[j] < smallestEl) {
                // if some number further along is smaller
                smallestEl = array[j]
                idx = j
                yield {idx : i ,targetIdx : idx}
            }
        }
        // swap element at i with smallest element found
        swap = array[i]
        array[i] = smallestEl
        array[idx] = swap
        // update Model + Controller
        Model.array = array
        yield {idx : i ,targetIdx : idx}
    }
}

module.exports = selectionSort