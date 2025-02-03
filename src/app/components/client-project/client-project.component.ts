import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.scss'
})
export class ClientProjectComponent implements OnInit {


  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("",[Validators.required,Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl("")
  });

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList:Client[] = [];

  firstName = signal("Angular 18");
  projectList = signal<ClientProject[]>([]);

  ngOnInit(): void {
    const name= this.firstName
    this.getAllEmployee();
    this.getAllClient();
    this.getAllClientProject();
      
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res:APIResponseModel) => {
      this.employeeList = res.data;
    });
  }
  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res:APIResponseModel) => {
      this.clientList = res.data;
    });
  }
  getAllClientProject() {
    this.clientSrv.getAllClientProject().subscribe((res:APIResponseModel) => {
      this.projectList.set(res.data);
    });
  }
  onDelete(arg0: any) {
  throw new Error('Method not implemented.');
  }
  onEdit(_t21: any) {
  throw new Error('Method not implemented.');
  }
  onSaveProject(){
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv.addClientprojectUpdate(formValue).subscribe((res:APIResponseModel) => {
      if(res.result){
        alert(res.message);
        this.projectForm.reset();
      } else {
        alert(res.message);
      }
    });
  }
  changeFnAme(){
    this.firstName.set("React Js 18");

  }

}
