import fs from 'node:fs/promises';

export const databasePath = new URL('db.json',import.meta.url)

export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasePath,'utf8').then(data=>{
      this.#database =JSON.parse(data)
    }).catch(()=>{
      this.#persistent();
    })
  }
  #persistent() {
    fs.writeFile('db.json',JSON.stringify(this.#database))
  }

  select(table,seach){
    let data =this.#database[table] ?? [];


    if(seach){
      data=data.filter(row => {
        return Object.entries(seach).some(([key,value])=>{
          return row[key].includes(value)
        })
      })
    }
    return data
  }
  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persistent();
    return data;
  }

  delete(table ,id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persistent();
    }

  }
  update(table,id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if(rowIndex > -1){
      this.#database[table][rowIndex] = {id,...data};
      this.#persistent();
    }
  }
}