import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";
import { MyButtonComponent } from "../../reusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  standalone : true
})
export class ClientComponent implements OnInit {

  currentDate: Date = new Date();
  clientObj: Client = new Client();
  clientList: Client[] = [];
  cilentService = inject(ClientService);

  userList$: Observable<any> = new Observable<any>();
  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.cilentService.getAllUser();
  }

  loadClient() {
    this.cilentService.getAllClients().subscribe({
      next: (res: APIResponseModel) => {
        console.log("API Response:", res); 
        if (res.result && res.data) {
          this.clientList = res.data;
          console.log("Client List Updated:", this.clientList);
        } else {
          console.error("Error: No data returned from API", res);
        }
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }

  onSaveClient(data:string) {
    this.cilentService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("Client Added Successfully");
        this.loadClient();
        this.clientObj = new Client();
      } else {
        alert(res.message);
      }
    });
  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this client?");
    if (isDelete) {
    this.cilentService.deleteClientById(id).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("Client delete Successfully");
        this.loadClient();
      } else {
        alert(res.message);
      }
    });
  
    }
  }  
  onEdit(data:Client) {
    this.clientObj = data;


 }
}
