const HOST="0.0.0.0"
////////////click OS

async function caregarOs(){
    const rowst=document.querySelectorAll(".rowst")
    rowst.forEach((item)=>item.remove())
    let id=this.id
    var result=await initload(id,"O.S")

    const table=document.querySelector('#table')

    if(result){
        Array.isArray(result)?result=result:result=[result]

        var a=0
        do{ 
            const tr=document.createElement('tr')
            tr.className="rowst"
            let patrimonio1=document.createElement('td')
            let model1=document.createElement('td')
            let marca1=document.createElement('td')
            let status1=document.createElement('td')
            let n_data1=document.createElement('td')
            let evento1=document.createElement('td')
            
            patrimonio1.textContent=result[a].patrimonio;
            model1.textContent=result[a].model;
            marca1.textContent=result[a].marca;
            status1.textContent=result[a].status;
            n_data1.textContent=result[a].n_data;
            evento1.textContent=result[a].evento
            tr.append(patrimonio1,model1,marca1,status1,n_data1,evento1)
            table.appendChild(tr)
            a+=1
        }while(a<result.length)
        find.value=''
    }else{
        find.value='nao existe'
        setTimeout(()=>{find.value=''},1000)
    }
}

////////////onload
async function initload(a,b){
    const response=await fetch(`http://${HOST?HOST:"192.168.1.6"}:3000/api/?id=${a}&opcao=${b}`);
    const resultado =await response.json()
    return resultado
}
let resg=await initload("0","Geral");

var osState=[]
var newARRAY=[]

for(let a=0;a<resg.length;a++){
    if(osState.indexOf(resg[a].evento)){
        osState.push(resg[a].evento);
        newARRAY.push({os:resg[a].evento,termino:resg[a].n_data})
    }
    
}

for(let a=0;a<newARRAY.length;a++){
    let div=document.createElement("div")
    div.id=newARRAY[a].os
    div.onclick=caregarOs
    let h5=document.createElement("h5")
    let content=`O.S:${newARRAY[a].os}\n Terminio:${newARRAY[a].termino}`
    h5.innerText=content
    let offData=new Date(newARRAY[a].termino)-new Date()
    offData>=1?div.style='background-color: rgba(127, 255, 212, 0.294);border: 2px solid aquamarine;':div.style='background-color: rgba(222, 10, 10, 0.294);border: 2px solid red;'
    div.append(h5)
    $('#header').append(div)
}

//////// saida de equipamento
const saida1=document.querySelector('#saida')
const os1=document.querySelector('#os')
const data_fim=document.querySelector("#data_fim")

saida.addEventListener('keydown',async(key)=>{
    if(key.keyCode==13){
        const data={saida:saida1.value,terminio:data_fim.value,os:os1.value}
        
        try {
            const response = await fetch(`http://${HOST?HOST:"192.168.1.6"}:3000/api`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                   'Content-Type': 'application/json'
                   //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            });

            const result=await response.json();
            if(result.modifiedCount==1){
                saida1.style.background="#50f896";
            }else{
                saida1.style.background="red"
            };
            if(result.matchedCount==0){alert('equipamento nao cadastrado')}
            
        }catch{
            console.log('erro')
        }
        saida1.value=''
    }
})


/////////////////////pesquisar

let find=document.querySelector('#find')
let opcao=document.querySelector('select[name=opcoes]')
let buscar=document.querySelector("#buscar")
async function run(){
    const resp=await fetch(`http://${HOST?HOST:"192.168.1.6"}:3000/api/?id=${find.value}&opcao=${opcao.value}`)
    var result=await resp.json()

    const table=document.querySelector('#table')

    if(result){
        Array.isArray(result)?result=result:result=[result]

        var a=0
        do{ 
            const tr=document.createElement('tr')
            tr.className="rowst"
            let patrimonio1=document.createElement('td')
            let model1=document.createElement('td')
            let marca1=document.createElement('td')
            let status1=document.createElement('td')
            let n_data1=document.createElement('td')
            let evento1=document.createElement('td')
            
            patrimonio1.textContent=result[a].patrimonio;
            model1.textContent=result[a].model;
            marca1.textContent=result[a].marca;
            status1.textContent=result[a].status;
            n_data1.textContent=result[a].n_data;
            evento1.textContent=result[a].evento
            tr.append(patrimonio1,model1,marca1,status1,n_data1,evento1)
            table.appendChild(tr)
            a+=1
        }while(a<result.length)
        find.value=''
    }else{
        find.value='nao existe'
        setTimeout(()=>{find.value=''},1000)
    }
};

buscar.addEventListener("click",(e)=>{
    e.preventDefault;
    const rowst=document.querySelectorAll(".rowst")
    rowst.forEach((item)=>item.remove())
    run()
})

find.addEventListener('keypress',(key)=>{
    const rowst=document.querySelectorAll(".rowst")
    rowst.forEach((item)=>item.remove())
    var keyy = key.keyCode || key.which;
    if(keyy==13){
        key.stopPropagation();
        run()
    }
})
