import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { GlobalService } from '../../services/global.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any = {};
  params:any = {
    header:'profile',
  }
  private page_1:boolean = true;
  private page_2:boolean = false;
  private error:any = {
    profileNameIsError:false,
    profileNameAlert:'some error',
    birthdayIsError:false,
    birthdayAlert:'some error',
    genderIsError:false,
    genderAlert:'some error'
  };
  private dataModified:boolean = false;
  constructor(private commonService:CommonService, private globalService:GlobalService, private databaseService:DatabaseService) { }

  ngOnInit() {
    this.data = this.globalService.data;
    this.databaseService.getDataByUID(this.globalService.data.uid, 'userDetail').then((res)=>{
      if(res){
        this.data.userDetail = res;
        this.page_1 = false;
        this.page_2 = true;
      }
    });
    this.dataModified = false;
  }

  dataChanged(){
    this.dataModified = true;
  }

  navigateTo(page?: string) {
    if(page===null || page===undefined){
      this.commonService.navigateTo(this.data.previousPage);
    }else{
      this.commonService.navigateTo(page);
    }
  }

  submit(){
    if ((this.data.userDetail.profileName).trim() == ''){
      this.error.profileNameIsError = true;
      this.error.profileNameAlert = 'enter profile-name';
    }else{
      this.error.profileNameIsError = false;
      this.error.profileNameAlert = 'some error';
    }
    if ((this.data.userDetail.birthday).trim() == ''){
      this.error.birthdayIsError = true;
      this.error.birthdayAlert = 'enter birthday';
    }else{
      this.error.birthdayIsError = false;
      this.error.birthdayAlert = 'some error';
    }
    if ((this.data.userDetail.gender).trim() == ''){
      this.error.genderIsError = true;
      this.error.genderAlert = 'select gender';
    }else{
      this.error.genderIsError = false;
      this.error.genderAlert = 'some error';
    }
    console.log(this.data.userDetail.profileName, this.data.userDetail.birthday, this.data.userDetail.gender);
    if(!this.dataModified){
      this.page_1 = false;
      this.page_2 = true;
      return;
    }
    if(!this.error.profileNameIsError && !this.error.birthdayIsError && !this.error.genderIsError){
      this.saveProfileData();
    }else{
      console.error('some error');
    }
  }

  saveProfileData(){
    if(this.data.database){
      this.databaseService.setDataByUID(this.data.uid, 'userDetail', this.data.userDetail).then((res)=>{
        console.log('successfully saved');
        this.dataModified = false;
        this.page_1 = false;
        this.page_2 = true;
      }).catch((err)=>{
        console.error(err);
      });
    }else{
      console.error('database not enabled');
      alert('database not enabled');
    }
  }

  retriveProfileData(){
    if(this.data.database){
      this.databaseService.getDataByUID(this.data.uid, 'userDetail').then((res)=>{
        console.log('successfully retrived');
        this.data.userDetail = res;
      }).catch((err)=>{
        console.error(err);
      });
    }else{
      console.error('database not enabled');
      alert('database not enabled');
    }
  }

  edit(){
    this.page_2 = false;
    this.page_1 = true;
  }

  emitter(obj:any){
    if(obj && obj.page){
      (obj.page === 'back')?this.navigateTo(null):this.navigateTo(obj.page);
    }else{
      this.navigateTo('signin');
    }
  }
}
