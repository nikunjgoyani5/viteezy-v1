import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectService } from '@app/@core/object.service';
import { Action } from '../models/action';
import { IEntity } from '../models/entity';
import { PropertyDefinition } from '../models/property-definition';
import { TableEntity } from '../models/table-entity';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  // A row is generated for each item
  @Input() public entities: IEntity[] = [];
  @Input() public properties: PropertyDefinition[] = [];
  @Input() public rowActions?: Action[];
  @Input() public menuActions?: Action[];
  @Input() public rowClick?: Action;
  @Input() public pageSize?: number;
  @Input() public pageSizeOptions?: number[] = [20, 50, 100];
  @Input() public hoverEnabled = true;
  @Input() public filterEnabled = false;
  @Input() public showPaginator = true;
  @Input() public showHeader = true;
  @Input() public isLoading = false;
  @Output() public actionEmitter = new EventEmitter<{
    rowIndex: number;
    action: Action;
    entity: IEntity;
  }>();
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public tableItems: TableEntity[] = [];
  public dataSource = new MatTableDataSource<TableEntity>();
  public displayedColumns: string[] = [];
  public selectedRow: number;

  public constructor(private objectService: ObjectService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.entities &&
      changes.entities.currentValue &&
      changes.entities.currentValue !== changes.entities.previousValue
    ) {
      this.init(changes.entities.currentValue);
    }
  }

  public onRowClick(entity: IEntity, rowIndex: number): void {
    if (!this.rowClick) {
      return;
    }
    this.selectedRow = rowIndex;
    this.onAction(entity, rowIndex, this.rowClick);
  }
  public onAction(entity: IEntity, rowIndex: number, action: Action): void {
    this.actionEmitter.emit({ rowIndex, action, entity });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterArray = [...this.entities];
    this.init([
      ...this.objectService.filterByValue(filterArray, filterValue),
    ] as IEntity[]);
    this.paginator.firstPage();
  }

  public onPageChange(page: PageEvent): void {
    this.init(this.entities);
  }

  public onSortChanged(sort: Sort): void {
    this.init(
      this.entities.sort((a: IEntity, b: IEntity) =>
        this.objectService.sortFn(a, b, sort)
      )
    );
  }

  private init(entities: IEntity[]): void {
    if (this.paginator) {
      const pageNumber = this.paginator.pageIndex;
      const pageSize = this.paginator.pageSize;
      const pagedArr = entities.slice(
        pageNumber * pageSize,
        pageNumber * pageSize + pageSize
      );
      this.tableItems = this.getTableItems(pagedArr, this.properties);
    } else {
      this.tableItems = this.getTableItems(entities, this.properties);
    }

    this.dataSource = new MatTableDataSource(this.tableItems);
    this.displayedColumns = [
      ...this.properties.filter(propertie => !propertie.hiddenTable).map((x) => x.propertyName),
      ...(this.rowActions || this.menuActions ? ['actions'] : []),
    ];
  }
  private getTableItems(
    entities: IEntity[],
    propertyDefinitions: PropertyDefinition[]
  ): TableEntity[] {
    return entities.map((entity) => ({
      entity,
      properties: propertyDefinitions.reduce((displayItem: any, propDef) => {
        const value = this.getPropertyValue(entity, propDef);
        const actions = propDef.actions;
        displayItem[propDef.propertyName] = { value, actions };
        return displayItem;
      }, {}),
    }));
  }

  private getPropertyValue(
    entity: { [key: string]: any },
    propDef: PropertyDefinition
  ): string {
    if (propDef.getValue) {
      return propDef.getValue(entity);
    } else {
      const type = propDef.propertyType || typeof entity[propDef.propertyName];
      return this.objectService.getValueByType(
        entity[propDef.propertyName],
        type
      );
    }
  }
}
