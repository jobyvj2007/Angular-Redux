import { Routes } from '@angular/router';

import { BookExistsGuard } from './guards/book-exists';
import { UserExistsGuard } from './guards/user-exists';

import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { FindGithubUserComponent } from './containers/find-github-user';
import { ViewGithubUserPageComponent } from './containers/view-github-users';
import { RegisterComponent } from './register/register.component';
import { AnimationsComponent } from './animations/animations.component';
import { AddUserPageComponent } from './containers/add-user';
import { FetchUserPageComponent } from './containers/fetch-user';
import { EditableComponent } from './editable/editable.component';
//import { FirstTimeVisitorComponent } from './component-outlet/component-outlet.component';
import { ResolveTestService } from './services/resolve-test';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
  {
    path: 'book/find',
    component: FindBookPageComponent
  },
  {
    path: 'book/:id',
    canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: 'github/find',
    component: FindGithubUserComponent
  },
  {
    path: 'github',
    canActivate: [ UserExistsGuard ],
    component: ViewGithubUserPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'animation',
    component: AnimationsComponent
  },
   {
    path: 'adduser',
    component: AddUserPageComponent,
    resolve: {
      myBooks: ResolveTestService
    }
  },
  {
    path: 'fetchuser',
    component: FetchUserPageComponent,
    data: {
      myMessage: 'This is a prefetch data'
    }
  },
  {
    path: 'editable',
    component: EditableComponent
  },
  /*
  {
    path: 'outlet',
    component: FirstTimeVisitorComponent
  }*/
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
