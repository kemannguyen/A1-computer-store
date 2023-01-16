let currentBalance = 0;
let currentDebt = 0;

//handles the loan request
function getLoan(currBalance, debt, payBtnElement) {
    //Initiate max allowed loan
    const maxLoanAmount = currBalance * 2;

    //only open the loan window if you don't have previous debt    
    if(debt == 0)
    {
        let loanInput = parseInt(window.prompt("Enter loan amount"));
        
        //acceptt the loan if the request isn't more than twice the amount of balance
        if(loanInput <= maxLoanAmount)
        {
            debt+= loanInput;
            currBalance += loanInput;
            //updateNumbers();
            payBtnElement.disabled = false;
            currentBalance = currBalance;
            currentDebt = debt;
        }
    }
    else{
        currentBalance = currBalance;
    }
}

//return values 
const getBalance = () => currentBalance;
const getDebt = () => currentDebt;

const bankInfo = {
    currentBalance,
    currentDebt,
    getLoan,
    getBalance,
    getDebt
}

export default bankInfo

