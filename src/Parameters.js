//import {boolean, int8Array} from "@sindresorhus/is";
let logingData = true
class Parameters {
  //
  // handles setting, saving and retrival of calibration settings
  // singleton class
  //
  constructor (key) {
    if(!Parameters.instance){
      this.setupCookie(key)
      this.setupDataLoger()
      Parameters.instance = this;
    }
    this.checkNoActive() // run once to count active channels
    return Parameters.instance;
  }

  ////////////
  // data handling
  ////////////
  setupCookie(key){
    this.cookieID = key
    this.noChannels = 8
    this.sensorLocations = [/*bat*/{"x": 0, "y": 0}, /*ref*/{"x": 0, "y": 0},/*Ch 6*/{"x": 0.3, "y": 0.8}, /*Ch 5*/{"x": 0.5, "y": 0.8}, /*Ch 4*/{"x": 0.5, "y": 0.33}, /*Ch 3*/{"x": 0.5, "y": 0.55}, /*Ch 2*/{"x": 0.7, "y": 0.8}, /*Ch 1*/{"x": 0.9, "y": 0.8}]; // todo: make these configurable in front end
    this.activeChanels = [] // array of indexes for retrieving active chanels only
    this.activeSensorLocations = [] //
    this.chanelNames = ['Battery', 'Reference', 'Ch 6', 'Ch 5', 'Ch  4', 'Ch 3', 'Ch 2', 'Ch 1']
    this.params = {}
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
    // hard code default chanel configuration
    this.params[Object.keys(this.params)[0]].active = false // Battery
    this.params[Object.keys(this.params)[1]].active = false // Reference
    this.params[Object.keys(this.params)[7]].active = false // Ch 1

    let cookieData = this.getCookie(this.cookieID)
    if (cookieData !== '' && cookieData !== 'undefined') {
      let obj = JSON.parse(cookieData)
      console.log('old cookie')
      console.log(obj)
      Object.assign(this.params, obj)
    } else {
      console.log('no cookie')
    }
  }

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
  // localStorage

  setupDataLoger() {
    this.getSessionKeys()
  }

  newLogSession(view) {
    if (logingData) {
      let n = Date.now()
      let key = this.cookieID
      let Storage = window.localStorage
      this.thisSession = {'start': n, 'viewNumber': view, 'log': [], 'time': []}
      // create a list of all previous sessions
      if (this.sessionKeys !== null && this.sessionKeys !== '' && this.sessionKeys !== 'undefined') {
        this.sessionKeys.push(this.thisSession.start)
      } else {
        this.sessionKeys = [1]
        this.sessionKeys[0] = this.thisSession.start
      }
      Storage.setItem(key, JSON.stringify(this.sessionKeys))
      //
      console.log("local storage" + this.sessionKeys)
    }
  }

  logdata(sensorValues) {
    if (logingData) {
      let millis = Date.now() - this.thisSession.start
      let data = Array.from(sensorValues)
      this.thisSession.log.push(data)
      /*
      for (let i = 0; i < this.sensorValues.length; i++) {
        this.thisSession.log[i].push(data)
      }
       */
      this.thisSession.time.push(millis)
    }
  }

  getSessionKeys() {
    let key = this.cookieID
    let Storage = window.localStorage
    this.sessionKeys = JSON.parse(Storage.getItem(key))
  }
  saveLocal() {
    let Storage = window.localStorage;
    Storage.setItem(this.thisSession.start, JSON.stringify(this.thisSession))
  }

  loadLocal() {
    let Storage = window.localStorage;
    this.getSessionKeys()
      let data = []
      for (let i = 0; i < this.sessionKeys.length; i++) {
        data.push(JSON.parse(Storage.getItem(this.sessionKeys[i])))
      }
   return data
  }

//////
// General Utilities
/////
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
    if ( this.sensorValues != null) {
      let checkThreshold = false
      let normalisedValues = this.getNormalisedValues()
      for (let i = 0; i < this.sensorValues.length; i++) {
        // console.log(this.getNormalisedValues(i))
        if (normalisedValues[i] >= 0.4) {
         checkThreshold = true
        }
      }
      if (checkThreshold) {
        // log data if threshold reached
        this.logdata(normalisedValues)
      }
    }
  }

  getSensorValues(i) {
    return this.sensorValues[i];
  }

  getNormalisedValues() {
    let normaliseValues = []
    for (let i = 0; i < this.sensorValues.length; i++) {
      normaliseValues[i] = this.getNormalisedValue(i)
    }
    return normaliseValues;
  }

  getNormalisedValuesByte() {
    // TODO: for storing log in bytes
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

////////////
// methods for active chanels
///////////
  getNormalisedActiveValues() {
    let normaliseValues = []
    for (let i = 0; i < this.noActive; i++) {
      normaliseValues[i] = this.getNormalisedValue(this.activeChanels[i])
    }
    return normaliseValues;
  }

  getNormalisedActive(i) {
    return this.getNormalisedValue(this.activeChanels[i])
  }


  getIsActive (i) {
// get if the chanel is active
    return this.params[Object.keys(this.params)[i]].active
  }

  getActive (i) {
// get active chanel
    return this.sensorValues[this.activeChanels[i]];
  }



  getActiveAtThreshold (i) {
    if (this.sensorValues[this.activeChanels[i]]> this.getThreshold(this.activeChanels[i])) {
      return true
    } else {
      return false
    }
  }

  checkNoActive() {
    this.noActive = 0;
    this.activeChanels = []
    for (let i = 0; i < this.noChannels; ++i) {
      let active = this.getIsActive(i)
      if (active) {
        this.activeChanels[this.noActive] = i
        this.activeSensorLocations[this.noActive] = i
        this.noActive++
      }
    }
    return this.noActive
  }

  getActiveSensorLocations() {
    this.checkNoActive()
    let noActive = 0;
    for (let i = 0; i < this.noChannels; ++i) {
      let active = this.getIsActive(i)
      if (active) {
        this.activeSensorLocations[noActive] = this.sensorLocations[i]
        noActive++
      }
    }
    return this.activeSensorLocations
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
const instance = new Parameters(6);
export default instance
