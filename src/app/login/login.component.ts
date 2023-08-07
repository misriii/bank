import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  data="Happy banking with us"
  data2="Enter account number"

  constructor(){}
  ngOnInit(): void {
    
  }

  login(){
    alert("login clicked")
  }
  
  accnoChange(event:any){
    console.log(event.target.value);
    
  }

  passChange(event:any){
    console.log(event.target.value);
    
  }

}
