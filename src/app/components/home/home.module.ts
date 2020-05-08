import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HomeComponent } from '././home.component';
import { OrderComponent } from '././order/order.component';
import { VerifyComponent } from './verify/verify.component';
import { QueueComponent } from './queue/queue.component';
import { ResolveComponent } from './resolve/resolve.component';
import { ShippingComponent } from './shipping/shipping.component';
import { DashBoardComponent } from './dashboard/dashboard.component';

export const homeRouting: Routes = [
    {
      path: 'home',
      component: DashBoardComponent,
	  canActivate: [AuthGuard],
      children: [   
    { path: 'createorder', component: OrderComponent,canActivate: [AuthGuard]},
	{ path: 'verify', component: VerifyComponent,canActivate: [AuthGuard]},  
	{ path: 'queue', component: QueueComponent,canActivate: [AuthGuard]},  
	{ path: 'resolve', component: ResolveComponent,canActivate: [AuthGuard]},  
	{ path: 'shipping', component: ShippingComponent,canActivate: [AuthGuard]}      
    ]
	  },
];
  
  @NgModule({
    imports: [
      CommonModule,
      SharedModule,    
      RouterModule.forChild(homeRouting),
      ReactiveFormsModule
	  
    ],
    declarations: [
	HomeComponent,
	DashBoardComponent,
	OrderComponent,
	VerifyComponent,
	ShippingComponent,
	QueueComponent,
	ResolveComponent
	]    
  })
  export class HomeModule { }