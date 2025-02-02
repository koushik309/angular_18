import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {APIResponseModel, IRole } from '../../model/interface/role';


@Component({
  selector: 'app-roles',
  standalone: true, // Add this if using a standalone component
  imports: [CommonModule, FormsModule], // Ensure CommonModule is imported
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roleList: IRole[] = [];

  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res: APIResponseModel) => {
        this.roleList = res.data;
      })
  }
  
  
}

//  firstName: string = 'John';
//  angularVersion = "Version 19";
//  version: number = 19;
//  isDisabled: boolean = true;
//  currentDate: Date = new Date();
//  inputType = "button";
//  selectedState: string = "";

//  showWelcomeAlert() {
//    alert("Welcome to Angular 19 Tutorial");
//  }
//  showMessage(Message: string) {
//    alert(Message);
//  }


