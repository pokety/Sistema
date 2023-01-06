import express from "express";
import { MongoClient } from 'mongodb'
import auth from "./midlleware";
import path from 'path'
import bodyParser from "body-parser";
const urlencoded=bodyParser.urlencoded({extended:false})
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri ="mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

const rotas=express.Router()
rotas.use(express.static('./public'))

///////////////////////////////////////// MAIN
rotas.post('/',urlencoded,auth,(req,res)=>{  
    
    res.sendFile(path.join(__dirname,'./public/admin.html'))
})
////////////////////////////////////////// cadastrar
rotas.post('/cadastrarequipamento',async(req,res)=>{
    await client.connect();
    const db=client.db("acap")
    const col=db.collection("audioVisual")
     
    let resultado=JSON.parse(JSON.stringify(req.body))
    const result= await col.insertOne(resultado)
    res.send(result)
});

/////////////////////////////////////////// saida para locacao
rotas.post('/api',async(req,res)=>{  
    await client.connect();
    const db=client.db("acap")
    const col=db.collection("audioVisual")

    const resultado=JSON.parse(JSON.stringify(req.body))
    const status=resultado.os != "deposito"?"locado":"disponivel"
    let data=resultado.terminio;
    const result1=await col.updateOne(
        { "patrimonio" : resultado.saida },
      { $set: { "evento" : resultado.os ,"status":status,"n_data":data} }
    )
   return res.json(result1);
    
})
///////////////////////////////////////// procurar

rotas.get("/api/",async(req,res,next)=>{
    await client.connect();
    const db=client.db("acap");
    const col=db.collection("audioVisual");
    const dataFind={patrimonio:req.query.id}
    const osFind={evento:req.query.id}
    
    switch(req.query.opcao) {
          case "O.S":
            var result=await col.find(osFind);
            result.toArray(function(err, resposta) {
            if (err) throw err;
            res.json(resposta);
            client.close()
            })
            break;
          case "Patrimonio":
            var result=await col.findOne(dataFind)
            res.json(result)
            client.close()
            break;
          case "Geral":
            var result=await col.find({});
            result.toArray(function(err, resposta) {
            if (err) throw err;
            res.json(resposta);
            client.close()})
            break;
          default:
            res.json({erro:"erro"})
            client.close()
            break;
    } 
    
})


export default rotas