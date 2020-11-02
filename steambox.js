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

    csv2json:(csv) =>{
        let reader = fs.createReadStream(csv)
        let writer = fs.createWriteStream("COPY-"+csv)
        let lines=csv.split("\n");
        var headers=lines[0].split(",");
        let result ={}
        for(var i=1;i<lines.length;i++){
            var currentline=lines[i].split(",");
            
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }

    result.push(obj);

}   
   writer.write(JSON.stringify(result))

},
    }

