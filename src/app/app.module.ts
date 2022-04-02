import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './shared/text-input/text-input.component';
import { JwtInterceptor } from './Shared/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './Shared/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './Shared/interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/account/register-page/register-page.component';
import { LoginPageComponent } from './components/account/login-page/login-page.component';
import { PagerComponent } from './components/pager/pager.component';
import { RepoGalleryComponent } from './components/repo-gallery/repo-gallery.component';
import{BookmarksPageComponent} from './components/bookmarks-page/bookmarks-page.component'
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TextInputComponent,
    NotFoundComponent,
    MainPageComponent,
    RepoItemComponent,
    PagerComponent,
    RepoGalleryComponent,
    BookmarksPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', preventDuplicates: true}),
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    MatPaginatorModule
    
    
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi: true},{provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},{provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
