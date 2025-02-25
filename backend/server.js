const app=require('./app')
const dotenv=require('dotenv')
const mongoose= require('mongoose')


dotenv.config({path:'./conf.env'})

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("db connected...")
})

// process.on('uncaughtException',(err)=>{
//     console.log(err.name,err.message)               //handling uncaughtException
//     console.log("exiting the application...(uncaughtException)")
//     process.exit(1)
// })

const server=app.listen(8000,()=>{
    console.log("listning...")
})

// process.on('unhandledRejection',(err)=>{
//     console.log(err.name,err.message)               //handling unhandledRejection
//     console.log("exiting the application...(unhandledRejection)")
//     server.close(()=>{
//         process.exit(1)
//     })
// })

