import Observer from '../observer.js'
import Actions from '../actions.js'
import Model from '../model'

module.exports = {

  init: function() {
    this.gridElelement = document.getElementsByClassName('chart-grid')[0]
    Observer.addEvent(Actions.HIDE_SELECTION_GRID, this.hide.bind(this))
    Observer.addEvent(Actions.SHOW_SELECTION_GRID, this.show.bind(this))
    Observer.addEvent(Actions.DRAW_SELECTION_GRID, this.render.bind(this))
  },

  hide: function() {
    this.gridElelement.style.display = 'none'
  },
  
  show: function() {
    this.gridElelement.style.display = 'flex'
  },
  
  render: function() {
    this._clear()
    var colEl
    for (var col = 0; col < Model.arrayLength; col++) {
      colEl = this._renderColumn(col)
      for (var row = 0; row < Model.maxValue; row++) { 
        this._renderRow(colEl,row,col)
      }
    }
  },
  
  _clear: function() {
    var elList = this.gridElelement.children
    var len = elList.length
    for(var idx = len-1; idx>=0; idx--) {
      this.gridElelement.removeChild(elList[idx])
    }
  },
  
  _renderColumn: function(col) {
    var columnHTML = '<div id="col'+col+'" class="col"></div>'
    this.gridElelement.insertAdjacentHTML('beforeend',columnHTML)
    return document.getElementById('col'+col)
  },
  
  _renderRow: function(parentColumn, row, col) {
    const rowHTML = `<div id="${row}-${col}" class="row"></div>`
    parentColumn.insertAdjacentHTML('beforeend', rowHTML)
    document
      .getElementById(`${row}-${col}`)
      .addEventListener('click', () => 
        Observer.emitEvent(Actions.UPDATE_COLUMN, [row,col])
      )
  },

}
