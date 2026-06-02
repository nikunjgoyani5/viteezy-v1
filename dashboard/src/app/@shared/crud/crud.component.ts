import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StringUtilService } from '@app/@core/stringUtil.service';
import {
  DynamicFormControlModel,
  DynamicFormService,
} from '@ng-dynamic-forms/core';
import { Observable, Subscription } from 'rxjs';
import { CampaignStatusAggregated } from '../models/campaign-status-aggregated';
import { IEntity } from '../models/entity';
import { ViewProperty } from '../models/view-property';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnDestroy {
  public entity: IEntity;
  public output: IEntity;
  public label = '';
  public action = '';
  public actionButtonVisible = true;
  public formGroup: FormGroup;
  public observableViewProperties: ViewProperty[] = [];
  public staticViewProperties: ViewProperty[] = [];
  public viewProperties$: Observable<CampaignStatusAggregated>;
  public formModel: DynamicFormControlModel[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(
    private formService: DynamicFormService,
    private stringUtil: StringUtilService,
    public dialogRef: MatDialogRef<CrudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      label: string;
      action: string;
      entity: IEntity;
      formModel: DynamicFormControlModel[];
      viewProperties: ViewProperty[];
      viewPropertyObservable: Observable<CampaignStatusAggregated>;
    }
  ) {
    this.label = data.label;
    this.action = data.action;
    this.entity = data.entity;
    this.formModel = data.formModel;
    this.actionButtonVisible = data.action !== 'View';
    this.staticViewProperties = data.viewProperties;

    if (data.viewPropertyObservable) {
      this.subscriptions = [
        data.viewPropertyObservable.subscribe(
          (result) => {
            this.observableViewProperties = Object.entries(result).map(
              (prop) =>
                new ViewProperty({
                  value: prop[1],
                  description: prop[0],
                  showlabel: true,
                  label: prop[0],
                })
            );
          },
          (error) => console.error(error)
        ),
      ];
    }
  }

  public ngOnInit(): void {
    if (this.formModel?.length > 0) {
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.formGroup.valueChanges.subscribe((changes) => {
        this.output = { ...changes };
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.output });
  }

  public closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
