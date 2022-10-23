// Javascript file to support calculator program

const display = document.querySelector('#display');
const btn = document.querySelectorAll('button');
let operand1 = 0;
let operand2 = 0;
let operator ='';
let isActiveDot = true;
let dotCont = false;
let isActiveOperator = false;
let secondOperator =false;
let isActiveEquals = false;
let isBackSpace = true;
let output ='';


btn.forEach((button) => {

    button.addEventListener('click', () => {

        switch (button.id){
            case 'one': updateDisplay(1); isBackSpace=true; break;
            case 'two': updateDisplay(2); isBackSpace=true; break;
            case 'three': updateDisplay(3); isBackSpace=true; break;
            case 'four': updateDisplay(4); isBackSpace=true; break;
            case 'five': updateDisplay(5); isBackSpace=true; break;
            case 'six': updateDisplay(6); isBackSpace=true; break;
            case 'seven': updateDisplay(7); isBackSpace=true; break;
            case 'eight': updateDisplay(8); isBackSpace=true; break;
            case 'nine': updateDisplay(9); isBackSpace=true; break;
            case 'zero': updateDisplay(0); isBackSpace=true; break;
            case 'plus': selectOperator('plus'); break;
            case 'minus': selectOperator('minus'); break;
            case 'divide': selectOperator('divide'); break;
            case 'multiply': selectOperator('multiply'); break;
            case 'modulo': selectOperator('modulo'); break;
            case 'equals': selectEquals(); break;
            case 'ac': clearAll(); break;
            case 'backspace': backSpace(); break;
            case 'dot':  decimalPoint(); isBackSpace=true; break;

        }

       
    });

    
});



function updateDisplay(myData){
    if((display.textContent === '0' || isActiveOperator || isActiveEquals) && !secondOperator && !dotCont){
        display.textContent = myData;
       
    }else if (output !== '' && !isActiveEquals && !dotCont){ // responds to button press after equals btn press
        display.textContent = myData;
   
    }else if (output !== '' && !isActiveEquals && secondOperator && !dotCont){ // responds to continuous transaction
        display.textContent = myData;
    
    }else{
       // ignore if length > 9
       if (display.textContent.length < 9){
            display.textContent += myData;
        }
    }
    
   // console.log(myData);
}

function backSpace(){
    if(isBackSpace){
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);

        if(display.textContent.length === 0)
            display.textContent ='0';
    }
}

function decimalPoint(){
   if (isActiveDot){
  
        if(display.textContent ==='0'){
            updateDisplay('0.');
        }else{
            dotCont = true;
            updateDisplay('.');
           // dotCont =false
        }
       
        isActiveDot = false;
    }
}

function selectOperator(selected){
    // check if operator already selected
    if (isActiveOperator){
        secondOperator = true;

         // transfer previous selections to operand2
        operand2 = display.textContent

        // call operate
        operate(operand1, operand2, operator);

        operand2 = '';

    }

    operator = selected;
    isActiveOperator = true;
    isActiveDot = true; 
    dotCont =false;
    isBackSpace=false;

    // transfer previous selections to operand1
    operand1 = display.textContent
}

function selectEquals(){
    // transfer previous selections to operand2
    operand2 = display.textContent

    // set flag
    isActiveEquals = true;
    isActiveDot = true;
    dotCont = false;
    isBackSpace =false;

    // reset operator
    isActiveOperator = false
    secondOperator = false

    // call operate
    operate(operand1, operand2, operator);

    // reset flag
    isActiveEquals = false;

}

function operate(oprnd1, oprnd2, oprtor){

    switch (oprtor){
        case 'plus': 
            output = Number(oprnd1) + Number(oprnd2);
            updateDisplay(output);
            break;
        case 'minus':
            output = Number(oprnd1) - Number(oprnd2);
            updateDisplay(output);
            break;
        case 'multiply':
            output = Number(oprnd1) * Number(oprnd2);
            updateDisplay(output);
            break;
        case 'divide':
            if (Number(oprnd2) === 0){
                updateDisplay('Err: Div by Zero');
            }else{
                output = Number(oprnd1) / Number(oprnd2);
                updateDisplay(output);
            }
            break;
        case 'modulo':
            if (Number(oprnd2) === 0){
                updateDisplay('Err: Div by Zero');
            }else{
                output = Number(oprnd1) % Number(oprnd2);
                updateDisplay(output);
            }
            break;

    }

    //output = '';
    
}

function clearAll(){
    display.textContent ='0';
    operand1 = 0;
    operand2 = 0;
    operator ='';
    isActiveDot = true;
    dotCont = false;
    isActiveOperator = false;
    secondOperator =false;
    isActiveEquals = false;
    output = '';
}