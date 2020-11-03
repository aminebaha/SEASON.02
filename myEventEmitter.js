const EventEmitter = require('events');
const myEmitter = new EventEmitter();

class myEventEmitter {
    constructor(){
         
         this.empty = {}
       
    }
    on(eventName, fn) {
        if(!this.empty[eventName]) {
            this.empty[eventName] = []
        }
        this.empty[eventName].push(fn)
        console.log(this.empty[eventName])
    }
    emit(eventName,data) {
        console.log(this.empty)
       

    }
}

module.exports = myEventEmitter