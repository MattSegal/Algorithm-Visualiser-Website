import 'babel-polyfill'

function* insertionSort(array) {
    var i,j
    var temp
    for (j = 0;j<array.length;j++) {
        key = array[j]
        i = j - 1
        while( i >= 0 && array[i] > key) {
            temp = array[i+1]
            array[i+1] = array[i]
            array[i] = temp
            // update Model + Controller
            Model.array = array
            yield {idx : i+1 ,targetIdx : i}
            i--
        } 
    }
}

module.exports = insertionSort