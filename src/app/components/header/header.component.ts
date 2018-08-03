import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('params') private params:any;
  @Output('emitter') private emitter: EventEmitter<any> = new EventEmitter();
  header:string = '';
  actions:Array<string> = [];
  actionStatus:boolean = false;
  enableActions:boolean = false;
  constructor() { }

  ngOnChanges(){
    console.log(this.params);
    if(this.params && this.params.actions){
      this.actions = this.params.actions;
    }
    if(this.params && this.params.header){
      this.header = this.params.header;
    }
  }
  
  ngOnInit() {
  }

  navigateTo(page?: string) {
    this.emitter.emit({ event:'navigateTo', page: page });
  }

  openCloseActions(){
    this.enableActions = true;
    this.actionStatus = !this.actionStatus;
  }

  callAction(action:string, index:number){
    console.log(action);
    this.actionStatus = false;
    if(action){
      this.emitter.emit({event:'action', action:action});
    }else{
      console.error('unknown action');
    }

  }

}
