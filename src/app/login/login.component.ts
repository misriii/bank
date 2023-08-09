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

  login(a:any,b:any){
    console.log(a.value);
    console.log(b.value);
    
    
  }
  
  

}
