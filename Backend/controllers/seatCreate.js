const bus_size=["A","B","C","D"]
const row=4
let c=[]
for (var i=0;i<row;i++){
    let b=[]
    for (var j=0;j<4;j++){
        b.push((i+1)+""+bus_size[j]+" ")
    }
    c.push(b)
}
console.log(c)
module.exports=bus_size