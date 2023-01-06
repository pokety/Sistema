class Evento{
    constructor(id,local,cliente,lista_equipamentos){
        id=this.id,
        local=this.local,
        cliente=this.cliente
        lista_equipamentos=this.lista_equipamentos
    }
    setId(){
      this.id=Math.floor(Math.random()*100)
    }
    getId(){
        return this.id
    }
    setLocal(local){
        this.local=local
    }
    getLocal(){
        return this.local
    }
    setCliente(cliente){
        this.cliente=cliente
    }
    getCliente(){
        return this.cliente
    }
    setLista(...lista_equipamentos){
        this.lista_equipamentos=lista_equipamentos
    }
    getLista(){
        return this.lista_equipamentos
    }
}
export default Evento;