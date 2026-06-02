import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Action } from '../models/action';
import { IEntity } from '../models/entity';

@Component({
  selector: 'app-action-buttons',
  templateUrl: 'action-buttons.component.html',
  styleUrls: ['action-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonsComponent {
  // Menuactions under the more-actions icon.
  @Input() public menuActions: Action[] = [];
  // RowActions will be shown on hover for each row.
  @Input() public rowActions: Action[] = [];
  @Input() public showCloseButton = false;
  @Input() public entity?: IEntity;
  @Output() public selectedAction = new EventEmitter<Action>();

  public getActiveMenuActions(entity: IEntity): Action[] {
    if (!this.menuActions) {
      return [];
    }
    return this.menuActions.filter(
      (action) => !action.guard || action.guard(entity)
    );
  }

  public getActiveRowActions(entity: IEntity): Action[] {
    if (!this.rowActions) {
      return [];
    }
    // Only show actions which pass the guard (if any)
    return this.rowActions.filter(
      (action) => !action.guard || action.guard(entity)
    );
  }

  public getActionTooltip(tooltip: string): string | undefined {
    if (!tooltip) {
      return undefined;
    }
    return tooltip;
  }

  // When an action is clicked
  public onAction(action: Action, event?: Event): void {
    this.selectedAction.next(action);
    if (event) {
      event.stopPropagation();
    }
  }
}
