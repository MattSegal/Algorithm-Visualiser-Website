const insertionSort = (array) => (compare, swap) => {
    let i, j, temp, key
    for (j = 1; j < array.length; j++) {
        key = array[j]
        i = j - 1
        while( i >= 0 && array[i] > key) {
            compare(i, j)
            temp = array[i + 1]
            array[i + 1] = array[i]
            array[i] = temp
            swap(i, i + 1)
            i--
        } 
    }
}

module.exports = insertionSort