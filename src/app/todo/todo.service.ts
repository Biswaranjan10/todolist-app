import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { todoData } from './todo.model';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<todoData>("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo.json")
  }
  // getComments(){
  //   return this.http.get<todoData>("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo.json")
  // }

  onPostData(data){
    return this.http.post<todoData>("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo.json",data)
  }
  onPostComment(data,id){
    return this.http.put<todoData>("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo/"+id +"comments.json",data)
  }

  onDelete(id){
    return this.http.delete("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo/" + id +'.json')
     
  }
  fetchData(){
    return this.http.get("https://my-todo-list-af028-default-rtdb.firebaseio.com/todo.json")
  }


}
