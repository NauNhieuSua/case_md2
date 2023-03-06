
export type typeEmployee = 'fulltime' | 'parttime'
export type status = 'active' | 'inactive'
export class Employee {
    private _idEmployee : string;
    private _fullname : string;
    private _age: number;
    private _position: string;
    private _typeEmloyee : typeEmployee;
    private _status : status;

    private _controlStatus: boolean

    constructor(idEmployee: string, fullname: string, age: number, position: string, typeEmloyee: typeEmployee) {
        this._idEmployee = idEmployee;
        this._fullname = fullname;
        this._age = age;
        this._position = position;
        this._typeEmloyee = typeEmloyee;
        this._status = "active";
        this._controlStatus = true
    }


    get idEmployee(): string {
        return this._idEmployee;
    }

    set idEmployee(value: string) {
        this._idEmployee = value;
    }

    get fullname(): string {
        return this._fullname;
    }

    set fullname(value: string) {
        this._fullname = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get position(): string {
        return this._position;
    }

    set position(value: string) {
        this._position = value;
    }

    get typeEmloyee(): typeEmployee {
        return this._typeEmloyee;
    }

    set typeEmloyee(value: typeEmployee) {
        this._typeEmloyee = value;
    }

    get status(): status {
        return this._status;
    }

    set status(value: status) {
        this._status = value;
    }


    get controlStatus(): boolean {
        return this._controlStatus;
    }

    set controlStatus(value: boolean) {
        this._controlStatus = value;
    }

    changeStatus(controlStatus:boolean){
        if(controlStatus==true){
            this.status = "active"
        }else {
            this.status = "inactive"
        }
    }

    getinfo(){
        return` Mã nhân viên: ${this.idEmployee} | Tên nhân viên: ${this.fullname} | Tuổi : ${this.age} | Vị trí : ${this.position} | Loại nhân viên: ${this.typeEmloyee} | Trạng thái: ${this.status}`
    }
}
