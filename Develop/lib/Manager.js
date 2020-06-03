// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Manager extends Employee {

    constructor(name, managerID, managerEmail, managerOffice) {
        super(name, managerEmail, managerID);
        this.managerOffice = managerOffice;
    }
    getRole() {
        return "Manager";

    }
    getOfficeNum() {
        return this.managerOffice;
    }
}

module.exports = Manager;
