import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTodoPage } from './add-todo';

@NgModule({
  declarations: [
    AddTodoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTodoPage),
  ],
})
export class AddTodoPageModule {}
