const mergeSort = (arr) => (update, compare) => {
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

    let ASorted = mergeSort(A)(update, compare)
    let BSorted = mergeSort(B)(update, compare)
    return merge(ASorted, BSorted)(update, compare)
}

const merge = (A, B) => (update, compare) =>  {
    let C   = Array(A.length + B.length)
    C.start = A.start
    C.end   = B.end

    let idxA = 0
    let idxB = 0

    for (let idxC = 0; idxC < C.length; idxC++) {
        if (idxA === A.length) {
            // We've exhausted A, use the rest of B
            C[idxC] = B[idxB]
            idxB++
            compare(getStartA(C, idxA), getStartB(C, A, idxB))
        } else if (idxB === B.length) {
            // We've exhausted B, use the rest of A
            C[idxC] = A[idxA]
            idxA++
            compare(getStartA(C, idxA), getStartB(C, A, idxB))
        } else if (A[idxA] < B[idxB]) {
            // A is smaller, select A
            C[idxC] = A[idxA]
            idxA++
            compare(getStartA(C, idxA), getStartB(C, A, idxB))
        } else {
            // B is smaller, select B
            C[idxC] = B[idxB]
            idxB++
            compare(getStartA(C, idxA), getStartB(C, A, idxB))
            update(buildSection(A, B, C, idxA, idxB, idxC), C.start)
        }
    }
    return C
}

const buildSection = (A, B, C, idxA, idxB, idxC) =>  
    C.slice(0, idxC + 1)
    .concat(A.slice(idxA))
    .concat(B.slice(idxB))

const getStartA = (C, idxA) =>
    C.start + idxA

const getStartB = (C, A, idxB) =>
    C.start + A.length - 1 + idxB

module.exports = mergeSort
