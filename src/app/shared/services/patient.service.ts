import { Injectable } from '@angular/core';

import { Patient } from '../models/patient.model';
import { ResourceService } from './base/resource.service';

@Injectable()
export class PatientService extends ResourceService<Patient> {
  
  getPath(): string {
    return '/patient';
  }

}
