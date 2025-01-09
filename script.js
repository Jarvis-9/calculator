let display = document.querySelector('#display')

let disp = document.createElement('p')
disp.classList.add('displayEl')
display.appendChild(disp)
disp.textContent = 0

let button = document.querySelectorAll('.btn')

function add(a, b) {
    return a+b
}

function subtract(a,b) {
    return a-b
}

function multiply(a,b) {
    return a*b
}

function divide(a,b) {
    return Math.round((a/b)*10)/10
}

function operate(a,op,b) {
    console.log(op=='+')
    switch(op){
        case '+':
            return add(a,b)
            break;

        case '-':
            return subtract(a,b)
            break;

        case '*':
            return multiply(a,b)
            break;
        
        case '/':
            return divide(a,b)
            break;
    }
}

let a = 0
let b = 0
let n = 1
let m = 1        
let op

function initialize(){
    a = 0
    b = 0
    n = 1
    m = 1
    op = null
}
initialize()
let re
button.forEach((btn)=>{
    btn.addEventListener('click', (event)=>{
        let val = event.target.textContent.trim()
        let value = parseInt(val)
        if(!Number.isNaN(value)){
            if(!op){
                if(typeof a == "string" && a.includes(".")){
                    a = a.concat(value)
                }
                else{
                    a = a*n+value
                    n = 10
                }
                disp.textContent = a
            }
            else{
                if(typeof b == "string" && b.includes(".")){
                    b = b.concat(value)
                }
                else{
                    b = b*m+value
                    m = 10
                }
                disp.textContent = b
            }
            
        }
        else{
            if(val != '=' && val!='C' && val!='%' && val!='+/-' && val!='.'){
                if(re!=undefined){
                    a = re
                }
                op = val
            }
            if(val == '='){
                if(typeof a == "string" || typeof b == "string"){
                    a = parseFloat(a)
                    b = parseFloat(b)
                }
                let result = operate(a,op,b)
                disp.textContent = result
                re = result
                initialize()
            }
            if(val == 'C'){
                disp.textContent = 0
                re = null
                initialize()
            }
            if(val == '%'){
                let el = parseFloat(document.querySelector('.displayEl').textContent)*0.01
                re = null
                op = null
                disp.textContent = el
                a = el
            }
            if(val == '+/-'){
                console.log(a,op,b)
                if(!op){
                    a = a*-1
                    disp.textContent = a
                }
                else{
                    b = b*-1
                    disp.textContent = b
                }

            }
            if(val == '.'){
                if(!op && (typeof a!= "string")){
                    a = a.toString().concat('.')
                    console.log(a)
                    disp.textContent = a
                }
                else if((typeof b!= "string")){
                    b = b.toString().concat('.')
                    disp.textContent = b
                }
            }
        }
    })
})