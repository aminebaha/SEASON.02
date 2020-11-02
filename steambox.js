const fs = require('fs')
const stream = require('stream');
module.exports = {
    fs,
    stream,
    duplicate:  (filename)=> {

        fs.createReadStream(filename).pipe(fs.createWriteStream("copy"+filename));
     
    },
    transform:  (filename,re,fn) =>{


    let reader = fs.createReadStream(filename,'utf8')
    let result = ""
    let read = reader.on('data2',(chunk)=> {
        result += chunk.replace(re,fn)
        console.log(result)
     })
       
 },
    transformOnFile:(filename,re,fn) => {

        let reader = fs.createReadStream(filename,'utf8')
        let result = ""
        let read = reader.on('data',(chunk)=> {
            result += chunk.replace(re,fn)
            fs.writeFile('V2'+filename, result,(err)=>{
                if(err)
                    console.log(err.message)
            })
        })
    },

    transformV2: (filename,re,fn,in_stdout= true)=>  {
        let reader = fs.createReadStream(filename,'utf8')
        let writer = fs.createWriteStream("COPY"+filename)
        let result = ""
        let read = reader.on('data',(chunk)=> {
            result += chunk.replace(re,fn)
            
            reader.pipe(writer.write(result))
        })

    },
    transform:  (filename,re,fn,in_stdout) =>{
        return (in_stdout ? transform(filename,re,fn) : transformV2(filename,re,fn))
    
    },
    transformCorrection:(filename, re, fn, in_stdout = true) =>{
        const transformer = new Transform({
          transform(chunk, _, callback) {
            this.push(chunk.toString().replace(re, fn))
      
            callback()
          }
        })
      
        const readStream = fs.createReadStream(filename)
        
        readStream
          .pipe(transformer)
          .pipe(process.stdout)
      },

    csv2json:(csv) =>{
     
        let reader = fs.createReadStream(csv)
        let writer = fs.createWriteStream("COPY-"+csv)
        let result= ""
        let objects = {}
        let lines =""
        let res = {}
        let finalres = []
        reader.on('data',(chunk)=> {
         result += chunk.toString().replace(/\r/,"\n")
         result = result.split("\n").filter(e=> e!="")
         objects = result[0].split(";")
          
   
        for(let i=1;i<result.length;i++) {
            lines = result[i].split(";")
        
            for(let j=0;j<objects.length;j++){
                res[objects[j]] = lines[j]
            }
                finalres.push(res)
        }   
     
        writer.write(JSON.stringify(finalres))
            
        })
        },
        WTFIsThisPipe:  ()=>{

        }


    }