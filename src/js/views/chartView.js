import CONST from '../constants'
import Utils from '../utils'
import Observer from '../observer.js'
import Actions from '../actions.js'
import Model from '../model'

// chartView
module.exports = {
  init: function () {
    this.chartEl =  document.getElementsByClassName('chart')[0]
    this.barStyleClass = 'thin-bar'
    Observer.addEvent(Actions.DRAW_BAR_CHART, this.renderArray.bind(this))
  },

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

  renderArray : function() {
    console.log(Model.array)
    // Clear existing bars
    Utils.removeElementsByClass('bar')

    // Set bar style
    if (Model.array.length < 30) {
      this.barStyleClass = 'thin-bar'
    } else if (Model.array.length >= 60) {
      this.barStyleClass = 'fatter-bar'
    } else if (Model.array.length >= 40) {
      this.barStyleClass = 'fat-bar'
    } else if (Model.array.length >= 30) {
      this.barStyleClass = 'mid-bar'
    } 
    // Render bars
    Model.array.forEach((val,idx)=> {
      var barHTML = `<div id="${idx}" class="bar ${this.barStyleClass}"></div>`
      this.chartEl.insertAdjacentHTML('beforeend', barHTML)
      var barEl = document.getElementById(idx)
      barEl.style.height = `${CONST.CHART_HEIGHT * (val / Model.maxValue)}px`
      barEl.style.order = idx
    })
  }
}
