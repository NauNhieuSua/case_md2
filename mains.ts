import {Employee,typeEmployee,status} from "./model/Employee";
import {EmployeeManager} from "./Manager/EmployeeManager";
import {User} from "./model/User";
import {UserManager} from "./Manager/UserManager";
import {IUserManager} from "./Manager/IUserManager";
// @ts-ignore
let input = require('readline-sync')
let employeeList = new EmployeeManager()
let adminName = 'admin1234'
let adminpassWord = 'admin1234'
let userlist = new UserManager()
function showLogin() {
    let choice = -1;
    do {
        console.log(`
        ------**--Welcome to the Skywalker store--**------
        1.Admin.
        2.User.
        0.Log Out`)
        choice = +input.question('Enter choice: ')
        switch (choice) {
            case 1:
                checkAdminAccount();
                break;
            case 2:
                showUserMenu()
                break;
        }
    } while (choice != 0)
}

function showUserMenu() {
    let choice = -1;
    do {
        console.log(`
        1.Create New User Account.
        2.Login.
        0.Exit.`)
        choice = +input.question('Enter choice: ')
        switch (choice) {
            case 1:
                creatUserAcount()
                break;
            case 2:
                checkUserAcount()
                break;
        }
    } while (choice != 0)
}

function creatUserAcount() {
    let regexusername = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let regexuserpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let username = '';
    let userpassword = '';
    let flag = true;
    do {
        username = input.question('Create User account (4 characters - 4 numbers): ')
        userpassword = input.question('Create User password (4 characters - 4 numbers): ')
        if (regexusername.test(username)) {
            if (regexuserpassword.test(userpassword)) {
                flag = true;
                console.log(('Đăng kí thành công!'))
                let users = new User(username, userpassword)
                userlist.addUser(users);
            }
        } else {
            console.log(('Không đúng cú pháp xin mời nhập lại.'))
            flag = false;
        }
    } while (!flag)
}

function getElementUserName(username) {
    for (let i = 0; i < userlist.getList().length; i++) {
        if (username == userlist.getList()[i].accountname) {
            return true;
        }
    }
    return false;
}

function getElementUserPassword(password) {
    for (let i = 0; i < userlist.getList().length; i++) {
        if (password == userlist.getList()[i].password) {
            return true;
        }
    }
    return false;
}

function checkUserAcount() {
    let regexusername = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let username = '';
    let password = '';
    let flag = true;
    do {
        username = input.question('Enter User account: ')
        password = input.question('Enter Password account: ')
        if (regexusername.test(username) && getElementUserName(username)) {
            for (let i = 0; i < userlist.users.length; i++) {
                if (userlist.users[i].isLocked == true) {
                    flag = false
                }
            }
                    if (regexpassword.test(password) && getElementUserPassword(password)) {
                        flag = true;
                        console.log(('Đăng nhập thành công!'))
                        if (flag) {
                            MainMenu()
                        }
                    }

        } else {
            console.log(('Sai tên tài khoản hoặc mật khẩu.'))
            flag = false;
        }
    } while (!flag)
}

function checkAdminAccount() {
    let regexusername = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let adminname = '';
    let flag = true;
    do {
        adminname = input.question('Enter admin account : ')
        if (regexusername.test(adminname)) {
            flag = true;
            if (flag && adminname == adminName) {
                console.log(('Xin mời nhập mật khẩu admin!'))
                checkPasswordAdmin()
            }
        } else {
            console.log(('Sai tên tài khoản hoặc mật khẩu.'))
            flag = false;
        }
    } while (!flag)
}
function checkPasswordAdmin() {
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let password = '';
    let flag = true;
    do {
        password = input.question('Enter password : ')
        if (regexPassword.test(password)) {
            console.log(('Đăng nhập thành công !'))
            flag = true;
            if (flag) {
                mainAdmin()
            }
        } else {
            console.log(('Xin mời nhập lại!'))
            flag = false;
        }
    } while (!flag)
}
function mainAdmin(){
    let choice = -1
    do {
        console.log(`
    ----Menu Admin---
    1.Show Users
    2.Change status 0f User
    0.Thoát
    
    `)
        choice = +input.question('Enter choice: ')
        switch (choice){
            case 1:
                getListUser()
                break;
            case 2:
                break;
        }
    }while (choice!=0)
}

function getListUser() {
    let users = userlist.getList()
    for (const usersKey in users) {
        console.log(users[usersKey].getInfo())
    }
}

function changeStatusUser(){
    console.log(`
    1.Active User
    2.Inactive User
    `)
    let choice = -1
    choice =+input.question('Enter choice: ')
    switch (choice){
        case 1:
            userlist
            break;
        case 2:
            break;

    }
}

function MainMenu(){
    let choice = -1
    do{
        console.log(`
        -----Main Menu-----
        1.Thêm mới nhân viên
        2.Tìm kiếm nhân viên
        3.Sửa thông tin nhân viên
        4.Thay đổi trạng thái nhân viên
        5.Phân loại nhân viên
        6.Thông tin tài khoản
        0. Đăng xuất
        `)
        choice =+input.question('Enter choice: ')
        switch (choice){
            case 1:
                addEmployee()
                break;
            case 2:
                searchByName()
                break;
            case 3:
                showListEmployee()
                break;
            case 4:
                showListEmployeeByName()
                break;
            case 5:
                mainFilter()
                break;
            case 6:

                break;
        }

    }while (choice!=0)
}

