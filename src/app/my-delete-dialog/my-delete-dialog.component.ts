import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-delete-dialog.component.html',
  styleUrls: ['./my-delete-dialog.component.css']
})
export class MyDeleteDialogComponent implements OnInit {
  constructor(public thisDialogRef: MatDialogRef<MyDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  ngOnInit() {
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onDeleteConfirm() {
    this.thisDialogRef.close('Delete');
    return 'true';
  }
}