const bus_size=["A","B","C","D"]
const row=4
let c=[]
for (var i=0;i<4;i++){
    let b=[]
    for (var j=0;j<row;j++){
        b.push((i+1)+""+bus_size[j]+" ")
    }
    c.push(b)
}
console.log(c)
module.exports=bus_size

// check

const bus_sizes = ['A', 'B', 'C', 'D'];
let seatscreateds = [];
for (var i = 0; i < 40; i++) {
let b = [];
for (var j = 0; j < 4; j++) {
  b.push(i + 1 + '' + bus_size[j] + ' ');
}
seatscreateds.push(b);
}
console.log(seatscreateds)



const a=[{email: "sonu@gmail.com",
gender: "Male",
name: "a",
phone: "0989786554",
seatNumber: "16"},{email: "kartik@123.com",
gender: "Male",
name: "n",
phone: "8178818872",
seatNumber: "12"}]

var name={

}

for (var i in a.length){
  console.log(i)
}