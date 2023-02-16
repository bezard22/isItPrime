import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// check if imput is prime and update result
function isItPrime(n) {
    if (n == 2 || n == 1) {
        return true;
    } else {
        const p = (BigInt(2) ** (n - BigInt(1))) % n;
        if (p == 1) {
            return true;
        } else {
            return false;
        }
    }
}

function getFactors(n) {
    const factors = [];
    let i = 1;
    while (i <= Math.sqrt(n)) {
        if (n % i == 0) {
            factors.push(i);
            if (n / i != i) {
                factors.push(n / i)
            }
        }
        i++;
    }
    factors.sort((a, b) => {return a > b});
    return factors;
}

function check(){
    const input = parseInt(d3.select("#input").property("value"));
    const output = d3.select("#output")
    output.selectAll("p").remove()
    const prime = isItPrime(BigInt(input));
    if (prime) {
        output.append("p").text(`Yes, ${input} is prime.`);
    } else {
        const factors = getFactors(input);
        output.append("p").text(`No, ${input} is not prime.`);
        output.append("p").text(`The factors of ${input} are ${factors.join(", ")}`)
    }
}

// main
d3.select("#input").on("keypress", (event) => {
    if (event.key === "Enter") {
        check();
    } else if (!isFinite(event.key)) {
        event.preventDefault();
    }
})
d3.select("#input").property("value", "");
window.check = check;