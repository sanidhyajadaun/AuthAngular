import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { CashSettlementComponent } from './cash-settlement/cash-settlement.component';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenInceptorService } from './token-inceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    CashSettlementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthService,AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
