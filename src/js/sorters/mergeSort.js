const mergeSort = (arr) => (compare, update) => {
    if (arr.length <= 1) 
        return arr

    // Initialise absolute index tracking
    arr.start = arr.start || 0
    arr.end   = arr.end || arr.length

    // Split array roughly in half
    let splitIdx = arr.length % 2 === 0
        ? arr.length / 2
        : (arr.length + 1) / 2
    
    let A   = arr.slice(0, splitIdx)
    A.start = arr.start
    A.end   = arr.start + splitIdx

    let B   = arr.slice(splitIdx)
    B.start = arr.start + splitIdx
    B.end   = arr.end

    let ASorted = mergeSort(A)(compare, update)
    let BSorted = mergeSort(B)(compare, update)
    return merge(ASorted, BSorted)(compare, update)
}

const merge = (A, B) => (compare, update) =>  {
    let C   = Array(A.length + B.length)
    C.start = A.start
    C.end   = B.end

    let idxA = 0
    let idxB = 0

    for (let idxC = 0; idxC < C.length; idxC++) {
        compare(C.start + idxC,  C.start + A.length - 1 + idxB)
        if (idxA === A.length) {
            // We've exhausted A, use the rest of B
            C[idxC] = B[idxB]
            idxB++
        } else if (idxB === B.length) {
            // We've exhausted B, use the rest of A
            C[idxC] = A[idxA]
            idxA++
        } else if (A[idxA] < B[idxB]) {
            // A is smaller, select A
            C[idxC] = A[idxA]
            idxA++
        } else {
            // B is smaller, select B
            C[idxC] = B[idxB]
            idxB++
            update(buildSection(A, B, C, idxA, idxB, idxC), C.start)
        }
    }
    return C
}

const buildSection = (A, B, C, idxA, idxB, idxC) =>  
    C.slice(0, idxC + 1)
    .concat(A.slice(idxA))
    .concat(B.slice(idxB))

module.exports = mergeSort
