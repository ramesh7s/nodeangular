import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  response: any = [];
  errorMsg: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private _login:LoginService) { }

  ngOnInit() {
  	this.angForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password:  new FormControl('', Validators.compose([Validators.required])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: '* Email id is required.' },
      { type: 'pattern', message: 'Invalid Email id!' }
    ],
    'password': [
      { type: 'required', message: '* Password is required.' }
    ],
  }
  
  onSubmit(data){
  	this._login.loginUser(data).subscribe(res => {
      this.response = res;
      //console.log(this.response)
      localStorage.setItem('nodetoken',this.response.token);
      localStorage.setItem('isLoggedin',"login");
      this.router.navigate(['dashboard']);
    }, error => {
      console.log(error.status);
      if(error.status == 401){
        this.errorMsg = true;
      }
    })
  }

  alertclose(){
    this.errorMsg = false;
  }
}
