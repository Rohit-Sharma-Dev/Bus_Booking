// var x = new Array(10);

// for (var i = 0; i < x.length; i++) {
//   x[i] = new Array(3);
// }

// console.log(x);

// var x = new Array(10);
// a=["A","B","C","D"]
// for (var i = 1; i < x.length+1; i++) {
//     for (var j=1;j<5;j++){
//         x[i] = String(i)+a[j]
//     }  
// }
// console.log(x)


const generateseat=(seats)=>{
  let bus_size = [];
  let code = ["A", "B", "C", "D"];
  for (let i = 1; i <=seats; i++) {
    let b = [];
    for (let j = 1; j <= 4; j++) {
      b.push(i + code[j-1]);
    }
    bus_size.push(b);
  }
  return bus_size;
  }


  console.log(generateseat(10))



  // const generateBus = (seats) => {
  //   let bus_size = [];
  //   type = ["A", "B", "C", "D"];
  //   for (let i = 1; i <=10; i++) {
  //     let b= [];
  //     for (let j = 1; j <= 4; j++) {
  //       b.push(i + type[j-1]);
  //     }
  //     bus_size.push(b);
  //   }
  //   return bus_size;
  // };

  // // console.log(generateBus(10));