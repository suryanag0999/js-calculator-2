let screen = document.querySelector("#screen");
let input = document.getElementById("input");
let btn = document.querySelectorAll(".btn");

for (const item of btn) {
   item.addEventListener("click", (e) => {
      let btntext = e.target.innerText;
      
      // Skip adding "CE" to screen.value
      if (btntext === "CE") {
         clearExpression();
         return; // Stop further processing for this click
      }
      // Clear all
      if (btntext === "AC") {
         btntext = "";
         screen.value = "";
      }

      // Division
      if (btntext === "÷") {
         btntext = "/";
      }

      // toggle
      if (btntext === "+/-") {
         btntext = "";
         screen.value = -returnEval(screen.value);
      }

      // Multiplication
      if (btntext === "×") {
         btntext = "*";
      }

      // Clear screen for new expression
      if (input.value) {
         input.value = "";
         screen.value = "";
      }

      screen.value = screen.value + btntext;
   });
}

const returnEval = (arg) => {
   return eval(`"use strict"; (${arg})`);
};

// Get result after converting expression
const getResult = () => {
   input.value = screen.value;

   // Convert expression before evaluating
   screen.value = returnEval(convertToEvalTstring(screen.value));
};

const back = () => {
   screen.value = screen.value.slice(0, -1);
};

// Convert to evaluable string
const convertToEvalTstring = (input) => {
   // Replace ^ symbol with ** for exponentiation
   input = input.replace(/\^/g, "**");

   // Replace ✓ with Math.sqrt(), adding parentheses around the number that follows
   input = input.replace(/✓(\d+(\.\d+)?)/g, "Math.sqrt($1)");

   console.log(`Transformed expression: ${input}`);
   return input;
};


const calpercentage = () => {
   let result = returnEval(screen.value) / 100;
   input.value = `${screen.value}%`;
   screen.value = result;
};

const inverse = () => {
   try {
      let result = 1 / screen.value;
      input.value = `1 / ${screen.value}`;
      screen.value = result;
   } catch (error) {
      console.log(error);
      screen.value = "Error";
   }
};


// CE buttton

// const clearExpression =()=>{
//    const currentExpression = screen.value;
//    let lastExpression = "";

//    let regex = /(\b\d+(\.\d+)?|\b\.\d+)\s*$/;
//    let match = currentExpression.match(regex);
//    if(match){
//       lastExpression = match[0].trim();
//    }
//    screen.value = currentExpression.replace
//    (lastExpression,"").trim();
// };



const clearExpression = () => {
   const currentExpression = screen.value;
   
   // Regular expression to match the last number or operator
   let regex = /(\d+(\.\d+)?|\.\d+|\+|\-|\*|\/)\s*$/;
   
   // Find the last part of the expression that matches the regex
   const lastMatch = currentExpression.match(regex);
   
   // If a match is found, remove the last part of the expression
   if (lastMatch) {
      screen.value = currentExpression.slice(0, currentExpression.length - lastMatch[0].length).trim();
   }
};
