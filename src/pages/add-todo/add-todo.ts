import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import {HomePage} from '../../pages/home/home';
/**
 * Generated class for the AddTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-add-todo',
   templateUrl: 'add-todo.html',
 })
 export class AddTodoPage {
   todoData:any;
   todoHeading:any;		
   constructor(public navCtrl: NavController, public navParams: NavParams,public todoServices:TodoProvider) {
     this.todoData="";
     this.todoHeading="";
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad AddTodoPage');
   }
   addTodo(){
     if(this.todoData!==""&&this.todoHeading!==""){
       var todoItem={
         "todoData":this.todoData,
         "todoHeading":this.todoHeading
       };

       this.todoServices.createnewTodo(todoItem);
       this.navCtrl.pop();
     }

   }
 }
