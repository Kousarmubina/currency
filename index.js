#!/usr/bin/env node

const readline = require("readline");

// Fixed conversion rates
const USD_TO_INR_RATE = 83.0; // Example rate: 1 USD = 83 INR
const INR_TO_USD_RATE = 1 / USD_TO_INR_RATE;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === "USD" && toCurrency === "INR") {
    return amount * USD_TO_INR_RATE;
  } else if (fromCurrency === "INR" && toCurrency === "USD") {
    return amount * INR_TO_USD_RATE;
  } else {
    throw new Error("Invalid currency conversion.");
  }
}

function startCLI() {
  console.log("\nCurrency Converter CLI");
  console.log("=======================");
  console.log("Convert between INR and USD.\n");

  rl.question("Enter amount: ", (amountInput) => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount)) {
      console.log("Invalid amount. Please enter a number.");
      rl.close();
      return;
    }

    rl.question("Enter source currency (USD/INR): ", (sourceCurrency) => {
      const fromCurrency = sourceCurrency.toUpperCase();
      if (fromCurrency !== "USD" && fromCurrency !== "INR") {
        console.log("Invalid source currency. Please enter USD or INR.");
        rl.close();
        return;
      }

      rl.question("Enter target currency (USD/INR): ", (targetCurrency) => {
        const toCurrency = targetCurrency.toUpperCase();
        if (toCurrency !== "USD" && toCurrency !== "INR") {
          console.log("Invalid target currency. Please enter USD or INR.");
          rl.close();
          return;
        }

        try {
          const result = convertCurrency(amount, fromCurrency, toCurrency);
          console.log(
            `\n${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`
          );
        } catch (error) {
          console.error(error.message);
        }

        rl.close();
      });
    });
  });
}

startCLI();
