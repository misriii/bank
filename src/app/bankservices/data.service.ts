import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: any = 'https://bank-server-sadq.onrender.com';

  constructor(private http: HttpClient) {}

  getToken() {
    // create a header object
    const headers = new HttpHeaders();

    console.log(localStorage.getItem('token'));

    if (localStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token') || '');
      options.headers = headers.append('access_token', token);
    }

    return options;
  }

  // api tor create account
  accountCreate(acno: any, psw: any, uname: any) {
    const bodyData = { acno, psw, uname };

    return this.http.post(`${this.baseUrl}/bankuser/create_acc`, bodyData);
  }

  // api to login

  loginApi(acno: any, psw: any) {
    const bodyData = { acno, psw };
    return this.http.post(`${this.baseUrl}/bankuser/login`, bodyData);
  }

  // api to get balance

  getBalanceApi(acno: any) {
    console.log(this.getToken())
    console.log(`${this.baseUrl}/bankuser/balance/${acno}`);
    return this.http.get(
      `${this.baseUrl}/bankuser/balance/${acno}`,
      this.getToken()
    );
  }

  // api to money transfer
  moneyTransferApi(sAcno: any, rAcno: any, amount: any, spsw: any, date: any) {
    console.log(this.getToken())
    const bodyData = {
      sAcno,
      rAcno,
      amount,
      spsw,
      date,
    };
    return this.http.post(
      `${this.baseUrl}/bankuser/money-transfer`,
      bodyData,
      this.getToken()
    );
  }

  // api to get transaction history

  accountStatementHistory(acno: any) {
    return this.http.get(
      `${this.baseUrl}/bankuser/account-statement/${acno}`,
      this.getToken()
    );
  }

  // api to delete account
  accountDeleteApi(acno: any) {
    return this.http.delete(
      `${this.baseUrl}/bankuser/delete-account/${acno}`,
      this.getToken()
    );
  }
}
