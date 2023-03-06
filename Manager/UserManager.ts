import {User} from "../model/User";
import {IUserManager} from "./IUserManager";
export class UserManager implements IUserManager<User>{
    private _users: User[] = []
    constructor() {
        let user1 = new User('dange1995', 'dange1995');
        let user2 = new User('dange1996', 'dange1996');
        let user3 = new User('dange1997', 'dange1997');
        this.addUser(user1);
        this.addUser(user2);
        this.addUser(user3);
    }


    get users(): User[] {
        return this._users;
    }

    set users(value: User[]) {
        this._users = value;
    }

    lockUser(accountname: string) {
        if (this.findIndexByAccountName(accountname) != -1) {
            this._users[this.findIndexByAccountName(accountname)].setlocked();
        }
    }

    unlockUser(accountname: string) {
        if (this.findIndexByAccountName(accountname) != -1) {
            this._users[this.findIndexByAccountName(accountname)].unlock();
        }
    }
    addUser(t: User): void {
        this._users.push(t);
    }

    getList() {
        return this._users;
    }
    findIndexByAccountName(accountname: string) {
        let index = -1;
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].accountname == accountname) {
                index = i;
            }
        }
        return index;
    }
}