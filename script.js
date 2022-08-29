const output = document.querySelector('.output-div');

let numbers = []
let operatorsArray = []

// keyboard support 

window.addEventListener('keydown', function(e) {
    let id = ''
    if (e.key in [0,1,2,3,4,5,6,7,8,9]){
        
        if (e.key==0){
            id = 'zero';
        }
        else if (e.key==1){
            id = 'one';
        }
        else if (e.key==2){
            id = 'two';
        }
        else if (e.key==3){
            id = 'three';
        }
        else if (e.key==4){
            id = 'four';
        }
        else if (e.key==5){
            id = 'five';
        }
        else if (e.key==6){
            id = 'six';
        }
        else if (e.key==7){
            id = 'seven';
        }
        else if (e.key==8){
            id = 'eight';
        }
        else if (e.key==9){
            id = 'nine';
        }
        
    } else if ("+-/*x÷=.".includes(e.key)){
        if (e.key =="*" | e.key=="x"){
            id= "times"
        } else if (e.key=="/"|e.key=="÷"){
             id = "divide"
        }
        else if (e.key=="+"){
            id ="plus"
       }
       else if (e.key=="-"){
        id = "minus"}
       else if (e.key=="="){
        id= 'equal'
       }
       else if (e.key=='.'){
        id='dot'
       }
   }
    
    else if (e.key =='Backspace') {
        if (output.innerText.length>0){
            id='del'
            }
    } else if (e.key =='Delete'){
        id = 'clear'
    }
    if (id !=''){
    this.document.querySelector(`#${id}`).click()
    }
})


// add trigger to buttons 
const buttons = document.querySelectorAll('button');


buttons.forEach(button =>{
    button.onclick = display
})

function display(e){
    if (e.target.innerText=='clear'){
        //remove all 
        output.innerText='';
        numbers = [];
        operatorsArray = [];

    }
    else if (e.target.innerText=='Del'){
        if (output.innerText.length>0){
        if (!"+-x÷".includes(output.innerText.at(-1))){
        output.innerText= output.innerText.substring(0,output.innerText.length -1)
        }
        }
    }
    else if (e.target.innerText=='='){
        if (numbers.length>0){
            output.innerText += e.target.innerText;
        }
    }
    else if (e.target.innerText=='.'){
        const number = output.innerText.split(/[x\-\+\=÷]/g).at(-1);
        if (! number.includes('.')){
        output.innerText += e.target.innerText;}
    }
    else {
    output.innerText += e.target.innerText;
    }
}

// add trigger for operators keep numbers and operators

const operators = document.querySelectorAll('.operator');
operators.forEach(operator=>
    operator.addEventListener('click',record))


function record (e){
    // split operators and take the last element as number to record

    const array = output.innerText.split(/[x\-\+\=÷]/g)
    
    if (e.target.innerText!="="){
    operatorsArray.push(e.target.innerText)
    numbers.push(parseFloat(array.at(-2)))}

    if (e.target.innerText=="=" & numbers.length>0){
    operatorsArray.push(e.target.innerText)
    numbers.push(parseFloat(array.at(-2)));
    const answer = calculate(numbers,operatorsArray)
    if (!isFinite(answer)) {
        output.innerText ='Error: Divided by 0.'
    }
    else {  
    output.innerText += rounding(answer);}    
    }
}

function calculate(numbers,opes){
    let answer = numbers[0];

    for (let i=1;i<numbers.length;i++){
        answer = operate(opes[i-1],answer,numbers[i])
    }
    return answer;
} 

// for numbers with long decimal point 

function rounding(number){
    if (countDecimals(number)>2){
        return round(number)
    }
    return number
}

function countDecimals(number){
    let string = number.toString()
    if (string.includes('.')){
        return string.split('.')[1].length
    }
    return 0;
}
function round(number){
    return Math.round(number *100) /100
}



function operate(operator,a,b){
    if (operator == "+"){
        return add(a,b);
    }
    else if (operator=="-") {
        return subtract(a,b);
    }
    else if (operator=="x"){
        return multiply(a,b);
    }
    else if (operator=="÷") {
        return divide(a,b);
    }
}

// basic calculation functions
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a * b; 
}

function divide(a,b){
    return a/b;
}