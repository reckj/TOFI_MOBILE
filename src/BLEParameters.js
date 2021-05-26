//import {boolean, int8Array} from "@sindresorhus/is";

class BLEParameters {
  //
  // handles setting, saving and retrival of calibration settings
  // singleton class
  //
  constructor (id) {
    if(!BLEParameters.instance){
      this.cookieID = id
      // construct calibration object
      this.noChannels = 8
      this.activeChanels = [] // array of indexes for retrieving active chanels only
      this.chanelNames = ['Battery', 'Reference', 'Ch 6', 'Ch 5', 'Ch 4', 'Ch 3', 'Ch 2', 'Ch 1']
      this.params = {
      }
      for (let i = 0; i < this.noChannels; ++i) {
        this.params[this.chanelNames[i]] = {
          'active': true,
          'filter': 0.1,
          'min': 30700,
          'max': 32000,
          'threshold': 31000,
          'x': 0.0,
          'y': 0.0
        }
      }
      let cookieData = this.getCookie(this.cookieID)
      if (cookieData !== '' && cookieData !== 'undefined') {
        console.log('last cookie:')
        console.log(cookieData)
        let obj = JSON.parse(cookieData)
        console.log('old cookie')
        console.log(obj)
        Object.assign(this.params, obj)
        // this.chanelOptions = obj
      } else {
        console.log('no cookie')
      }
        BLEParameters.instance = this;
      }
    this.checkNoActive() // run once to count active channels
  }

  getFilters () {
    let filters = []
    for (let i = 0; i < this.noChannels; i++) {
      filters[i] = this.params[Object.keys(this.params)[i]].filter
    }
    return filters
  }
  getThreshold (i) {
    return this.params[Object.keys(this.params)[i]].threshold
  }
  atThreshold (i) {
    if (this.sensorValues[i] > this.getThreshold(i)) {
      return true
    } else {
      return false
    }
  }
  getMin (i) {
    return this.params[Object.keys(this.params)[i]].min
  }
  getMax (i) {
    return this.params[Object.keys(this.params)[i]].max
  }


  setSensorValues(sensorValues) {
    this.sensorValues = sensorValues;
  }
  getSensorValues(i) {
    return this.sensorValues[i];
  }
  getNormalisedValues() {
    let normaliseValues = []
    this.noActive = 0;
    for (let i = 0; i < this.sensorValues.length; i++) {
      let active = this.getIsActive(i)
      if (active) {
        this.noActive++;
      }
      normaliseValues[i] = this.getNormalisedValue(i)
    }
    return normaliseValues;
  }

  getNormalisedValue(i) {
    let normaliseValue
    let active = this.getIsActive(i)
    let min = this.getMin(i)
    let max = this.getMax(i)
    if (active) {
      normaliseValue =  this.constrain(this.sensorValues[i], min, max)
      normaliseValue = this.map(normaliseValue, min, max, 0.0, 1.0)
    } else {
      normaliseValue = 0;
    }
  return normaliseValue
  }
  map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
  constrain(num, min, max){
    return Math.min(Math.max(num, min), max)
  }
  //
  // data handling
  //

  save() {
    this.checkNoActive()
    // creat Json object and set cookie
    console.log('object to json cookie set')
    let myJSON = JSON.stringify(this.params)
    this.setCookie(myJSON, 2000)
  }
  // https://www.w3schools.com/js/js_cookies.asp
  setCookie (cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = this.cookieID + '=' + cvalue + ';' + expires + ';path=/'
    // console.log(this.getCookie(this.cookieID))
  }

  getCookie (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  ////////////
  // methods for active chanels
  ///////////
  getNormalisedActive() {
    let normaliseValues = [{"value": 0, "threshold": false}]
    this.noActive = 0;
    for (let i = 0; i < this.sensorValues.length; i++) {
      let active = this.getIsActive(i)
      if (active) {
        normaliseValues[this.noActive] = {"value": this.getNormalisedValue(i), "threshold": this.atThreshold(i)}
        this.noActive++;
      }
    }
    return normaliseValues;
  }

  getIsActive (i) {
    // get if the chanel is active
    return this.params[Object.keys(this.params)[i]].active
  }

  getActive (i) {
    // get active chanel
    return this.sensorValues[this.activeChanels[i]];
  }

  checkNoActive() {
    this.noActive = 0;
    this.activeChanels = []
    for (let i = 0; i < this.noChannels; ++i) {
      let active = this.getIsActive(i)
      if (active) {
        this.activeChanels[ this.noActive] = i
        this.noActive++
      }
    }
    return this.noActive
  }

  getNoActive() {
    return this.noActive
  }

  setMin(i, value) {
    let index = this.activeChanels[i]
    this.params[Object.keys(this.params)[index]].min = value
  }
  setMax(i, value) {
    let index = this.activeChanels[i]
    this.params[Object.keys(this.params)[index]].max = value
  }

}

const instance = new BLEParameters(6);
export default instance
