import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MasterService } from '../../services/master.service';
import { APIResponseModel, IDesignation } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
  isLoader: boolean = true;
  masterService = inject(MasterService);
  



  ngOnInit() {
    this.masterService.getDesignations().subscribe((result: APIResponseModel) => {
      console.log("Fetched Designations:", result.data);
      this.designationList = result.data;
      this.isLoader=false;
    }, error => {
      console.error("Error fetching designations:", error);
      this.isLoader=false;
    });
  }
}
