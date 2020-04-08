import {Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../../../core/auth/auth-service/auth.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

  public title: string;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.getUrl();
    this.setIcons();
    this.getRouterTitle();
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('home', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/home.svg'));
    this.iconRegistry.addSvgIcon('doc', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/doc.svg'));
    this.iconRegistry.addSvgIcon('user', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/user.svg'));
    this.iconRegistry.addSvgIcon('org', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/org.svg'));
    this.iconRegistry.addSvgIcon('info', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/info.svg'));
  }

  public getRouterTitle(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.findPageName(event.url);
      });
  }

  public getUrl(): void {
    this.findPageName(this.router.url);
  }

  public findPageName(name: string): void {
    if (name.slice(6).includes('home')) {
      this.title = 'home';
    } else if (name.slice(6).includes('documents')) {
      this.title = 'documents';
    } else if (name.slice(6).includes('organizations')) {
      this.title = 'organizations';
    } else if (name.slice(18).includes('assignments')) {
      this.title = 'assignments';
    } else if (name.slice(10).includes('profile')) {
      this.title = 'profile';
    } else if (name.slice(6).includes('users')) {
      this.title = 'users ';
    }
  }

  public logOut(): void {
    this.auth.logOut();
  }

}
