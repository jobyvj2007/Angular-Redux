import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as layout from '../actions/layout';
import { TranslateService } from '@ngx-translate/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router'

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <h1 translate>Title</h1>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (activate)="closeSidenav()" routerLink="/" icon="book" hint="View your book collection">
          My Items
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/book/find" icon="search" hint="Find your next book!">
          Browse Item
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/github/find" icon="search" hint="Find your next user!">
          Browse Users
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/github" icon="book " hint="View your users!">
          VIew Users
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/register" icon="book " hint="Register your users!">
          Register
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/animation" icon="book " hint="Register your users!">
          Animation
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/adduser" icon="book " hint="Add a user!">
          Add User
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/fetchuser" icon="book " hint="Add a user!">
          Show Users
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/editable" icon="book " hint="Add a user!">
          Editable form
        </bc-nav-item>
        
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Item Collection
      </bc-toolbar>
      <router-outlet></router-outlet>
      <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '15px' }"></ngx-loading>
    </bc-layout>
  `
})
export class AppComponent {

  showSidenav$: Observable<boolean>;
  user = {
      name: 'Arthur',
      age: 42
  };
  loading = false;
  constructor(private store: Store<fromRoot.State>, private translate: TranslateService, private router: Router) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
    });
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    translate.setDefaultLang('fr');
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
          this.loading = true;
          console.log("NavigationStart");
      }
      if (event instanceof NavigationEnd) {
          console.log("NavigationEnd");
          this.loading = false;
      }

      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
          console.log("NavigationCancel");
          this.loading = false;
      }
      if (event instanceof NavigationError) {
          console.log("NavigationError");
          this.loading = false;
      }
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }
}
