const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT=8000

// connectDB();

app.use(express.json({ extended: false }));

app.get('/',(req,res)=>{
    res.send("hello user....")
})

// routes
app.use('/Api/signUp',require('./routes/signup'))


// app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
module.exports=app
