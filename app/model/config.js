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
    return read_file() ? read_file() : get_default()
  }
  
  private read_file () {
    return JSON.parse(fs.readFileSync(this.path, {encoding: 'utf8'}))
  }
  
  //just like {general: [{title: '', star:'', read:''} ]....}
  private get_default () {
    return {
      general: []
    }
  }
  
}