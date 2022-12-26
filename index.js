const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")

app.use(express.json())


const fetchData = (id)=>{
    let data = fs.readFileSync("./db/auth.json" , "utf-8" )
    let datas = JSON.parse(data)
    let dt = datas.filter(e=>{
        return e.id == id
    })
    return dt
}



app.get("/auth" , (req , res)=>{
    let data = fs.readFileSync("./db/auth.json" , "utf-8" )
    res.json({datas : JSON.parse(data) })
})


app.get("/auth/:id" , (req , res)=>{
    const {id} = req.params
    res.json({datas : fetchData(id) })
})


app.post("/post" , (req , res)=>{
    let unique = Date.now()
    const {name , email , password} = req.body
        let auth = { id:unique , name : name , email : email , password : password }
        let data = fs.readFileSync("./db/auth.json" , "utf-8" )
        let datas = JSON.parse(data)
        datas.push(auth)
        fs.writeFileSync("./db/auth.json" , JSON.stringify(datas) )
        res.json({Message:"Add successfully"})
} )

app.delete("/delete/:id" , (req , res)=>{
    const {id} = req.params
    let data = fs.readFileSync("./db/auth.json" , "utf-8" )
    let datas = JSON.parse(data)
    let dt = datas.find((d)=>{
        return id != d.id
    })
    fs.writeFileSync("./db/auth.json" , JSON.stringify([dt]) )
    res.json({Message:"Deleted successfully"})
} )

app.listen(5000 , ()=> console.log("Ran on port 3000") )
