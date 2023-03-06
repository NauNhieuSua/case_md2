
import {status} from "./Employee";

export class User {
    private _accountname: string;
    private _password: string;
    _isLocked: boolean = false
    private _statusUser: status = "active"

    constructor(accountname: string, password: string) {
        this._accountname = accountname;
        this._password = password;
    }


    get statusUser(): status {
        return this._statusUser;
    }

    set statusUser(value: status) {
        this._statusUser = value;
    }

    get isLocked(): boolean {
        this.statusUser = "inactive"
        return this._isLocked;
    }
    get accountname(): string {
        return this._accountname;
    }
    setlocked(): void {
        this._isLocked = true;
        this.statusUser = "active"
    }
    unlock(): void {
        this._isLocked = false;
    }

    set accountname(value: string) {
        this._accountname = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    getInfo() {
        return `Account name: ${this.accountname} Password: ${this.password} Status : ${this.statusUser}`
    }
}