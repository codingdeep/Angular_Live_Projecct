import {Component, OnInit} from '@angular/core';
import {RestService} from "./rest.service";
import {Users} from "./Users";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'basic-table';
  constructor(private rs:RestService,private http: HttpClient) {};


  columns = ["User id","First Name","Last Name","Email","Mobile","Salary"];
  index = ["id","firstName","lastName","email","mobile","salary"];

  users: Users[] = [];
  loading:Boolean = false

  ngOnInit() {

    const request = this.getPosts();
    this.setLoadingSpinner(request);
    request.subscribe(data=>{
      this.print(data)
    })

    //this.getUser()

  }

  getUser(){
    this.rs.getUsers().subscribe(response=>{
        console.log(response)
        this.users = response;
      },
      error=>{
        console.log(error)
      }
    )
  }

  setLoadingSpinner(observable:Observable<any>){
    this.loading = true;
    observable.subscribe(()=>this.loading = false)
  }

  getPosts():Observable<any>{
    return this.http.get<any>("https://jsonplaceholder.typicode.com/posts")
  }

  print(data){
    console.log(data)
  }

  OnInit():void{
    //alert("ooooo")
  }

}
