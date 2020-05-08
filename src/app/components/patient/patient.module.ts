import { PatientComponent } from './patient.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/auth/auth.guard';

const patientRouting: ModuleWithProviders = RouterModule.forChild([
    {
      path: 'patient',
      component: PatientComponent,
      canActivate: [AuthGuard]
    }
  ]);
  
  @NgModule({
    imports: [
      CommonModule,
      SharedModule,    
      patientRouting,
      ReactiveFormsModule
    ],
    declarations: [PatientComponent]    
  })
  export class PatientModule { }