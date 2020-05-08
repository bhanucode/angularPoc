import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted = false;
  user: User;
 
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user = new User(this.loginForm.value.userName,this.loginForm.value.password);
    console.log(this.user);
	this.login();
  }  
  
  login(){
    this.authService.login(this.user);
  }

}
