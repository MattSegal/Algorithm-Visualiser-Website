import styles from '../sass/style.sass'
import CONST from './constants'
import Utils from './utils'
import Model from './model'
import Observer from './observer.js'
import Actions from './actions.js'

import selectionGridView from './views/selectionGridView'
import controlPanelView from './views/controlPanelView'
import chartView from './views/chartView'

// When in doubt, redraw everything
const refreshScreen = () => {
  Model.randomArray()
  Observer.emitEvent(Actions.DRAW_SELECTION_GRID)
  Observer.emitEvent(Actions.DRAW_CONTROL_PANEL)
  Observer.emitEvent(Actions.DRAW_BAR_CHART)
}

// Recursive sorting event loop
const sortLoop = (sortMove) => {
  var move = sortMove.next()
  if (move.done) {
    console.log('exit sort mode')
    Model.isSorting = false
    Observer.emitEvent(Actions.SHOW_CONTROL_PANEL)
    Observer.emitEvent(Actions.SHOW_SELECTION_GRID)
    return
  }
  chartView.toggleBarActive(move.value.idx)
  Utils.timer(Model.sortDelay,() => {
    Observer.emitEvent(Actions.DRAW_BAR_CHART)
    Observer.emitEvent(Actions.DRAW_BAR_ACTIVE, move.value.targetIdx)
  }).then(() => Utils.timer(Model.sortDelay, () => {
    Observer.emitEvent(Actions.DRAW_BAR_ACTIVE, move.value.targetIdx)
    this.sortLoop(sortMove)
  }))
}

// Kick off array sorting event loop on user click
Observer.addEvent(Actions.SORT_ARRAY, () => {
  if (Model.isSorting || Model.isSorted()) return
  console.log('enter sort mode')
  Model.isSorting = true
  Observer.emitEvent(Actions.HIDE_CONTROL_PANEL)
  Observer.emitEvent(Actions.HIDE_SELECTION_GRID)
  var sortMove = Model.getSortMethod()
  sortLoop(sortMove)
})

// Update bar height when user clicks the grid
Observer.addEvent(Actions.UPDATE_COLUMN, (rowIdx, colIdx) => {
  const newValue = rowIdx + 1
  Model.array[colIdx] = newValue
  Observer.emitEvent(Actions.DRAW_BAR_CHART)
})

// Update sort method on user radio-button click
Observer.addEvent(Actions.UPDATE_SORT_METHOD, (method) => {
  // FIXME: This fires twice for some reason
  Model.sortMethod = method
})

// Shuffle bar chart on user button click
Observer.addEvent(Actions.SHUFFLE_ARRAY, () => {
  Model.randomArray()
  Observer.emitEvent(Actions.DRAW_BAR_CHART)
})

// Reverse sort bar chart on user button click
Observer.addEvent(Actions.REVERSE_ARRAY, () => {
  Model.reverseArray()
  Observer.emitEvent(Actions.DRAW_BAR_CHART)
})

// Increase number of bars in chart on user click
Observer.addEvent(Actions.INCREMENT_BARS, () => {
  if (Model.arrayLength >= CONST.MAX_BARS) return
  Model.arrayLength += CONST.BARS_INCREMENT
  refreshScreen()
})

// Decrease number of bars in chart on user click
Observer.addEvent(Actions.DECREMENT_BARS, () => {
  if (Model.arrayLength <= CONST.MIN_BARS) return
  Model.arrayLength -= CONST.BARS_INCREMENT
  refreshScreen()
})

// Increase maximum possible bar value on user click
Observer.addEvent(Actions.INCREMENT_MAX_VALUE, () => {
  if (Model.maxValue >= CONST.MAX_VAL) return
  Model.maxValue += CONST.VAL_INCREMENT
  refreshScreen()
})

// Decrease maximum possible bar value on user click
Observer.addEvent(Actions.DECREMENT_MAX_VALUE, () => {
  if (Model.maxValue <= CONST.MIN_VAL) return
  Model.maxValue -= CONST.VAL_INCREMENT
  refreshScreen()
})

// Increase timing delay on user click
Observer.addEvent(Actions.INCREMENT_DELAY, () => {
  if (Model.sortDelay >= CONST.MAX_DELAY) return
  Model.sortDelay+=CONST.DELAY_INCREMENT
  Observer.emitEvent(Actions.DRAW_CONTROL_PANEL)
})

// Decrease timing delay on user click
Observer.addEvent(Actions.DECREMENT_DELAY, () => {
  if (Model.sortDelay <= CONST.MIN_DELAY) return
  Model.sortDelay-=CONST.DELAY_INCREMENT
  Observer.emitEvent(Actions.DRAW_CONTROL_PANEL)
})

// Initialise views
selectionGridView.init()
controlPanelView.init()
chartView.init()
refreshScreen()