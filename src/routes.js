import { Database } from "./database.js";
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method:'GET',
    path:buildRoutePath('/users'),
    handler:(req,res)=>{
      const { search } = req.query
      const userList = database.select('users',{
        name:search,
        email:search
      });
      return res.setHeader('content-type', 'application/json').end(JSON.stringify(userList))
    }
  },
  {
    method:'POST',
    path:buildRoutePath('/users'),
    handler:(req,res)=>{
      const { id,name,email } = req.body;

      const user = {
        id:randomUUID(),
        name: name,
        email: email
        }
        database.insert('users',user);
      return res.writeHead(201).end()
    }
  },
  {
    method:'DELETE',
    path:buildRoutePath('/users/:id'),
    handler:(req,res)=>{
      const id = req.params.id
      database.delete('users',id);

      return res.writeHead(204).end()
    }
  },
  {
    method:'PUT',
    path:buildRoutePath('/users/:id'),
    handler:(req,res)=>{
      const id = req.params.id
      const { name ,email } = req.body;

      database.update('users',id,{name,email});

      return res.writeHead(204).end()
    }
  },
]