function addEmployee(){
let name = input.question("Enter Employee's name: ")
let age = input.question("Enter Employee's age: ")
let position = input.question("Enter Employee's positon: ")
let typeEmloyee:typeEmployee = input.question("Enter Employee's type Employee: ")
let idEmployee = input.question("Enter Employee's idEmloyee: ")
    if(compareIdEmployee(idEmployee)==null){
        console.log(`---ID Employee đã tồn tại---`)
    }else {
        let employee = new Employee(idEmployee,name,age,position,typeEmloyee)
        employeeList.add(employee)
    }
}

function compareIdEmployee(idEmployee){
    let check = true
    if (employeeList.employeeList.length == 0) {
        return idEmployee
    } else if (employeeList.employeeList.length > 0) {
        for (let i = 0; i < employeeList.employeeList.length; i++) {
            if (employeeList.employeeList[i].idEmployee == idEmployee) {
                check = false
                break;
            }
        }
        if (check) {
            return idEmployee
        } else {
            return null
        }
    }
}

function searchByName(name:string= input.question('Enter name need search: ')){
    let check = 0
    let menu = `----Menu list Employee's name has characte :${name} \n`
    for (let i = 0; i < employeeList.employeeList.length; i++) {
        if(employeeList.employeeList[i].fullname.includes(name)){
            menu+=`${employeeList.employeeList[i].getinfo()}\n`
            check++
        }
    }
    if(check==0){
        console.log(`---No Employee's name have character: ${name}---`)
    }else {
        console.log(menu)
    }
}

function showListEmployee(){
let menu = `----List Employee-----\n`
    for (let i = 0; i < employeeList.employeeList.length; i++) {
        menu+=`${i+1}.${employeeList.employeeList[i].getinfo()} \n`
    }
   menu += '0.Thoát'
    console.log(menu)
let choice =+input.question('Enter choice:')
    if(choice==0){
        MainMenu()
    }else if(choice > employeeList.employeeList.length){
        console.log(`---No choice ${employeeList.employeeList.length}----- `)
    }else {
        editEmployee(employeeList.employeeList[choice-1],(choice-1))
    }
}
function editEmployee(employee:Employee,index){
    let nameEdit = input.question('Enter name edit: ')
    let ageEdit = +input.question('Enter age edit: ')
    let positionEdit = input.question('Enter position edit: ')
    let typeEmployeeEdit:typeEmployee = input.question('Enter type Employê edit: ')
    let idEmployeeEdit= input.question('Enter idEmployee edit: ')
    if(idEmployeeEdit==employee.idEmployee){
        let employeeEdit = new Employee(idEmployeeEdit,nameEdit,ageEdit,positionEdit,typeEmployeeEdit)
        employeeList.employeeList.splice(index,1,employeeEdit)
    }else {
        employeeList.employeeList.splice(index,1)
        if(compareIdEmployee(idEmployeeEdit)==null){
            console.log(`---ID Employee đã tồn tại---`)
        }else {
            let employeeEdit = new Employee(idEmployeeEdit,nameEdit,ageEdit,positionEdit,typeEmployeeEdit)
            employeeList.employeeList.splice(index,0,employeeEdit)
        }
    }
}

function showListEmployeeByName(name:string= input.question('Enter name need filter: ')){
    let check = 0
    let menu = `----Menu list Employee's name has characte :${name}\n`
    for (let i = 0; i < employeeList.employeeList.length; i++) {
        if(employeeList.employeeList[i].fullname.includes(name)){
            menu+=`${i+1}. ${employeeList.employeeList[i].getinfo()}\n`
            check++
        }
    }
    menu+=`0.Thoát`
    if(check==0){
        console.log(`---No Employee's name have character: ${name}`)
    }else {
        console.log(menu)
    }
    let choice =+input.question('Enter choice:')
    if(choice==0){
        MainMenu()
    }else if(choice > employeeList.employeeList.length){
        console.log(`---No choice ${employeeList.employeeList.length}----- `)
    }else {
        changeStatus(employeeList.employeeList[choice-1])
    }
}

function changeStatus(employee:Employee){
    console.log(`
    1.Active Employee
    2.Inactive Employee
    `)
    let choice = -1
    choice =+input.question('Enter choice: ')
    switch (choice){
        case 1:
            employee.controlStatus = true
            employee.changeStatus(employee.controlStatus)
            console.log(`---Complete Active----`)
            break;
        case 2:
            employee.controlStatus = false
            employee.changeStatus(employee.controlStatus)
            console.log(`---Complete Inactive----`)
            break;
    }
}

function mainFilter(){
    let choice =-1
    do {
        console.log(`
        -----Main menu phân loại----
        1.Danh sách nhân viên làm fulltime
        2.Danh sách nhân viên làm parttime
        0.Thoát
        `)
        choice=+input.question('Enter choice: ')
        switch (choice){
            case 1:
                filterFullTime()
                break;
            case 2:
                filterPartTime()
                break;
        }

    }while (choice!=0)
}

function filterFullTime(){
    let menu = `----Danh sách nhân viên làm full time---\n`
    let fulltimeList = employeeList.employeeList.filter((employee)=>{
        return employee.typeEmloyee == "fulltime"
    })
    for (let i = 0; i < fulltimeList.length; i++) {
        menu+=`${i+1}.${fulltimeList[i].getinfo()}\n`
    }
    console.log(menu)
}

function filterPartTime(){
    let menu = `----Danh sách nhân viên làm part time---\n`
    let fulltimeList = employeeList.employeeList.filter((employee)=>{
        return employee.typeEmloyee == "parttime"
    })
    for (let i = 0; i < fulltimeList.length; i++) {
        menu+=`${i+1}.${fulltimeList[i].getinfo()}\n`
    }
    console.log(menu)
}



showLogin()