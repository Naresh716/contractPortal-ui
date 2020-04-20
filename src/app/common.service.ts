import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  setUser(user) {
    const encodedData = window.btoa(JSON.stringify(user));
    localStorage.setItem('client', encodedData);
  }

  getUser() {
    const decodedData = window.atob(localStorage.getItem('client'));
    return JSON.parse(decodedData);
  }

  isAuthriozed() {
    const decodedData = localStorage.getItem('client');
    const isAuth = window.atob(decodedData);
    if (decodedData) {
      return true;
    } else {
      return false;
    }
  }

}
