import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class TodoProvider {
  	remote:any;
  	db:any;
  	data:any;
  	constructor(public http: Http) {
  		//console.log('Hello TodoProvider Provider');
  		this.remote = 'http://192.168.0.51:5984/tododata';
  		this.db = new PouchDB('tododata');
  	}

  	getAllTodos() {
  		if (this.data) {
  			return Promise.resolve(this.data);
  		}
  		return new Promise(resolve => {	
  			this.db.allDocs({
  				include_docs: true
  			}).then((result) => {
  				this.data = [];
  				let docs = result.rows.map((row) => {
  					this.data.push(row.doc);
  				});
  				resolve(this.data);
  				this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
  					this.handleChange(change);
  				});
  			}).catch((error) => {
  				console.log(error);
  			});

  		});

  	}

  	createnewTodo(todo){
  		this.db.post(todo).then(function (response) {
  			console.log("new Todo is added");
  		}).catch(function (err) {
  			console.log(err);
  		});
  	}

  	updateTodo(todo){
  		this.db.put(todo).then(function (response) {
  			console.log(" Todo is updated successfully");
  		}).catch(function (err) {
  			console.log(err);
  		});
  	}

  	deleteTodo(todo){
  		var i=0;
  		for(i=0;i<this.data.length;i++){
  			if(this.data._id===todo._id){
  				this.data.splice(i,1);
  			}
  		}
  		this.db.remove(todo).catch((err) => {
  			console.log(err);
  		});
  	}

  	handleChange(change){

  		let changedDoc = null;
  		let changedIndex = null;

  		this.data.forEach((doc, index) => {

  			if(doc._id === change.id){
  				changedDoc = doc;
  				changedIndex = index;
  			}

  		});

  		//A document was deleted
  		if(change.deleted){
  			this.data.splice(changedIndex, 1);
  		}
  		else {

  			//A document was updated
  			if(changedDoc){
  				this.data[changedIndex] = change.doc;
  			}

  			//A document was added
  			else {
  				this.data.push(change.doc);
  			}

  		}
  	}
  }
  

