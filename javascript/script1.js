let screen = document.querySelector("#screen");
let input = document.getElementById("input");
let btn = document.querySelectorAll(".btn");

// Adding event listeners for all buttons
for (const item of btn) {
    item.addEventListener("click", (e) => {
        let btnText = e.target.innerText;

        // Clear all (AC button)
        if (btnText === "AC") {
            btnText = "";
            screen.value = "";
            input.value = "";
            return;
        }

        // Change division symbol to '/'
        if (btnText === "÷") {
            btnText = "/";
        }

        // Change multiplication symbol to '*'
        if (btnText === "×") {
            btnText = "*";
        }

        // Toggle positive/negative sign
        if (btnText === "+/-") {
            screen.value = screen.value ? (-1 * parseFloat(screen.value)).toString() : "";
            return;
        }

        // Square root functionality
        if (btnText === "✓") {
            screen.value = Math.sqrt(parseFloat(screen.value)).toString();
            return;
        }

        // Update screen value
        screen.value += btnText;
    });
}

// Evaluation function with strict mode
const returnEval = (arg) => {
    try {
        return eval(`"use strict";(${arg})`);
    } catch (error) {
        return "Error";
    }
};

// Get result when "=" button is pressed
const getResult = () => {
    input.value = screen.value;
    screen.value = returnEval(screen.value);
};

// Clear last character in screen value (for backspace functionality)
const back = () => {
    screen.value = screen.value.slice(0, -1);
};

// Add event listener for delete button
document.querySelector(".btn-primary img").addEventListener("click", back);
