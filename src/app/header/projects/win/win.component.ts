import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<WinComponent>) { }

  ngOnInit(): void {
  }
  onOkClick()
  {
    this.dialogRef.close()
  }
}
