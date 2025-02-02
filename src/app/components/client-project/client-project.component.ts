import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee } from '../../model/interface/role';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports:  [FormsModule,CommonModule, ReactiveFormsModule],
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
  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllClient();
      
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

  clientList: any;
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

}
