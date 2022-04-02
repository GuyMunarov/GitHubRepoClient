import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksPageComponent } from './components/bookmarks-page/bookmarks-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterPageComponent } from './components/account/register-page/register-page.component';
import { AuthGuard } from './Shared/guards/auth.guard';
import { LoginPageComponent } from './components/account/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo:"browse",pathMatch: 'full'},
  {path: 'browse',component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginPageComponent},
  {path: 'register',component: RegisterPageComponent},
  {path: 'bookmarks',canActivate: [AuthGuard],component: BookmarksPageComponent},
  {path: '**',component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
