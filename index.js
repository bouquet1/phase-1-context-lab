function createEmployeeRecord(employeeData) {
    const records = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return records
}

function createEmployeeRecords(employeeArray) {
    //const employeeRecords = [];
    return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const employeeObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0],
    }
    this.timeInEvents[this.timeInEvents.length] = employeeObj;
    return this;
}

function createTimeOutEvent(dateStamp) {
    const employeeObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0],
    }
    this.timeOutEvents[this.timeOutEvents.length] = employeeObj;
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(timeIn => timeIn.date === date).hour / 100;
    const timeOutEvent = this.timeOutEvents.find(timeOut => timeOut.date === date).hour / 100;
    return timeOutEvent - timeInEvent;
}

function wagesEarnedOnDate(date) {
    let wages = (hoursWorkedOnDate.call(this, date) * (this.payPerHour));
    return wages;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(srcArray => srcArray.firstName === firstName);
}

function calculatePayroll(employeeRecordsArr) {
    let sum = 0;
    for(let i = 0; i < employeeRecordsArr.length; i++){
        sum += allWagesFor.call(employeeRecordsArr[i]);
    }
    return sum;
}