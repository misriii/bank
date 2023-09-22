import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankservices/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: any = ""
  acno: any = ""
  balance: any = ""
  message: any = ""
  msgColor: any = true
  dAcno: any = ""

  // reactive form for  moneytransfer
  moneyTransferForm = this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })
  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder, private dp: DatePipe) { }

  ngOnInit(): void {

    // check data present or not in local storage

    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")

    }

    if (!localStorage.getItem('currentAcno')) {
      this.rout.navigateByUrl("")
      alert("Please login first")
    }else{ 
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
    }

  }


  getbalance() {
    this.ds.getBalanceApi(this.acno).subscribe({
      next: (result: any) => {

        this.balance = result.message
      },
      error: (result: any) => {
        alert(result.error.message)
      }
    })
  }


  getProfile() {
    if (localStorage.getItem("currentAcno")) {
      this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

    }

  }

  moneyTransfer() {
    if (this.moneyTransferForm.valid) {
      var path = this.moneyTransferForm.value
      var rAcno = path.rAcno
      var amount = path.amount
      var psw = path.psw

      // console.log(rAcno);


      // sender acc no
      if (localStorage.getItem("currentAcno")) {
        this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
      }

      // date
      const date = new Date()
      // console.log(date);

      var latestDate = this.dp.transform(date, 'medium')
      if (this.acno == rAcno) {
        this.message = "sender and reciever accno are same"
        this.msgColor = false
      }
      else {
        //api
        this.ds.moneyTransferApi(this.acno, rAcno, amount, psw, latestDate).subscribe({
          next: (result: any) => {
            this.message = result.message
            this.msgColor = true

          },
          error: (result: any) => {
            this.message = result.error.message
            this.msgColor = false

          }
        })
      }


    } else {
      this.message = "Invalid form"
      this.msgColor = false

    }
  }


  logout() {
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUname');
    this.rout.navigateByUrl("")
  }

  deleteActive() {
    if (localStorage.getItem("currentAcno")) {
      this.dAcno = JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.dAcno);

    }
  }

  cancel() {
    this.dAcno = ""
  }

  yesDelete(event: any){
this.ds.accountDeleteApi(event).subscribe({
  next:(data:any)=>{
    alert('data.message')
    this.logout()
  }
})    
  }

}
