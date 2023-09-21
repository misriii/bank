import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: any = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  // api tor create account
  accountCreate(acno: any, psw: any, uname: any) {

    const bodyData = { acno, psw, uname }

    return this.http.post(`${this.baseUrl}/bankuser/create_acc`, bodyData)
  }

  // api to login

  loginApi(acno: any, psw: any) {
    const bodyData = { acno, psw }
    return this.http.post(`${this.baseUrl}/bankuser/login`, bodyData)
  }


  // api to get balance

  getBalanceApi(acno: any) {
    return this.http.get(`${this.baseUrl}/bankuser/balance/${acno}`)
  }

  // api to money transfer
  moneyTransferApi(sAcno: any, rAcno: any, amount: any, spsw: any, date: any) {
    const bodyData = {
      sAcno, rAcno, amount, spsw, date
    }
    return this.http.post(`${this.baseUrl}/bankuser/money-transfer`, bodyData)
  }

  // api to get transaction history

  accountStatementHistory(acno:any){
    return this.http.get(`${this.baseUrl}/bankuser/account-statement/${acno}`)
  }
}

