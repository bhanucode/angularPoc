import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/models/patient.model';
import { Pagination } from 'src/app/shared/models/base/pagination.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  
  patientForm: FormGroup;
  submitted = false;
  id: number;
  patient: Patient;
  patients:Patient[]=[];
  pagination: Pagination<Patient>;
  errors: Object = {};
  message: string;
  cssClass: string;
  alerts: any = [];
  filters: any = {
    name: '',
    page: 0,
    sort: 'name',
    size: 10
  };
  
  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
     this.patientService.getAll().subscribe((data: Patient[])=>{
      console.log(data);
      this.patients = data;
    })  
    this.patientForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  get fullName() { return this.patientForm.get('fullName'); }
  get email() { return this.patientForm.get('email'); }
  get telephone() { return this.patientForm.get('telephone'); }
  get gender() { return this.patientForm.get('gender'); }

  cancel(cleanMessage: boolean){
    this.id = null;
    this.patientForm.reset();
    this.submitted = false;
    if(cleanMessage){
      this.message = null;
    }  
  }

  reloadPage(msg: string, css: string){
    this.cssClass = css        
    this.message = msg;
    this.loadPatients();
    setTimeout(()=>{ 
      this.message = null;
    }, 3000);
  }
  
  loadPatient(id: number){
    this.message = null;
    this.id = id;
    this.patientService
      .load(id)
      .subscribe(
        patient =>  this.updateValues(patient)
      );
  }

  updateValues(patient: Patient) {
    this.patientForm.setValue({
      fullName: patient.name,
      email: patient.email,
      telephone: patient.telephone,
      gender: patient.sex
    });
  }
  
  loadPatients(page: number = 0) {    
    this.filters.page = page;
    this.patientService
      .loadAll(this.filters)
      .subscribe(
        pagination => this.pagination = pagination,
        error => this.message =  error.message
      );      
  }

  pageChanged(event: any) {
    this.loadPatients(event.page);
  }

  savePatient(){
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    }
    this.buildPatient(null);
    this.patientService.create(this.patientForm.value)
      .subscribe(
        patient => { 
          this.reloadPage('Save patient successfully','alert alert-success');
          this.cancel(false);
        },
        error => {
          this.errors = error.fieldErrors
        }
    );
  }

  buildPatient(id: number){
    this.patient = new Patient(id,this.patientForm.value.fullName,this.patientForm.value.email,this.patientForm.value.telephone,this.patientForm.value.gender);
  }
  
  updatePatient(){
    this.submitted = true;
    if (this.patientForm.invalid) {
      return;
    }
    this.buildPatient(this.id);
    this.patientService.update(this.patient,this.id)
      .subscribe(
        patient => {        
          this.reloadPage('Update patent successfully','alert alert-success');
          this.cancel(false);
        },
        error => {
          this.errors = error.fieldErrors
        }
      );
  }

  deletePatient(id: number){
    this.patientService.delete(id)
    .subscribe(
      patient => {
        this.reloadPage('delete patient sucessfully','alert alert-success');
        this.cancel(false);
      },
      error => {
        this.errors = error.fieldErrors
      }
    );
  }
  
}
