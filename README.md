# Algorithm Visualizer

[View Live Website Here](https://mattsegal.github.io/sort)

### Overview

This is a single page app that displays an unsorted bar chart. The user can select and run a sorting algorithm on the chart. I decided to write this app without jQuery to see what it would be like. It wasn't as hard as I thought it would be. 

I used ES6 generators to write a recursive merge sort implementation. This will run on the latest version of Chrome, but not on some other browsers.
  
### Possible Features

* Add more interesting sorting algorithms (QuickSort, ShellSort, StoogeSort)
* Change UI updates from doing a full DOM rewrite every frame to using diffing to only update the nodes that need to change.

### Development

* markup is jade in dev/jade
* styling is sass in dev/sass
* code is vanilla js in static/js

### Build

* `npm install gulp -g`
* `npm install`
* `gulp`
* open static/index.html