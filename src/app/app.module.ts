import { NgModule, } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { ComponentsModule } from './components';
import { BookEffects } from './effects/book';
import { CollectionEffects } from './effects/collection';
import { GithubEffects } from './effects/github';
import { AddUserEffects } from './effects/add-user';

import { BookExistsGuard } from './guards/book-exists';

import { AppComponent } from './containers/app';
import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { FindGithubUserComponent } from './containers/find-github-user';
import { ViewGithubUserPageComponent } from './containers/view-github-users';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserPageComponent } from './containers/add-user';

import { GoogleBooksService } from './services/google-books';
import { GithubUserService } from './services/github-users';
import { AddUserService } from './services/add-user';
import { FetchUserPageComponent } from './containers/fetch-user';

import { routes } from './routes';
import { reducer } from './reducers';
import { schema } from './db';
import { RegisterComponent } from './register/register.component';
import { AnimationsComponent } from './animations/animations.component';
import { UserExistsGuard } from './guards/user-exists';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import { EditableComponent } from './editable/editable.component';
import { ChildComponent } from './editable/child.component';

import { FormsModule } from '@angular/forms';
//import { FirstTimeVisitorComponent, FrequentVisitorComponent } from './component-outlet/component-outlet.component';
import { ResolveTestService } from './services/resolve-test';
import { LoadingAnimateModule, LoadingAnimateService } from 'ng2-loading-animate';
import {BusyModule} from 'angular2-busy';
import { MyDirectiveDirective } from './editable/my-directive.directive';
import { DataService } from './services/data-service';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { ToolTipModule } from 'angular2-tooltip';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    InlineEditorModule,
    FormsModule,
    BusyModule,
    ToolTipModule,
    LoadingModule,
    BootstrapModalModule.forRoot({container:document.body}),
    //LoadingAnimateModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    HttpModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rotatingPlane,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),


    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(BookEffects),
    EffectsModule.run(CollectionEffects),
    EffectsModule.run(GithubEffects),
    EffectsModule.run(AddUserEffects),

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    DBModule.provideDB(schema),
  ],
  entryComponents: [
      ConfirmComponent
  ],
  declarations: [
    AppComponent,
    FindBookPageComponent,
    SelectedBookPageComponent,
    ViewBookPageComponent,
    CollectionPageComponent,
    NotFoundPageComponent,
    FindGithubUserComponent,
    ViewGithubUserPageComponent,
    RegisterComponent,
    AnimationsComponent,
    AddUserPageComponent,
    FetchUserPageComponent,
    EditableComponent,
    ChildComponent,
    //FirstTimeVisitorComponent,
    //FrequentVisitorComponent,
    MyDirectiveDirective,
    AutoCompleteComponent,
    ConfirmComponent
  ],
  providers: [
    BookExistsGuard,
    UserExistsGuard,
    GoogleBooksService,
    GithubUserService,
    AddUserService,
    ResolveTestService,
    DataService
    //LoadingAnimateService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
