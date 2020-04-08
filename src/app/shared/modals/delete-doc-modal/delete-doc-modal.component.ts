import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-doc-modal',
  templateUrl: './delete-doc-modal.component.html',
  styleUrls: ['./delete-doc-modal.component.scss']
})
export class DeleteDocModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDocModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
