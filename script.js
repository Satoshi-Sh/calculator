
function operate(operator,a,b){
    if (operator == "+"){
        return add(a,b);
    }
    else if (operator="-") {
        return subtract(a,b);
    }
    else if (operator="x"){
        return multiply(a,b);
    }
    else {
        return divide(a,b);
    }
}

// basic calculation functions
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a/b;
}

function multiply(a,b){
    return a * b; 
}

function divide(a,b){
    return a/b;
}