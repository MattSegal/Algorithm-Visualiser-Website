import 'babel-polyfill'

function* mergeSortGen(array) {
    var split, firstArr, secondArr, 
        firstSorted, secondSorted, mergedArr
    var len = array.length
    if (len <= 1) return array
    // set range
    array.start = array.start || 0
    array.end = array.end || len
    // split arrays
    split = (len%2 === 0) ? len/2 : (len+1)/2

    firstArr        = array.slice(0,split)
    firstArr.start  = array.start
    firstArr.end    = array.start + split

    secondArr       = array.slice(split)
    secondArr.start = array.start + split
    secondArr.end   = array.end
    
    // divide
    firstSorted = yield* mergeSortGen(firstArr)
    secondSorted = yield* mergeSortGen(secondArr)
    // merge
    mergedArr = yield* mergeGen(firstSorted,secondSorted)
    return mergedArr
}

function* mergeGen(A,B) {
    // swap so A comes before B
    if (A.start > B.start) { var swap=B; B=A; A=swap } 
    var lenA = A.length
    var lenB = B.length
    var lenC = lenA + lenB
    var idxA = 0
    var idxB = 0
    var C = []
    C.start = A.start
    C.end = B.end
    for (var idxC=0;idxC<lenC;idxC++) {
        if (idxA === lenA) {
            C[idxC] = B[idxB]
            idxB++
            mergeGenModelUpdate(A,B,C,idxA,idxB)
            yield {idx : B.start,targetIdx : C.start+idxC}
            B.start++
            A.start++
        } else if (idxB === lenB) {
            C[idxC] = A[idxA]
            idxA++
            mergeGenModelUpdate(A,B,C,idxA,idxB)
            yield {idx : A.start,targetIdx : C.start+idxC}
            A.start++
        } else if (A[idxA] < B[idxB]) {
            C[idxC] = A[idxA]
            idxA++
            mergeGenModelUpdate(A,B,C,idxA,idxB)
            yield {idx : A.start,targetIdx : C.start+idxC}
            A.start++
        } else {
            C[idxC] = B[idxB]
            idxB++
            mergeGenModelUpdate(A,B,C,idxA,idxB)
            yield {idx : B.start,targetIdx : C.start+idxC}
            B.start++
            A.start++
        }
    }
    return C
}

function mergeGenModelUpdate(A,B,C,idxA,idxB) {
    Model.array = Model.array.slice(0,C.start)
        .concat(C)
        .concat(A.slice(idxA))
        .concat(B.slice(idxB))
        .concat(Model.array.slice(C.end))
}


function mergeSort(array) { // this gets used don't delete
    var len = array.length
    if (len <= 1) return array
    var split = (len%2 === 0) ? len/2 : (len+1)/2
    var sortedStart = mergeSort(array.slice(0,split)) 
    var sortedEnd = mergeSort(array.slice(split))
    return merge(sortedStart,sortedEnd)
}

function merge(A,B) {
    var lenA = A.length
    var lenB = B.length
    var lenC = lenA + lenB
    var C = []
    var idxA = 0
    var idxB = 0
    for (var idxC=0;idxC<lenC;idxC++) {
        if (idxA === lenA) {
            C[idxC] = B[idxB]
            idxB++
        } else if (idxB === lenB) {
            C[idxC] = A[idxA]
            idxA++
        } else if (A[idxA] < B[idxB]) {
            C[idxC] = A[idxA]
            idxA++
        } else {
            C[idxC] = B[idxB]
            idxB++
        }
    }
    return C
}

module.exports = mergeSortGen