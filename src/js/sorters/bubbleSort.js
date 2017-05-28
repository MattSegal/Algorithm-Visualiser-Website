import 'babel-polyfill'

const bubbleSort = (updateModel) => function*(array) {
  var len = array.length
  var temp
  for (var end = len-1; end>0; end--) {
    for (var idx = 0; idx < end; idx++) {
      if (array[idx] > array[idx + 1]) {
        // Swap
        temp = array[idx]
        array[idx] = array[idx+1]
        array[idx+1] = temp
        // update array
        updateModel(array)
        // yield swap
        yield {idx : idx ,targetIdx : idx+1}
      }
    }
  }
}

module.exports = bubbleSort