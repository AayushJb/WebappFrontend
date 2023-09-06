import { Component, OnInit,OnDestroy, EventEmitter, Output, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlassonlyService } from 'src/app/services/glassonly.service';


@Component({
  selector: 'app-reactivetable',
  templateUrl: './reactivetable.component.html',
  styleUrls: ['./reactivetable.component.css']
})
export class ReactivetableComponent implements OnInit {

 
  @Input() initialData: any[];
  @Input() maxheight: number;
  @Input() maxwidth : number;


  rows: FormGroup[] = [];
  serialNumber: number = 1;

  sizesSub : Subscription;
  

  constructor(private formBuilder: FormBuilder,
    public glassonlyservice : GlassonlyService) { }


  ngOnInit() {

    
    alert("I was refresed")
    this.createRowsFromData()
 
    
  }

  
  createRow(): FormGroup {
    const row = this.formBuilder.group({
      Width: ['', Validators.required],
      Height: ['', Validators.required],
      Quantity: [1, Validators.required],
      Drawing: ['NONE', Validators.required],
    });

    row.valueChanges.subscribe(() => {
      this.emitFormValues();
    });


   


    return row;

  }


  createRowsFromData(): void {

    console.log(this.glassonlyservice.glasssizes)
    if (this.glassonlyservice.glasssizes.length>0) {
      this.initialData = []

      this.initialData = this.glassonlyservice.glasssizes
      this.rows = this.initialData.map(data =>
        this.formBuilder.group({
          Width: [data.Width, Validators.required],
          Height: [data.Height, Validators.required],
          Quantity : [data.Height, Validators.required],
          Drawing : [data.Drawing, Validators.required],
        })
      );


      this.glassonlyservice.glasssizes = this.rows.map(row => row.value)
    } else {
      this.addRow();
    }
  }

  addRow(): void {
    this.rows.push(this.createRow());
    this.emitFormValues()
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
    this.updateSerialNumbers();
    this.emitFormValues()
  }

 

  emitFormValues(): void {
    const formValues = this.rows.map(row => row.value);
    this.glassonlyservice.glasssizes = this.rows.map(row => row.value)
  
  }

  updateSerialNumbers(): void {
    this.rows.forEach((row, index) => {
      row.patchValue({ serialNumber: index + 1 }, { emitEvent: false });
    });
  }

  onEnter(event: KeyboardEvent): void {
    event.preventDefault();
  }

  onInputWidthEvent(group :FormGroup, index: number, inputName: string) {

    const inputControl = group.get('Width');
    const inputValue = inputControl.value;
    if (inputValue > this.maxwidth) {
      inputControl.setValue(null);
    }
   
  }

  onInputHeightEvent(group :FormGroup, index: number, inputName: string)
  {

    const inputControl = group.get('Height');
    const inputValue = inputControl.value;
    if (inputValue > this.maxheight) {
      inputControl.setValue(null);
    }
  }



}







