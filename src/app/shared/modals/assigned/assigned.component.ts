import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.scss']
})
export class AssignedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AssignedComponent>,
    @Inject(MAT_DIALOG_DATA) public dataList: any) { }

  ngOnInit() {
  }
  public closeModal(): void {
    this.dialogRef.close();
  }

}
