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