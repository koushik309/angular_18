export interface IRole {
    roleId: number;
    role: string;
}

export interface APIResponseModel {
    result: boolean
    message: string;
    data: any;
}

export interface IDesignation {
    designationId: number;
    designation: string;
}

export interface Employee {
    empName: string;
    empId: number;
    empCode: string;
    empemailId: string;
    empDesignation: string;
    role: string;
}

export interface ClientProject {
  empName : string;
  empId: number;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  projectName: string;
  startDate: Date;
  expectedEndDate: Date;
  clientName: string;
  clientProjectId: number;

}