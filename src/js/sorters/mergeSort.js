// TODO - keep track on indexes so we can call
// compare and swap using absolute values
const mergeSort = (array, start, end) => (compare, swap) => {
    const len = array.length
    if (len <= 1) return array
    start = typeof(start) === 'undefined' ? 0 : start
    end = typeof(end) === 'undefined' ? len : end

    let split = (len % 2 === 0) ? len/2 : (len + 1) / 2
    let sortedStart = mergeSort(
        array.slice(0, split),
        start,
        split - 1,
    )(compare, swap)
    
    let sortedEnd = mergeSort(
        array.slice(split),
        split,
        end,
    )(compare, swap)
    
    return merge(sortedStart, sortedEnd, start)(compare, swap)
}

const merge = (A,B, start) => (compare, swap) =>  {
    let lenC = A.length + B.length
    let C = []
    let idxA = 0
    let idxB = 0
    for (let idxC = 0; idxC < lenC; idxC++) {
        if (idxA === A.length) {
            C[idxC] = B[idxB]
            swap(start + idxC, start + A.length + idxB)
            idxB++
        } else if (idxB === B.length) {
            C[idxC] = A[idxA]
            swap(start + idxC, start + idxA)
            idxA++
        } else if (A[idxA] < B[idxB]) {
            C[idxC] = A[idxA]
            swap(start + idxC, start + idxA)
            idxA++
        } else {
            C[idxC] = B[idxB]
            swap(start + idxC, start + A.length + idxB)
            idxB++
        }
    }
    return C
}

module.exports = mergeSort