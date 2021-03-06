import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from './book-authors';
import { BookDetailComponent } from './book-detail';
import { BookPreviewComponent } from './book-preview';
import { BookPreviewListComponent } from './book-preview-list';
import { BookSearchComponent } from './book-search';
import { LayoutComponent } from './layout';
import { NavItemComponent } from './nav-item';
import { SidenavComponent } from './sidenav';
import { ToolbarComponent } from './toolbar';
import { GithubUserSearchComponent } from './github-user-search';
import { GithubUserListComponent } from './github-user-list';
import { GithubUserPreviewComponent } from './github-user-view';
import { ShowUserListComponent } from './show-user';
import { SelectBoxComponent } from './selectbox.component';

import { PipesModule } from '../pipes';
import { LoadingModule } from 'ngx-loading';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  GithubUserSearchComponent,
  GithubUserListComponent,
  GithubUserPreviewComponent,
  ShowUserListComponent,
  SelectBoxComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    LoadingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
