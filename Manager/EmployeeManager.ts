
import {Employee,typeEmployee,status} from "../model/Employee";
export class EmployeeManager{
    private _employeeList : Employee[]=[]

    constructor() {
        this._employeeList = [];
    }

    get employeeList(): Employee[] {
        return this._employeeList;
    }

    set employeeList(value: Employee[]) {
        this._employeeList = value;
    }

    add(employee:Employee){
        this.employeeList.push(employee)
    }
}