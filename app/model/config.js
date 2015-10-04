import fs from 'fs'

export default class Config {
  constructor (path) {
    this.path = path
  }
  
  update (key, value) {
    this.load()
    this.env[key] = value
    fs.writeFile(this.path, JSON.stringify(this.cache, null, '\t'))
  }
  
  load () {
    // TODO: check if it works and/or find better way to handle it
    return _read_file() ? _read_file() : _get_default()
  }
  
  _read_file () {
    return JSON.parse(fs.readFileSync(this.path, {encoding: 'utf8'}))
  }
  
  //just like {general: [{title: '', star:'', read:''} ]....}
  _get_default () {
    return {
      hatebu: []
    }
  }
  
}