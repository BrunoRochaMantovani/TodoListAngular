import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])]
    });

    this.load();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(title, false, id));
    this.save();
    this.clear();
  }
  clear() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }
  changeMode(mode: string) {
    this.mode = mode;
  }
}
