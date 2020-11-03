const myEventEmitter = require('./myEventEmitter')
const m = new myEventEmitter()

m.on('hi', (...data) => {
  console.log(`event::hi [args == ${data.length}]`)

  for (const [idx, d] of data.entries()) {
    console.log(`${idx}: ${d}`)
  }
})

m.emit('hi')
m.emit('hi', 'Ch0pper')
m.emit('hi', 'Luffy', 'Zorro')