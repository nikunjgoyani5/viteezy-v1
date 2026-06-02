import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicModelGeneratorService } from '@app/@core/dynamic-model-generator.service';
import { CrudComponent } from '@app/@shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '@app/@shared/models/action';
import { User } from '@app/@shared/models/user';
import { Customer } from '@app/@shared/models/customer';
import { PaymentPlan } from '@app/@shared/models/payment-plan';
import { Payment } from '@app/@shared/models/payment';
import { Order } from '@app/@shared/models/order';
import { Note } from '@app/@shared/models/note';
import { Logging } from '@app/@shared/models/logging';
import { IEntity } from '@app/@shared/models/entity';
import { DropDownModelConfig } from '@app/@shared/models/dropdown-model-config';
import { PropertyDefinition } from '@app/@shared/models/property-definition';
import { UserRole } from '@app/@shared/models/user-role';
import { AuthenticationService } from '@app/auth';
import { Observable, Subscription } from 'rxjs';
import { CustomerService } from './customer.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, OnDestroy {
  public customerExternalReference: string;
  public users: User[];
  public customers: Customer[];
  public paymentPlans: PaymentPlan[];
  public payments: Payment[];
  public orders: Order[];
  public notes: Note[];
  public logging: Logging[];

  public emailForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  public phoneForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(''),
  });

  public postcodeForm: FormGroup = new FormGroup({
    postcode: new FormControl(''),
  });

  public nameForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  public customerProperties: PropertyDefinition[] = [];

  public paymentPlanProperties: PropertyDefinition[] = [];

  public paymentProperties: PropertyDefinition[] = [];

  public orderProperties: PropertyDefinition[] = [];

  public noteProperties: PropertyDefinition[] = [];

  public loggingProperties: PropertyDefinition[] = [];

  public rowActionEdit: Action[] = [
    { label: 'Edit', icon: 'mode_edit', tooltip: 'Wijzigen' }
  ];

  public rowActionEditNotification: Action[] = [
    { label: 'Edit', icon: 'notifications', tooltip: 'Wijzigen' }
  ];

  public rowActionRedoCancel: Action[] = [
    { label: 'Redo', icon: 'redo', tooltip: 'Opnieuw maken' },
    { label: 'Cancel', icon: 'cancel', tooltip: 'Annuleren', guard: (order) => order.status === "CREATED" || order.status === "PACKING_SLIP_READY" || order.status === "SHIPPED_TO_PHARMACIST" }
  ];

  public rowActionEditStopCoupon: Action[] = [
    {
      label: 'Edit',
      icon: 'mode_edit',
      tooltip: 'Wijzigen',
      guard: (paymentPlan) =>
        paymentPlan.status === 'canceled' || paymentPlan.status === 'stopped',
    },
    {
      label: 'Stop',
      icon: 'cancel',
      tooltip: 'Stopzetten',
      guard: (paymentPlan) => paymentPlan.status === 'active',
    },
    {
      label: 'Coupon',
      icon: 'card_giftcard',
      tooltip: 'Kortingscode toevoegen',
    },
  ];

  public rowActionEditDelete: Action[] = [
    { label: 'Edit', icon: 'mode_edit', tooltip: 'Wijzigen' },
    { label: 'Delete', icon: 'delete', tooltip: 'Verwijderen' }
  ];

  public menuActions: Action[] = [];

  public rowClick: Action = new Action({ label: 'Click' });

  public isAdmin: boolean = false;

  private subscriptions: Subscription[] = [];

  public constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private authenticationService: AuthenticationService,
    private dynamicModelGenerator: DynamicModelGeneratorService,
    private toast: HotToastService
  ) {}

  public ngOnInit(): void {
    this.isAdmin = this.authenticationService.userDetails?.role === UserRole.ADMIN;
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onActionEmitCustomer(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    if (event.action.label === 'Click') {
      this.resetTables();
      this.customers = [(event.entity as Customer)]
      this.customerExternalReference = (event.entity as Customer).externalReference;
      this.findNotesByCustomerExternalReference(this.customerExternalReference);
      this.findLoggingByCustomerExternalReference(this.customerExternalReference);
      this.findPaymentPlanByCustomerExternalReference(this.customerExternalReference);
      this.findPaymentsByCustomerExternalReference(this.customerExternalReference);
      this.findOrdersByCustomerExternalReference(this.customerExternalReference);
    } else if (event.action.label === 'Edit') {
      const data = new Customer({ ...event.entity });
      this.openEditCustomerDialog('Wijzigen', 'Edit', data);
    }
  }
  
  public onActionEmitPaymentPlan(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    if (event.action.label === 'Edit') {
      const data = new PaymentPlan({ ...event.entity });
      this.openPaymentPlanStatusDialog('Wijzigen', 'Edit', data);
    } else if (event.action.label === 'Stop') {
      const data = new PaymentPlan({ ...event.entity });
      this.openStopPaymentPlanDialog('Stopzetten', 'Stop', data);
    } else if (event.action.label === 'Coupon') {
      const data = new PaymentPlan({ ...event.entity });
      this.openCouponPaymentPlanDialog('Kortingscode toevoegen', 'Coupon', data);
    }
  }
  
  public onActionEmitPayment(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    if (event.action.label === 'Edit') {
      const data = new Payment({ ...event.entity });
      this.openUpdateStatusDialog('Wijzigen', 'Edit', data);
    }
  }

  public onActionEmitNote(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    if (event.action.label === 'Edit') {
      const data = new Note({ ...event.entity });
      this.openAddEditNoteDialog('Wijzigen', 'Edit', data);
    } else if (event.action.label === 'Delete') {
      const data = new Note({ ...event.entity });
      this.openDeleteNoteDialog('Verwijderen', 'Delete', data);
    }
  }

  public onActionEmitOrder(event: {
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }): void {
    const data = new Order({ ...event.entity });
    if (event.action.label === 'Redo') {
      this.subscriptions.push(
        this.customerService.createDuplicateOrder(data.externalReference).subscribe(
          (order) => {
            this.findOrdersByCustomerExternalReference(this.customerExternalReference);
          },
          (error) => {
            if (error.status === 409) {
              this.toast.error('Er bestaat al een nieuwe bestelling');
            }
          }
        )
      );
    } else if (event.action.label === 'Cancel') {
      this.subscriptions.push(
        this.customerService.cancelOrder(data.externalReference).subscribe(
          (order) => {
            this.findOrdersByCustomerExternalReference(this.customerExternalReference);
          }
        )
      );
    }
  }

  private openEditCustomerDialog(
    label: string,
    action: string,
    entity: Customer,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.customerProperties,
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
      .subscribe((result: { event: Action; data: Customer }) => {
        if (result?.data) {
          this.subscriptions.push(

            this.customerService.patch(entity.externalReference, result.data).subscribe(
              (customer) => {
                this.findCustomer(customer.externalReference);
              },
              (error) => {
                if (error.status === 409) {
                  this.toast.error('E-mailadres is in gebruik');
                }
              }
            )
          );
        }
      });
  }

  private openPaymentPlanStatusDialog(
    label: string,
    action: string,
    entity: PaymentPlan,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.createPaymentPlanStatusProperties(),
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
      .subscribe((result: { event: Action; data: PaymentPlan }) => {
        if (String(result.event) === "Edit") {
          this.subscriptions.push(
            this.customerService.updatePaymentPlanStatus(result.data).subscribe(
              (paymentPlan) => {
                this.findPaymentPlanByCustomerExternalReference(this.customerExternalReference);
              }
            )
          );
        }
      });
  }

  private openStopPaymentPlanDialog(
    label: string,
    action: string,
    entity: PaymentPlan,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.paymentPlanProperties,
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
      .subscribe((result: { event: Action; data: PaymentPlan }) => {
        if (String(result.event) === "Stop") {
          this.subscriptions.push(
            this.customerService.cancelPaymentPlan(entity.externalReference, result.data.stopReason).subscribe(
              (paymentPlan) => {
                this.findPaymentPlanByCustomerExternalReference(this.customerExternalReference);
              }
            )
            );
          }
        });
    }

  private openCouponPaymentPlanDialog(
    label: string,
    action: string,
    entity: PaymentPlan,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.createPaymentPlanCouponProperties(),
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
      .subscribe((result: { event: Action; data: PaymentPlan }) => {
        if (String(result.event) === 'Coupon') {
          this.subscriptions.push(
            this.customerService
              .applyCouponCode(entity.externalReference, result.data.couponCode)
              .subscribe(
                (paymentPlan) => {
                  this.toast.success('Kortingscode is opgeslagen');
                  this.findPaymentPlanByCustomerExternalReference(this.customerExternalReference);
                },
                (error) => {
                  if (error.status === 404) {
                    this.toast.error('Kortingscode niet gevonden');
                  } else if (error.status === 400) {
                    this.toast.error('Kortingscode werkt niet. Dit kan verschillende redenen hebben');
                  } else {
                    this.toast.error('Kortingscode werkt niet. Error');
                  }
                }
              )
          );
        }
      });
  }

  private openUpdateStatusDialog(
    label: string,
    action: string,
    entity: Payment,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.paymentProperties,
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
      .subscribe((result: { event: Action; data: Payment }) => {
        if (result?.data) {
          this.subscriptions.push(
            this.customerService.patchPayment(result.data).subscribe(
              (payment) => {
                this.findPaymentsByCustomerExternalReference(this.customerExternalReference);
              }
            )
          );
        }
      });
  }

  public openAddEditNoteDialog(
    label: string,
    action: string,
    entity: Note,
    readonly: boolean = false
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.noteProperties,
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
      .subscribe((result: { event: Action; data: Note }) => {
        if (String(result.event) === "Edit") {
          this.subscriptions.push(
            this.customerService.editNote(result.data.id, result.data).subscribe(
              (note) => {
                this.findNotesByCustomerExternalReference(this.customerExternalReference);
              }
            )
          );
        } else if (String(result.event) === "Add") {
          this.subscriptions.push(
            this.customerService.createNote(this.customerExternalReference, result.data).subscribe(
              (note) => {
                this.findNotesByCustomerExternalReference(this.customerExternalReference);
              }
            )
          );
        }
      });
  }

  public openDeleteNoteDialog(
    label: string,
    action: string,
    entity: Note,
    readonly: boolean = true
  ): void {
    const formModel = this.dynamicModelGenerator.generateFromPropertyDefinitions(
      entity,
      this.noteProperties,
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
      .subscribe((result: { event: Action; data: Note }) => {
        if (String(result.event) === "Delete") {
          this.subscriptions.push(
            this.customerService.deleteNote(result.data.id).subscribe(
              (__) => {
                this.findNotesByCustomerExternalReference(this.customerExternalReference);
              }
            )
          );
        }
      });
  }

  private resetTables(): void {
    this.paymentPlans = null;
    this.payments = null;
    this.orders = null;
  }

  public findCustomer(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getByExternalReference(customerExternalReference).subscribe(
        (customer) => {
          customer.domainLink = `https://viteezy.nl/domain?reference=${customer.externalReference}`
          this.customers = [customer];
          this.customerProperties = this.createCustomerProperties();
          
        }
      ),
    ];
  }

  public findCustomerByEmail(): void {
    this.resetTables();
    this.subscriptions = [
      this.customerService.getByEmail(this.emailForm.value.email).subscribe(
        (customers) => {
          customers.forEach((customer) => {
            customer.domainLink = `https://viteezy.nl/domain?reference=${customer.externalReference}`
          });
          this.customers = customers;
          this.customerProperties = this.createCustomerProperties();
        }
      ),
    ];
  }

  public findCustomerByPhoneNumber(): void {
    this.resetTables();
    this.subscriptions = [
      this.customerService.getByPhoneNumber(this.phoneForm.value.phoneNumber).subscribe(
        (customers) => {
          customers.forEach((customer) => {
            customer.domainLink = `https://viteezy.nl/domain?reference=${customer.externalReference}`
          });
          this.customers = customers;
          this.customerProperties = this.createCustomerProperties();
        }
      ),
    ];
  }

  public findCustomerByPostcode(): void {
    this.resetTables();
    this.subscriptions = [
      this.customerService.getByPostcode(this.postcodeForm.value.postcode).subscribe(
        (customers) => {
          customers.forEach((customer) => {
            customer.domainLink = `https://viteezy.nl/domain?reference=${customer.externalReference}`
          });
          this.customers = customers;
          this.customerProperties = this.createCustomerProperties();
        }
      ),
    ];
  }

  public findCustomerByName(): void {
    this.resetTables();
    this.subscriptions = [
      this.customerService.getByName(this.nameForm.value.name).subscribe(
        (customers) => {
          customers.forEach((customer) => {
            customer.domainLink = `https://viteezy.nl/domain?reference=${customer.externalReference}`
          });
          this.customers = customers;
          this.customerProperties = this.createCustomerProperties();
        }
      ),
    ];
  }

  public findNotesByCustomerExternalReference(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getNotesByCustomerExternalReference(customerExternalReference).subscribe(
        (notes) => {
          this.customerService.getAllUsers().subscribe(
            (users) => {
              notes.forEach((note) => {
                note.name = users.filter(user => user.id === note.fromId)[0].firstName;
              });
              this.notes = notes;
              this.noteProperties = this.createNoteProperties();
            }
          )
        }
      ),
    ];
  }

  public findLoggingByCustomerExternalReference(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getLoggingByCustomerExternalReference(customerExternalReference).subscribe(
        (logging) => {
          this.logging = logging;
          this.loggingProperties = this.createLoggingProperties();
        }
      ),
    ];
  }

  public findPaymentPlanByCustomerExternalReference(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getPaymentPlanByCustomerExternalReference(customerExternalReference).subscribe(
        (paymentPlans) => {
          paymentPlans.forEach((paymentPlan) => {
            paymentPlan.translatedStatus = this.getPaymentPlanTranslatedStatus(paymentPlan.status);
          });
          this.paymentPlans = paymentPlans;
          this.paymentPlanProperties = this.createPaymentPlanProperties();
        }
      ),
    ];
  }

  public findPaymentsByCustomerExternalReference(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getPaymentsByCustomerExternalReference(customerExternalReference).subscribe(
        (payments) => {
          payments.forEach((payment) => {
            payment.sequenceType = this.getSequenceTypeTranslatedStatus(payment.sequenceType);
            payment.status = this.getPaymentTranslatedStatus(payment.status);
            payment.reason !== null ? payment.reason = this.getMollieChargebackReasonStatus(payment.reason) : payment.reason;
          });
          this.payments = payments;
          this.paymentProperties = this.createPaymentProperties();
        }
      ),
    ];
  }

  public findOrdersByCustomerExternalReference(customerExternalReference: string): void {
    this.subscriptions = [
      this.customerService.getOrdersByCustomerExternalReference(customerExternalReference).subscribe(
        (orders) => {
          this.customerService.getBlendsByCustomerExternalReference(customerExternalReference).subscribe(
            (blends) => {
              orders.forEach((order) => {
                order.shipToAnnex === null ? order.shipToAnnex = "" : order.shipToAnnex;
                order.address = `${order.shipToStreet} ${order.shipToHouseNo}${order.shipToAnnex}, ${order.shipToPostalCode} ${order.shipToCity} ${order.shipToCountryCode}`;
                order.translatedStatus = this.getOrderTranslatedStatus(order.status);
                order.sequenceType = this.getSequenceTypeTranslatedStatus(order.sequenceType);
                if (blends.filter(blend => blend.id === order.blendId).map(blend => blend.quizId)[0] > 0) {
                  order.blendLink = "https://viteezy.nl/blend?" + blends.filter(blend => blend.id === order.blendId).map(blend => blend.externalReference)[0];
                }
                if (order.trackTraceCode !== null) {
                  order.trackTraceCode = 'https://jouw.postnl.nl/track-and-trace/' + order.trackTraceCode + '-' + order.shipToCountryCode + '-' + order.shipToPostalCode;
                }
              });
              this.orders = orders;
              this.orderProperties = this.createOrderProperties();
            });
        }
      ),
    ];
  }

  private getPaymentPlanTranslatedStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'Nog niet betaald';
      case 'PENDING-SINGLE-BUY':
        return 'Nog niet betaald';
      case 'ACTIVE':
        return 'Actief';
      case 'PAID-SINGLE-BUY':
        return 'Eenmalig aankoop betaald';
      case 'STOPPED':
        return 'Zelf stopgezet';
      case 'CANCELED':
        return 'Door systeem stopgezet';
      case 'SUSPENDED':
        return 'Geblokkeerd';
      case 'COMPLETED':
        return 'Afgerond';
      default:
        return status;
    }
  }

  private getSequenceTypeTranslatedStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'FIRST':
        return 'Eerste';
      case 'RECURRING':
        return 'Terugkerend';
      default:
        return status;
    }
  }

  private getPaymentTranslatedStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'OPEN':
        return 'Open';
      case 'CANCELED':
        return 'Geannuleerd';
      case 'PENDING':
        return 'In afwachting';
      case 'AUTHORIZED':
        return 'Geautoriseerd';
      case 'EXPIRED':
        return 'Verlopen';
      case 'FAILED':
        return 'Mislukt';
      case 'PAID':
        return 'Betaald';
      case 'CHARGEBACK':
        return 'Chargeback';
      case 'REFUND':
        return 'Terugbetaling';
      default:
        return status;
    }
  }

  private getMollieChargebackReasonStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'AC01':
        return 'IBAN is niet juist of niet bekend';
      case 'AC04':
        return 'Rekening gesloten';
      case 'AC06':
        return 'Rekening is geblokkeerd';
      case 'AM04':
        return 'Onvoldoende saldo';
      case 'MD01':
        return 'Machtiging is ongeldig';
      case 'MD06':
        return 'Klant heeft gestorneerd';
      case 'MS02':
        return 'De klant heeft een automatische incasso geweigerd voordat deze verwerkt was';
      case 'MS03':
        return 'Overige redenen';
      case 'SL01':
        return 'De bank heeft de incasso geweigerd';
      default:
        return status;
    }
  }

  private getOrderTranslatedStatus(status: string): string {
    switch (status.toUpperCase()) {
      case 'CREATED':
        return 'Aangemaakt';
      case 'PACKING_SLIP_READY':
        return 'Kaart gemaakt';
      case 'SHIPPED_TO_PHARMACIST':
        return 'Verstuurd naar apotheker';
      case 'SHIPPED_TO_POSTNL':
        return 'Verstuurd naar PostNL';
      case 'SHIPPED_TO_CUSTOMER':
        return 'Verstuurd naar klant';
      case 'SHIPMENT_AT_PICK_UP_LOCATION':
        return 'Ligt bij PostNL Pakketpunt';
      case 'SHIPMENT_PICKED_UP':
        return 'Opgehaald bij PostNL Pakketpunt';
      case 'SHIPMENT_DELIVERED':
        return 'Bezorgd';
      case 'SHIPMENT_COLLECTED_BY_POSTNL':
        return 'Opgehaald door PostNL';
      case 'PACKAGE_LOST':
        return 'Pakket verloren';
      case 'CANCELED':
        return 'Geannuleerd';
      case 'ERROR':
        return 'Er is iets mis gegaan';
      case 'ERROR_PAYMENT':
        return 'Foutmelding: retry betaling';
      case 'ERROR_EMPTY_BLEND':
        return 'Foutmelding: De blend is leeg';
      case 'ERROR_PDF_TEMPLATE':
        return 'Foutmelding: de kaart';
      default:
        return status;
    }
  }

  private createCustomerProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'id',
        displayName: 'Klant ID',
        propertyType: 'number',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'email',
        displayName: 'E-mailadres',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'domainLink',
        displayName: 'Domein link',
        toolTip: 'Wanneer de klant via de shop of bundel heeft gekocht is er geen domein link beschikbaar',
        propertyType: 'string',
        htmlType: 'link',
        hidden: true
      },
      {
        propertyName: 'firstName',
        displayName: 'Voornaam',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'lastName',
        displayName: 'Achternaam',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'street',
        displayName: 'Straat',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'houseNumber',
        displayName: 'Huisnummer',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'houseNumberAddition',
        displayName: 'Huisnummertoevoeging',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'postcode',
        displayName: 'Postcode',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'city',
        displayName: 'Plaats',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'country',
        displayName: 'Land',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'phoneNumber',
        displayName: 'Telefoonnummer',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'referralCode',
        displayName: 'Referral code',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      }
    ];
  }

  private createNoteProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'id',
        displayName: 'ID',
        propertyType: 'number',
        htmlType: 'text',
        hiddenTable: true,
        hidden: true
      },
      {
        propertyName: 'name',
        displayName: 'Medewerker',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'message',
        displayName: 'Bericht',
        propertyType: 'textarea',
        htmlType: 'text'
      },
      {
        propertyName: 'creationTimestamp',
        displayName: 'Aangemaakt op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'modificationTimestamp',
        displayName: 'Laatse wijziging op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      }
    ];
  }

  private createLoggingProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'info',
        displayName: 'Gebeurtenis',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'creationTimestamp',
        displayName: 'Wanneer',
        propertyType: 'datetime',
        htmlType: 'text'
      }
    ];
  }

  private createPaymentPlanProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'id',
        displayName: 'Abonnement ID',
        propertyType: 'number',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'externalReference',
        displayName: 'Externe referentie',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'firstAmount',
        displayName: 'Eerste bedrag',
        propertyType: 'price',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'recurringAmount',
        displayName: 'Terugkerend bedrag',
        propertyType: 'price',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'translatedStatus',
        displayName: 'Status',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'stopReason',
        displayName: 'Stop reden',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'creationDate',
        displayName: 'Start datum',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'lastModified',
        displayName: 'Laatse wijziging op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'paymentDate',
        displayName: 'Incasso datum',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'deliveryDate',
        displayName: 'Levering datum',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'nextPaymentDate',
        displayName: 'Volgende incasso datum',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'nextDeliveryDate',
        displayName: 'Volgende levering datum',
        propertyType: 'date',
        htmlType: 'text',
        hidden: true
      }
    ];
  }

  private createPaymentPlanStatusProperties(): PropertyDefinition[] {
    const ddConfig = new DropDownModelConfig({
      multiple: false,
      options: [
        { label: 'Door systeem stopgezet', value: 'CANCELED' },
        { label: 'Zelf stopgezet', value: 'STOPPED' }
      ]
    });
    return [
      {
        propertyName: 'id',
        displayName: 'Abonnement ID',
        propertyType: 'number',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'status',
        displayName: 'Status',
        propertyType: 'dropdown',
        htmlType: 'text',
        propertyConfig: ddConfig
      },
    ];
  }

  private createPaymentPlanCouponProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'externalReference',
        displayName: 'Externe referentie',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true,
      },
      {
        propertyName: 'couponCode',
        displayName: 'Kortingscode',
        propertyType: 'string',
        htmlType: 'text',
      },
    ];
  }

  private createPaymentProperties(): PropertyDefinition[] {
    const ddConfig = new DropDownModelConfig({
      multiple: false,
      options: [
        { label: 'Verlopen', value: 'expired' },
        { label: 'Chargeback', value: 'chargeback' }
      ]
    });
    return [
      {
        propertyName: 'id',
        displayName: 'Betaling ID',
        propertyType: 'number',
        htmlType: 'text',
        readonly: true
      },
      {
        propertyName: 'amount',
        displayName: 'Bedrag',
        propertyType: 'price',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'molliePaymentId',
        displayName: 'Mollie betaling ID',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'retriedMolliePaymentId',
        displayName: 'Opnieuw geprobeerd mollie betaling ID',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'paymentPlanId',
        displayName: 'Abonnement ID',
        propertyType: 'number',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'creationDate',
        displayName: 'Aangemaakt op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'paymentDate',
        displayName: 'Betaald op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'lastModified',
        displayName: 'Laatse wijziging op',
        propertyType: 'datetime',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'status',
        displayName: 'Status',
        propertyType: 'dropdown',
        htmlType: 'text',
        propertyConfig: ddConfig
      },
      {
        propertyName: 'reason',
        displayName: 'Mollie chargeback reden',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      },
      {
        propertyName: 'sequenceType',
        displayName: 'Reeks type',
        propertyType: 'string',
        htmlType: 'text',
        hidden: true
      }
    ];
  }

  private createOrderProperties(): PropertyDefinition[] {
    return [
      {
        propertyName: 'orderNumber',
        displayName: 'Order nummer',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'pharmacistOrderNumber',
        displayName: 'Apotheker order nummer ',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'paymentId',
        displayName: 'Betaling ID',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'sequenceType',
        displayName: 'Reeks type',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'paymentPlanId',
        displayName: 'Abonnement ID',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'blendLink',
        displayName: 'Blend link',
        toolTip: 'Wanneer de klant geen quiz heeft (via shop of bundel) is er geen blend link beschikbaar',
        propertyType: 'string',
        htmlType: 'link',
      },
      {
        propertyName: 'recurringMonths',
        displayName: 'Aantal maanden',
        propertyType: 'number',
        htmlType: 'text'
      },
      {
        propertyName: 'shipToFirstName',
        displayName: 'Voornaam',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'shipToLastName',
        displayName: 'Achternaam',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'address',
        displayName: 'Adres',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'shipToPhone',
        displayName: 'Telefoonnummer',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'shipToEmail',
        displayName: 'E-mailadres',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'trackTraceCode',
        displayName: 'Track & trace',
        propertyType: 'string',
        htmlType: 'link',
      },
      {
        propertyName: 'translatedStatus',
        displayName: 'Status',
        propertyType: 'string',
        htmlType: 'text'
      },
      {
        propertyName: 'created',
        displayName: 'Aangemaakt op',
        propertyType: 'datetime',
        htmlType: 'text'
      },
      {
        propertyName: 'shipped',
        displayName: 'Verstuurd op',
        propertyType: 'datetime',
        htmlType: 'text'
      },
      {
        propertyName: 'lastModified',
        displayName: 'Laatse wijziging op',
        propertyType: 'datetime',
        htmlType: 'text'
      }
    ];
  }
}
