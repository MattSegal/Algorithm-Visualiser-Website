const insertionSort = (array) => (compare, swap) => {
    // Don't render compares - too weird to visualise
    let i, j, temp, key
    for (j = 1; j < array.length; j++) {
        key = array[j]
        i = j - 1
        while( i >= 0 && array[i] > key) {
            compare(i + 1, i)
            temp = array[i + 1]
            array[i + 1] = array[i]
            array[i] = temp
            swap(i + 1, i)
            i--
        } 
    }
}

module.exports = insertionSort