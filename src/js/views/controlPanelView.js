import Observer from '../observer.js'
import Actions from '../actions.js'
import Model from '../model'

//controlPanelView
module.exports = {

  init: function() {
    // cache the DOM
    this.controlPanel = document.getElementById('control-panel')
    this.headerTag = document.getElementsByTagName('header')[0] 
    this.sortRadios =  document.getElementsByName('sort-method')
    this.barNumberDisplay = document.getElementById('bar-num')
    this.valueNumberDisplay = document.getElementById('value-num') 
    this.speedNumberDisplay = document.getElementById('speed-num') 

    // bind events
    const getEl = id => document.getElementById(id)
    getEl('sortBtn').addEventListener('click', () => Observer.emitEvent(Actions.SORT_ARRAY))
    getEl('randomBtn').addEventListener('click', () => Observer.emitEvent(Actions.SHUFFLE_ARRAY))
    getEl('reverseBtn').addEventListener('click', () => Observer.emitEvent(Actions.REVERSE_ARRAY))
    var sortRadioDiv = document.getElementsByClassName('sort-method-options')[0]
    sortRadioDiv.addEventListener('click', () => 
      Observer.emitEvent(Actions.UPDATE_SORT_METHOD, this.getSortMethod())
    )
    getEl('more-bars').addEventListener('click', () => Observer.emitEvent(Actions.INCREMENT_BARS))
    getEl('less-bars').addEventListener('click', () => Observer.emitEvent(Actions.DECREMENT_BARS))
    getEl('more-value').addEventListener('click', () => Observer.emitEvent(Actions.INCREMENT_MAX_VALUE))
    getEl('less-value').addEventListener('click', () => Observer.emitEvent(Actions.DECREMENT_MAX_VALUE))
    getEl('more-speed').addEventListener('click', () => Observer.emitEvent(Actions.INCREMENT_DELAY))
    getEl('less-speed').addEventListener('click', () => Observer.emitEvent(Actions.DECREMENT_DELAY))

    // register events
    Observer.addEvent(Actions.HIDE_CONTROL_PANEL, this.hideButtons.bind(this))
    Observer.addEvent(Actions.SHOW_CONTROL_PANEL, this.showButtons.bind(this))
    Observer.addEvent(Actions.DRAW_CONTROL_PANEL, this.render.bind(this))
  },

  hideButtons: function() {
    this.controlPanel.style.display = 'none'
    this.headerTag.style.opacity = 0
  },

  showButtons: function() {
    this.controlPanel.style.display = 'flex'
    this.headerTag.style.opacity = 1
  },

  render: function() {
    this.barNumberDisplay.innerHTML = Model.arrayLength
    this.valueNumberDisplay.innerHTML = Model.maxValue
    this.speedNumberDisplay.innerHTML = Model.sortDelay
  },

  getSortMethod: function() {
    for (var i = 0; i < this.sortRadios.length; i++) {
      if (this.sortRadios[i].checked) {
        return this.sortRadios[i].value
      }
    }
  }
}