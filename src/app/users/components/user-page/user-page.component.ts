import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {ActivatedRoute} from '@angular/router';
import {DocumentsService} from '../../../services/documents.service';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {AssignModalComponent} from '../../../shared/modals/assign-modal/assign-modal.component';
import {AssignedComponent} from '../../../shared/modals/assigned/assigned.component';
import {SpinnerService} from 'src/app/shared/services/spinner.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public userId: string;
  public user;
  reloadOnAssigning = false;

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private iconRegistry: MatIconRegistry,
              private spinner: SpinnerService,
              private documentsService: DocumentsService,
              public dialog: MatDialog) {
  }


  ngOnInit() {
    this.setIcons();
    this.route.params
      .subscribe((params) => {
        const id = params['id'] === 'profile' ? null : +params['id'];
        this.getUserById(id);
      });
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('arr-down', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-down.svg'));
    this.iconRegistry.addSvgIcon('arr-left', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/left-arrow.svg'));
  }

  public getUserById(id): void {
    this.spinner.show();
    this.userService.getUserById(id).subscribe((data) => {
      this.user = data['message'];
      this.spinner.hide();
    });
  }


  public openDialog(e): void {
    const dialogRef = this.dialog.open(AssignModalComponent, {
      width: '90%',
      data: {
        step: 0,
        onlyAssign: true,
        users: [this.user]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadOnAssigning = true;
      setTimeout(() => this.reloadOnAssigning = false, 200);
      this.ngOnInit();
      if (result) {
        this.dialog.open(AssignedComponent, {
          width: '600px'
        });
      }
    });
  }

  public isSimpleUser(): boolean {
    return localStorage.getItem('User-Role') === 'ROLE_SIMPLE_USER';
  }

  public isUserAdminOrModerator(): boolean {
    return this.user.userRole === 'ADMINISTRATOR' || this.user.userRole === 'ORGANIZATION_MODERATOR';
  }

}
