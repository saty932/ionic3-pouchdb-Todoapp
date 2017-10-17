import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TodoProvider } from '../../providers/todo/todo';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import PouchDB from 'pouchdb';
import {AddTodoPage} from '../../pages/add-todo/add-todo';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	data:Data[];	
	remote:any;
	db :any;
	datafromlocal:Data[];
	todoData:any;
	todoHeading:any;
	constructor(public navCtrl: NavController,
		public storage:Storage,
		public todoServices:TodoProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController) {
		this.remote = 'http://192.168.0.51:5984/tododata';
		this.db = new PouchDB('tododata');
		storage.get('dataloaded').then((response) => {
			console.log(response);
			if(response){
				console.log("success");
				const loading = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				loading.present();
				this.todoServices.getAllTodos().then((result) => {
					this.data=[];
					this.data=result;
					loading.dismiss();
					this.db.sync(this.remote, {
						live: true
					}).on('change', function (change) {
						// yo, something changed!
					}).on('error', function (err) {
						// yo, we got an error! (maybe the user went offline?)
					});

				}
				);
			}
			else
			{
				
				console.log("failure");
				const loading = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				loading.present();
				let options = {
					checkpoint: false
				};
				PouchDB.replicate(this.remote,this.db, [options]).on('complete', (info) => {
					console.log(info);
					this.db.allDocs({
						include_docs: true
					}).then((result) => {
						this.datafromlocal = [];
						let docs = result.rows.map((row) => {
							this.datafromlocal.push(row.doc);
						});
						this.data=this.datafromlocal;
						console.log(this.data);
						storage.set('dataloaded',true);
						loading.dismiss();
						this.db.sync(this.remote, {
							live: true
						}).on('change', function (change) {
							// yo, something changed!
						}).on('error', function (err) {
							// yo, we got an error! (maybe the user went offline?)
						});
					}).catch((error) => {
						console.log(error);
					});

				}).on('error', function (err) {
					// boo, something went wrong!
				});

				


			}
		});

	}
	showmodal(item){
		this.presentPrompt(item);
	}
	presentPrompt(item) {
		const alert = this.alertCtrl.create({
			title: 'Update Todo',
			inputs: [
			{
				name: 'Title',
				placeholder: item.todoHeading
			},
			{
				name: 'Info',
				placeholder: item.todoData
				
			}
			],
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: data => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'update',
				handler: data => {
					if (data.Title || data.Info) {
						if(data.Title)
						{
							item.todoHeading=data.Title;
						}
						if(data.Info)
						{
							item.todoData=data.Info;	
						}
						
						
						this.todoServices.updateTodo(item);
					} else {
						// invalid login
						return false;
					}
				}
			}
			]
		});
		alert.present();
	}
	delete(item){
		this.todoServices.deleteTodo(item);
	}
	moveToAddTodoPage(){
		this.navCtrl.push(AddTodoPage);
	}

}
export interface Data{
	todoData:String;
	todoHeader:String;
}
