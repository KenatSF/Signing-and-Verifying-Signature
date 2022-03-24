

function checkingAddress(input_address) {
    if (!input_address || input_address.length != 42 || input_address.substring(0, 2) != '0x') {
        return "0x0000000000000000000000000000000000000000";
    } else {
        return input_address;
    }
}
function checkingMessage(input_message) {
    if (!input_message) {
        return "0x";
    } else {
        return input_message;
    }
}

function checkingNumbers(input_numbers) {
    if (!input_numbers || input_numbers <= 0) {
        return 0;
    } else {
        return input_numbers;
    }
}


module.exports = {  
    checkingAddress: checkingAddress, 
    checkingMessage: checkingMessage,
    checkingNumbers: checkingNumbers,
};