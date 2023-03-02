import {Employee,typeEmployee,status} from "./model/Employee";
import {EmployeeManager} from "./Manager/EmployeeManager";

// @ts-ignore
let input = require('readline-sync')
let employeeList = new EmployeeManager()
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
let status:status = input.question("Enter Employee's status: ")
let idEmployee = input.question("Enter Employee's idEmloyee: ")
    if(compareIdEmployee(idEmployee)==null){
        console.log(`---ID Employee đã tồn tại---`)
    }else {
        let employee = new Employee(idEmployee,name,age,position,typeEmloyee,status)
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
    let statusEdit: status = input.question('Enter Status edit: ')
    let idEmployeeEdit= input.question('Enter idEmployee edit: ')
    if(idEmployeeEdit==employee.idEmployee){
        let employeeEdit = new Employee(idEmployeeEdit,nameEdit,ageEdit,positionEdit,typeEmployeeEdit,statusEdit)
        employeeList.employeeList.splice(index,1,employeeEdit)
    }else {
        employeeList.employeeList.splice(index,1)
        if(compareIdEmployee(idEmployeeEdit)==null){
            console.log(`---ID Employee đã tồn tại---`)
        }else {
            let employeeEdit = new Employee(idEmployeeEdit,nameEdit,ageEdit,positionEdit,typeEmployeeEdit,statusEdit)
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
    let statusChange:status = input.question('Enter change Status: ')
    employee.status = statusChange
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


MainMenu()