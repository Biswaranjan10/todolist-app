import { Component, OnInit,OnChanges,DoCheck } from '@angular/core';
import { todoData } from './todo.model';
import { TodoService } from './todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo = {
    creationTime:'',
    data:'',
    comments:[]
  }
 
  
  mylistData:any;
  mycomments:any;

  commentActive:boolean = false;

  fetching:boolean = false;

  color;
  

  listcreationTime:Date;

  listActiveIndex:number;
  listActiveId: any;
  
  constructor(private _service:TodoService) { }


  ngOnInit() {
    this.onFetchData()
    

  }
  

  createTodo(data){
    this.todo.data = data;
    this.todo.creationTime = new Date().toLocaleTimeString();
    this._service.onPostData(this.todo).subscribe((res)=>{
      this.listcreationTime = new Date()
      this.onFetchData()
    })
    
  }
   onDeleteList(id){
    console.log(id)
    if(confirm('Do you want to delete this item')){
      this._service.onDelete(id).subscribe((res)=>{
        this.onFetchData()
      })
      
    }
     
  }
    onFetchData(){
     this.fetching = true;
    this.mylistData =  this._service.getData().pipe(map( (resdata)=>{
      const todoArray = [];
      for(let key in resdata){
        
         todoArray.push({id:key,...resdata[key]})    
      }
      return todoArray;
    })).
    subscribe((res)=>{
      this.mylistData = res;
      this.fetching = false; 
    });
   
  }

  changeColor(id,color){
    if(id == this.mylistData.id){
      this.color =color
      document.getElementById('cs').style.color = "this.color";
    }
  }

  addComment(index, id) {
    this.listActiveIndex = index ;
    this.listActiveId = id ;
    // console.log(document.querySelector('#cs'))
    this.commentActive = !this.commentActive
    
    if(this.commentActive){
      document.getElementById('cs').style.display = "block";
    }else{
      document.getElementById('cs').style.display = "none";
    }
    
  }


  submitcomment(comment){
   console.log( this.mylistData)
    
  
    // console.log(this.todo)
    // this._service.onPostComment(this.todo,id).subscribe()
  }
  
  

}


