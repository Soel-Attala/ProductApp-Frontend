import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule,MatButtonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);

  onCancel():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true);
  }
}
