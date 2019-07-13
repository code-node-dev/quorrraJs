"use strict"
module.exports = function (Status) {
    let status;
    switch (Status) {
        case 'Success':
            Status = 1;
            break;
        case 'Fail':
            status = 0;
            break;
        case 'Active':
            status = 1;
            break;
        case 'Inactive':
            status = 2;
            break;
        case 'Delete':
            status = 3;
            break;
        default:
            status = 1
    }
    return status
};