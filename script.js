let calcAdd = (a, b) => {
    return a+b;
}

let calcSub = (a, b) => {
    return a-b;
}

let calcMulti = (a, b) => {
    return a*b;
}

let calcDivide = (a, b) => {
    return a/b;
}

let calcOperate = (a, op, b) => {
    let result = 0;
    if (op == "+") {
        result = calcAdd(a, b);
    } else if (op == "-") {
        result = calcSub(a, b);
    } else if (op == "*") {
        result = calcMulti(a, b);
    } else if (op == "/") {
        result = calcDivide(a, b);
    } else {
        console.log("Wrong input!\n");
    }
    return result;
}

let calcInfo = "0", calcResult, calcOp;
const infoScreen = document.querySelector(".calcDisplay");

document.querySelectorAll(".calcButton").forEach(btn => {
    btn.addEventListener("click", function() {
        // using a number. (1, 2, 3, 4, 5, 6, 7, 8, 9 or 0)
        if (!isNaN(this.textContent) || this.textContent == ".") {
            if (this.textContent == "." && calcInfo.includes(".")) {
                return;
            } else if (calcInfo.length == 1 && calcInfo.charAt(0) == "0" && this.textContent != ".") {
                calcInfo = calcInfo.slice(0, -1);
                calcInfo = calcInfo.concat(this.textContent);
                infoScreen.textContent = calcInfo;
                return;
            } else {
                calcInfo = calcInfo.concat(this.textContent);
                infoScreen.textContent = calcInfo;
                return;
            }
        }

        // using an operation. (AC, +/-, %, *, /, +, - or =)
        if (isNaN(this.textContent) && !(this.textContent == ".")) {
            if (this.textContent == "AC") {
                calcInfo = "0";
                calcResult = undefined, calcOp = undefined;
                infoScreen.textContent = calcInfo;
                return;
            } else if (this.textContent == "+/-") {
                if (parseFloat(calcInfo) == 0) {
                    return;
                } else {
                    if (calcInfo.charAt(0) == "-") {
                        calcInfo = calcInfo.slice(1);
                        infoScreen.textContent = calcInfo;
                        return
                    } else {
                        calcInfo = "-" + calcInfo;
                        infoScreen.textContent = calcInfo;
                        return;
                    }
                }
            } else if (this.textContent == "%") {
                calcInfo = (parseFloat(calcInfo)*0.01);
                calcInfo = calcInfo.toString();
                infoScreen.textContent = calcInfo;
                return;
            } else if (this.textContent == "=") { 
                if (calcOp != undefined) {
                    console.log(calcResult + " " + calcOp + " " + calcInfo);
                    calcResult = calcOperate(parseFloat(calcResult), calcOp, parseFloat(calcInfo));
                    infoScreen.textContent = calcResult;
                    return;
                }
            } else if (isNaN(this.textContent)) {
                if (calcOp != undefined && !isNaN(infoScreen.textContent)) {
                    calcResult = calcOperate(parseFloat(calcResult), calcOp, parseFloat(calcInfo));
                    infoScreen.textContent = calcResult;
                    calcOp = this.textContent;
                    calcInfo = "0";
                    return;
                } else if (isNaN(infoScreen.textContent)) {
                    // maybe implement var "lastUsed" symbol so infoScreen.textContent doesn't have to be used?
                    calcResult = calcOperate(parseFloat(calcResult), calcOp, parseFloat(calcResult));
                    infoScreen.textContent = calcResult;
                    calcOp = this.textContent;
                    calcInfo = "0";
                    return;
                }
                calcOp = this.textContent;
                calcResult = calcInfo;
                calcInfo = "0";
                infoScreen.textContent = calcOp;
                return;
            }
        }
    });
});
