import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type InactiveShipmentDecision = 'split-shipment' | 'hold-order';

@Component({
  selector: 'inactive-ingredients-warning',
  templateUrl: './inactive-ingredients-warning.component.html',
  styleUrl: './inactive-ingredients-warning.component.scss'
})
export class InactiveIngredientsWarningComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { inactiveIngredients: string[] },
    private dialogRef: MatDialogRef<InactiveIngredientsWarningComponent>
  ) { }

  public chooseSplitShipment = () => {
    this.dialogRef.close('split-shipment' as InactiveShipmentDecision);
  };

  public chooseHoldOrder = () => {
    this.dialogRef.close('hold-order' as InactiveShipmentDecision);
  };

  public close = () => {
    this.dialogRef.close();
  };
}
