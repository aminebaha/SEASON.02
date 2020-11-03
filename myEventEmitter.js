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
        
    }
    emit(eventName,...data) {
       
        if(data===undefined) {
            return undefined
        }
        else {

        
       this.empty[eventName].forEach(element => {
           
        element(data)
       });
    }

    }
}

module.exports = myEventEmitter