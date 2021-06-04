import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(register){
    
  }

}
