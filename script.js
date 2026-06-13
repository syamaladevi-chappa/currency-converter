const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("resultText");
const convertBtn = document.getElementById("convertBtn");

// 🔹 Load all currencies automatically
fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      let option1 = document.createElement("option");
      option1.value = currency;
      option1.text = currency;
      fromCurrency.appendChild(option1);

      let option2 = document.createElement("option");
      option2.value = currency;
      option2.text = currency;
      toCurrency.appendChild(option2);
    });

    // Default values
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  })
  .catch(error => {
    console.log("Error loading currencies:", error);
  });

// 🔹 Convert button
convertBtn.addEventListener("click", () => {
  let amount = amountInput.value;
  let from = fromCurrency.value;
  let to = toCurrency.value;

  if (amount === "" || amount <= 0) {
    resultText.innerText = "Please enter valid amount";
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      let rate = data.rates[to];
      let convertedAmount = (amount * rate).toFixed(2);
      resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
    })
    .catch(error => {
      resultText.innerText = "Conversion error!";
      console.log(error);
    });
});