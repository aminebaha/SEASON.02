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

    },
     empty2: () =>{
        const emitter = new EventEmitter()
      
        emitter.on('hi', () => {
          console.log('Ch0ooooooper!')
        })
      
        emitter.emit('hi')
      },
      
      withArgs:(names) =>{
        const emitter = new EventEmitter()
        
        emitter.on('newFellow', (name) => {
          console.log(`Here com's a new pirate ->> ${name}`)
        })
      
        names.forEach(
          (name) => emitter.emit('newFellow', name),
        )
      }

}