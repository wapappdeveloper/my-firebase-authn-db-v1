import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  data:DataModel = {
    email:'',
    uid:'',
    validUser:false,
    database:false,
    previousPage:'',
    currentPage:'',
    userDetail:{
      profileName:'',
      birthday:'',
      gender:'',
      profileImagePath:''
    }
  };
  constructor() { }
}

interface DataModel{
  email:string,
  uid:string,
  validUser:boolean,
  database:boolean
  previousPage:string,
  currentPage:string,
  userDetail:UserDataModel
}

interface UserDataModel{
  profileName:string,
  birthday:string,
  gender:string,
  profileImagePath:string
}
