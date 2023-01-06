import express from "express"
import rotas from "./router.js"
const app=express()
app.use(express.json())
app.use('/public',express.static('./'))
app.use(express.static("./public"))
app.use('/',rotas)



const HOST=process.env.HOST || 'localhost'
const PORT=process.env.PORT || 3000

app.listen(PORT,HOST)
// var equipamento = new_evento.getLista().filter(produto => produto.marca == "LG");
// equipamento.forEach(produto => { 
//     console.log(produto);
// });
