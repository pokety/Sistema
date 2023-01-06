class Equipamento{

    constructor(model,patrimonio,marca,status,evento){
       model =this.model,
       patrimonio=this.patrimonio,
       marca=this.marca,
       status=this.status,
       evento=this.evento
    }
    setModel(model){
        this.model=model
    }
    getModel(){
        return this.model
    }
    setPatrimonio(patrimonio){
        this.patrimonio=patrimonio
    }
    getPatrimonio(){
        return this.patrimonio
    }
    setMarca(marca){
        marca.toLowerCase()
        this.marca=marca
    }
    getMarca(){
        return this.marca
    }
    setStatus(status){
        this.status=status
    }
    getStatus(){
        return this.status
    }
    setEvento(evento){
        this.evento=evento
    }
    getEvento(){
        return this.evento
    }
}
export default Equipamento;