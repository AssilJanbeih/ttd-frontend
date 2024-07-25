import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeShellRoutingModule} from "./home-shell-routing.module";
import { HomeNavComponent } from '../home-nav/home-nav.component';
@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        HomeNavComponent,
        HomeShellRoutingModule,
    ]
})
export class HomeShellModule { }
