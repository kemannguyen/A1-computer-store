let currentBalance = 0;
let currentPayBalance = 0;
let currentDebt = 0;

//adds 100 to paybalance
function work(payBalance) {
    payBalance+=100;
    currentPayBalance = payBalance;
}


//Transfer money and pay debt by 10% of the earned salary if there is an debt
function transferMoneyToBank(debt, currBalance, payBalance, payBtnElement) {
    if(debt > 0)
    {
        //checking if the 10% of the transfer is bigger than the debt or not
        if(debt >= (payBalance/10))
        {
            debt -= (payBalance/10);
            currBalance += (payBalance*0.9);
        } else
        {
            //see how much money there is left from the paybalance if the 10% of the transfer
            //is more than the debt
            debt -= payBalance;
            debt *=-1;
            currBalance += debt;
            debt = 0;            
        }
        if(debt ===0){
            payBtnElement.disabled = true;
        }
    }
    //if no debt all whole pay to bank 
    else{
        currBalance += payBalance;
    }
    payBalance = 0;
    currentDebt = debt;
    currentBalance = currBalance;
    currentPayBalance = payBalance;
}

//pay the loan directly
function payBank(debt, currBalance, payBalance, payBtnElement){
    debt -= payBalance;

    //if paybalance is greater than debt, transfer it to bank 
    if(debt<=0){
        debt *=-1;
        currBalance += debt;
        debt = 0;
        payBtnElement.disabled = true;
    }
    payBalance = 0;
    currentBalance = currBalance;
    currentDebt = debt;
    currentPayBalance = payBalance;
}

function getBalance(){
    return currentBalance;
}
function getDebt(){
    return currentDebt;
}
function getPayBalance(){
    return currentPayBalance;
}
const workManager = {
    currentBalance,
    currentDebt,
    currentPayBalance,
    work,
    transferMoneyToBank,
    payBank,
    getBalance,
    getDebt,
    getPayBalance
}

export default workManager