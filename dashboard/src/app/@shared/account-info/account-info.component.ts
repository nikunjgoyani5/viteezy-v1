import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-account-info',
  templateUrl: 'account-info.component.html',
  styleUrls: ['account-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoComponent {
  @Input() public user: User;
  @Output() public logoutClick = new EventEmitter<void>();
  @Output() public changePasswordClick = new EventEmitter<void>();
  public showUserOptions = false;
}
