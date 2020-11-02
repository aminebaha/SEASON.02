const EventEmitter = require('events')
const myEmitter = new EventEmitter();

//const myEmitter = new EventEmitter();
        const fs = require('fs')

module.exports = {
    
    myEmitter,

    empty:  ()=> {

        myEmitter.emit('foo')

    },

    withArgs:   (array)=> {
       
        for(let i=0;i<array.length;i++) {
         
           
            myEmitter.emit('newFellow')
        }

    }

}