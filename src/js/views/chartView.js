import CONST from '../constants'
import Observer from '../observer.js'
import Actions from '../actions.js'
import Model from '../model'

// chartView
module.exports = {
  init: function () {
    this.chartEl =  document.getElementById('chart')
    this.prevI = null // For rendering comparisons
    this.prevJ = null // "   "          "
    this.prev = null // For rendering swaps only
    Observer.addEvent(Actions.DRAW_BAR_CHART, this.renderArray.bind(this))
    Observer.addEvent(Actions.DRAW_BAR_SWAP, this.renderSwap.bind(this))
    Observer.addEvent(Actions.DRAW_BAR_HEIGHT, this.renderHeight.bind(this))
    Observer.addEvent(Actions.DRAW_COMPARE, this.renderCompare.bind(this))
    Observer.addEvent(Actions.DRAW_BAR_SECTION, this.renderSection.bind(this))
  },

  renderArray : function() {
    // Clear existing bars
    var elements = document.getElementsByClassName('bar')
    const numElements = elements.length
    for (let idx = 0; idx < numElements; idx++) {
      // elements shrinks as children are deleted
      this.chartEl.removeChild(elements[0])
    }

    // Render all bars
    const barStyleClass = this._getBarStyle(Model.array.length)
    for (let idx = 0; idx < Model.array.length; idx++) {
      var barHTML = `<div id="${idx}" class="bar ${barStyleClass}"></div>`
      this.chartEl.insertAdjacentHTML('beforeend', barHTML)
      const barEl = document.getElementById(idx)
      barEl.style.height = `${this._getBarHeight(idx)}px`
    }
  },

  renderSection : function(start, length) {
    for (let i = start; i < start + length; i++) {
      this.renderHeight(i)
    }
  },

  renderHeight: function(idx) {
    const bar = document.getElementById(idx)
    bar.style.height = `${this._getBarHeight(idx)}px`
  },

  renderSwap: function(i, j) {
    const barI = document.getElementById(i)
    const barJ = document.getElementById(j)
    const heightI = barI.style.height
    barI.style.height = barJ.style.height
    barJ.style.height = heightI

    // If we are rendering comparisons,
    // then we want to show swap
    if (this.prevI || this.prevJ)
      this.renderCompare(j, i)
    // Otherwise we should just highlight element j 
    else {
      document.getElementById(i).classList.add('i')
      if (this.prev !== null && this.prev !== i)
        document.getElementById(this.prev).classList.remove('i')
      this.prev = i
    }
  },

  renderCompare: function(i, j) {
    const barI = document.getElementById(i)
    const barJ = document.getElementById(j)

    // Update bar 'i'
    if (i !== this.prevI) {
      barI.classList.add('i')
      if (i === this.prevJ) {
        barI.classList.remove('j')
      } 
      if (this.prevI !== null) {
        document.getElementById(this.prevI).classList.remove('i')
      }
    }

    // Update bar 'j'
    if (j !== this.prevJ) {
      barJ.classList.add('j')
      if (j === this.prevI) {
        barJ.classList.remove('i')
      } 
      if (this.prevJ !== null) {
        document.getElementById(this.prevJ).classList.remove('j')
      }
    }

    this.prevI = i
    this.prevJ = j
  },

  _getBarHeight: function(idx) {
    return CONST.CHART_HEIGHT * (Model.array[idx] / Model.maxValue)
  },

  _getBarStyle: function(length) {
    if (length < 30) {
      return 'thin-bar'
    } else if (length >= 60) {
      return 'fatter-bar'
    } else if (length >= 40) {
      return 'fat-bar'
    } else { // 40 > length >= 30
      return 'mid-bar'
    } 
  },

  // unused
  toggleBarActive : function(idx) {
    var activeColor = "rgb(255, 102, 102)"
    var defaultColor = "rgb(119, 119, 119)"
    var el = document.getElementById(idx)
    if (el.style.backgroundColor === activeColor) {
      el.style.backgroundColor = defaultColor
    } else {
      el.style.backgroundColor = activeColor
    } 
  },

  // unused
  toggleBarMoved : function(idx) {
    var activeColor = "rgb(73, 238, 127)"
    var defaultColor = "rgb(119, 119, 119)"
    var el = document.getElementById(idx)
    if (el.style.backgroundColor === activeColor) {
      el.style.backgroundColor = defaultColor
    } else {
      el.style.backgroundColor = activeColor
    } 
  },
}
