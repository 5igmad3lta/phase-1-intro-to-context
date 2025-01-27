function createEmployeeRecord(array) {
return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
}
}

function createEmployeeRecords(arrayOfArrays) {
let employeeRecords = arrayOfArrays.map(createEmployeeRecord)
return employeeRecords;
}

function createTimeInEvent(employee, dateStamp) {
let [date, hour] = dateStamp.split(' ');
employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
});
return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee
}
function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    if (timeInEvent.hour && timeOutEvent.hour) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
        } else {
        return 0;
    }
}

function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return employee.payPerHour * hoursWorked
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}




const testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
]

console.log(twoRows.map(createEmployeeRecord));
console.log(createTimeInEvent(testEmployee, "2024-6-24 0800"))
