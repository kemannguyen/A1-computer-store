import bankInfo from "./bank/bank.js";
import workManager from "./work/work.js";

const balanceElement = document.getElementById("currBalance");
const debtsElement = document.getElementById("currDebt");
const payElement = document.getElementById("pay");
const payBtnElement = document.getElementById("payBankBtn");
const workBtnElement = document.getElementById("workBtn");
const loanBtnElement = document.getElementById("loanBtn");
const bankBtnElement = document.getElementById("bankBtn");

let currentBalance = 0; 
let payBalance = 0; 
let debt = 0;

//update the bank and work section values shown on screen
function updateNumbers() {
    balanceElement.innerText = "Balance:  "+currentBalance + " kr";
    debtsElement.innerText ="Debt:  "+ debt+ " kr";
    payElement.innerText = "Pay:  "+payBalance+ " kr";
}

//-------------------------------------------------------------------------------
//BANK SECTION

//handles action when "loan" button is pressed
loanBtnElement.addEventListener("click", () => {
    bankInfo.getLoan(currentBalance, debt, payBtnElement);
    currentBalance = bankInfo.getBalance();
    debt = bankInfo.getDebt();
    updateNumbers();
})


//---------------------------------------------------------------------------------
//WORK SECTION

//handles action when "work" button is pressed
workBtnElement.addEventListener("click", () => {
    workManager.work(payBalance);
    payBalance = workManager.getPayBalance();
    updateNumbers();
})

//handles action when "bank" button is pressed
bankBtnElement.addEventListener("click", () => {
    workManager.transferMoneyToBank(debt, currentBalance, payBalance, payBtnElement);
    currentBalance = workManager.getBalance();
    debt = workManager.getDebt();
    payBalance = workManager.getPayBalance();
    updateNumbers();
})

//handles action when "pay bank" button is pressed
payBtnElement.addEventListener("click", () => {
    workManager.payBank(debt, currentBalance, payBalance, payBtnElement);
    currentBalance = workManager.getBalance();
    debt = workManager.getDebt();
    payBalance = workManager.getPayBalance();
    updateNumbers();
})


//---------------------------------------------------------------------------------
//LAPTOP SECTION
import fetchComputers from "./api/fetchComputers.js";
import postsView from "./posts/postsView.js";

const baseURL = "https://hickory-quilled-actress.glitch.me/";

const computersElement = document.getElementById("computers");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const imageElement = document.getElementById("img");
const specElement = document.getElementById("specs");
const computerNameElement = document.getElementById("compname");
const buyBtnElement = document.getElementById("buyBtn");
let currentComputerName = "Classic Notebook";

//fetch computer information
const initialComputers = await fetchComputers();
postsView.initializeComputers(initialComputers);

let computers = postsView.getComputers();

//Handle the process of buying a computer
function buyComputer(){
    const computerPrice = parseInt(priceElement.innerText);
    if(computerPrice > currentBalance){
        alert("Could not handle the request. Insufficient funds!");
    }
    else{
        currentBalance -= computerPrice;
        alert("Congrats you now own a "+ currentComputerName);
        updateNumbers();
    }
}

//handles buy button
buyBtnElement.addEventListener("click", () => {
    buyComputer();
})

//adds all the computers to the dropdown element by using another function
const addComputersToSite = (computers) => {
    computers.forEach(computer => {
        addComputerToSite(computer)
    });
}

//adds a computer to the dropdown section of the store
const addComputerToSite = (computer) =>{
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

//adds the computers information into the site
addComputersToSite(initialComputers);

//updates computer info shown everytime a new computer is selected
const handleComputerSelection = e =>{
    const selectedComputer = computers[e.target.selectedIndex];
    currentComputerName = selectedComputer.title;
    priceElement.innerText = selectedComputer.price + " kr";

    fetch(imageElement.src = baseURL+selectedComputer.image)
        .then(async response => {
            if(!response.ok)
            {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if(response.ok){
                imageElement.src = baseURL+selectedComputer.image;
            }
            
        })
        .catch(error =>{
            imageElement.src = "https://hickory-quilled-actress.glitch.me/assets/images/5.png";
        });
    
    
    //imageElement.src = baseURL+selectedComputer.image;
    
    descriptionElement.innerText = selectedComputer.description;
    computerNameElement.innerText = currentComputerName;
    specElement.replaceChildren();
    let test = (selectedComputer.specs).toString();
    let words = test.split(",");
    words.forEach(element => {
        let li = document.createElement("li");
        li.innerText = element;
        specElement.appendChild(li);
    });
}

computersElement.addEventListener("change", handleComputerSelection);


