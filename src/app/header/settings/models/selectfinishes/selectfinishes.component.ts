import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selectfinishes',
  templateUrl: './selectfinishes.component.html',
  styleUrls: ['./selectfinishes.component.css']
})
export class SelectfinishesComponent implements OnInit {

  form : FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'Glasses' : new FormControl(null),
    });

  }

  onSaveGlass(event : Event)
  {

    alert((event.target as HTMLInputElement).checked)
   // console.log(glasscheck)
  }

}
