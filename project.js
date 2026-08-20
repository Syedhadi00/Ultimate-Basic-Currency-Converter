const url = "https://cdn.jsdelivr.net/gh/irfanokr/currency-api@main/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

// this if for add multiple option country in select 
for (let select of dropdown) {
    for (code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        select.append(newoption);
        select.value = "PKR";
        select.addEventListener("change", (evt) => {
            updateflag(evt.target);

        })
    }
}
let updateflag = (element) => { //for update flag while selecting the flag
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
// for print same value of input
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountval = amount.value;
    if (amountval == "" || amountval < 1) {
        amountval = 1;
        amount.value = 1;
    }

// for the response and displaying on screen final currency
const URL = `${url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let change = await response.json();
    let finalrate = amountval * change[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalrate} ${tocurr.value}`;
});
