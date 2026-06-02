import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicModelGeneratorService } from '@app/@core/dynamic-model-generator.service';
import { UserRole } from '@app/@shared/models/user-role';
import { AuthenticationService } from '@app/auth';
import { Subscription } from 'rxjs';
import { AdminService } from './admin.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Ingredient } from '@app/@shared/models/ingredient';
import { Action } from '@app/@shared/models/action';
import { PropertyDefinition } from '@app/@shared/models/property-definition';
import { IEntity } from '@app/@shared/models/entity';
import { CrudComponent } from '@app/@shared';
import { DropDownModelConfig } from '@app/@shared/models/dropdown-model-config';

@Component({
  selector: 'app-customer',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {

  public ordersPackingSlipReady: number;
  public isAdmin: boolean = false;
  private subscriptions: Subscription[] = [];
  public ingredients: Ingredient[];
  public ingredientProperties: PropertyDefinition[] = [];

  public constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private dynamicModelGenerator: DynamicModelGeneratorService,
    private toast: HotToastService
  ) {}

  public ngOnInit(): void {
    this.isAdmin = this.authenticationService.userDetails?.role === UserRole.ADMIN;

    this.adminService.getOrdersPackingSlipReady().subscribe((response) => {
      this.ordersPackingSlipReady = response;
    });

    this.adminService.getIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
      this.ingredientProperties = this.createIngredientProperties();
    });
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public createPharmacistRequest(): void {
    this.adminService.createPharmacistRequest()
      .pipe(
        this.toast.observe({
          loading: 'Apotheker bestelling aan het maken...',
          success: 'E-mail verzonden en aangemeld bij PostNL!',
          error: 'Error',
        })
      ).subscribe(() => {
        this.adminService.getOrdersPackingSlipReady().subscribe((response) => {
          this.ordersPackingSlipReady = response;
        });
      });
  }

  public onActionEmitIngredient(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    if (event.action.label === 'Add') {
      const data = new Ingredient({ ...event.entity });
      this.openAddIngredientDialog('Toevoegen', 'Add', data);
    }
  }

  public openAddIngredientDialog(
    label: string,
    action: string,
    entity: Ingredient,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.ingredientProperties,
      readonly
    );
    const dialogRef = this.dialog.open(CrudComponent, {
      width: '500px',
      data: {
        label,
        action,
        entity,
        formModel,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { event: Action; data: Ingredient }) => {
        if (result?.data) {
          this.adminService.createIngredient(result.data).subscribe(
            (ingredient) => {
              this.toast.success(`${ingredient.name} opgeslagen`);
              this.adminService.getIngredients().subscribe((ingredients) => {
                this.ingredients = ingredients;
              });
            },
            (error) => {
              this.toast.error('Ingredient opslaan niet gelukt');
            });
        }
      });
  }

  private createIngredientProperties(): PropertyDefinition[] {
    const ddConfigIsActive = new DropDownModelConfig({
      multiple: false,
      options: [
        { label: 'Actief', value: true },
        { label: 'Niet Actief', value: false },
        
      ]
    });
    const ddConfigPharmacistSize = new DropDownModelConfig({
      multiple: false,
      options: [
        { label: 'groot', value: 'groot' },
        { label: 'groot_min', value: 'groot_min' },
        { label: 'klein', value: 'klein' },
        { label: 'leeg', value: 'leeg' },
        { label: 'middelgroot', value: 'middelgroot' },
        { label: 'middelklein', value: 'middelklein' },
        { label: 'middelmiddel', value: 'middelmiddel' }
      ]
    });
    return [
      {
        propertyName: 'id',
        displayName: 'ID',
        propertyType: 'number',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'name',
        displayName: 'Naam',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'type',
        displayName: 'Type',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'description',
        displayName: 'Beschrijving',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'code',
        displayName: 'Code',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'url',
        displayName: 'URL',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'strapiContentId',
        displayName: 'Strapi Content Id',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'isAFlavour',
        displayName: 'Is een smaak?',
        propertyType: 'boolean',
        htmlType: 'text',
        hidden: true,
      },
      {
        propertyName: 'isVegan',
        displayName: 'Is vegan?',
        propertyType: 'boolean',
        htmlType: 'text',
        hidden: true,
      },
      {
        propertyName: 'isActive',
        displayName: 'Is actief?',
        propertyType: 'dropdown',
        htmlType: 'text',
        propertyConfig: ddConfigIsActive
      },
      {
        propertyName: 'priority',
        displayName: 'Prioriteit',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'price',
        displayName: 'Prijs',
        propertyType: 'number',
        htmlType: 'text',
        hiddenTable: true
      },
      {
        propertyName: 'sku',
        displayName: 'SKU',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'pharmacistCode',
        displayName: 'Apotheker code',
        propertyType: 'number',
        htmlType: 'text',
        hiddenTable: true
      },
      {
        propertyName: 'pharmacistSize',
        displayName: 'Apotheker grootte',
        propertyType: 'dropdown',
        htmlType: 'text',
        hiddenTable: true,
        propertyConfig: ddConfigPharmacistSize
      },
      {
        propertyName: 'pharmacistUnit',
        displayName: 'Apotheker grootte',
        propertyType: 'number',
        htmlType: 'text',
        hiddenTable: true
      },
      {
        propertyName: 'creationTimestamp',
        displayName: 'Gemaakt op',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'modificationTimestamp',
        displayName: 'Gewijzigd op',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      }
    ];
  }
}
