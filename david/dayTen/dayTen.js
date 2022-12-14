const common = require("../common");

function trackCyclesAndValueX(commands, cyclesToRecord) {
  let cyclesToRecordDict = {};
  for (let i in cyclesToRecord) {
    cyclesToRecordDict[cyclesToRecord[i]] = 0;
  }
  let X = 1;
  let cycles = 0;
  for (let i in commands) {
    let command = commands[i].split(" ");
    if (command[0] == "noop") {
      cycles += 1;
      if (cyclesToRecordDict.hasOwnProperty(cycles)) {
        cyclesToRecordDict[cycles] = cycles * X;
      }
    } else if (command[0] == "addx") {
      cycles += 1;
      if (cyclesToRecordDict.hasOwnProperty(cycles)) {
        cyclesToRecordDict[cycles] = cycles * X;
      }
      cycles += 1;
      if (cyclesToRecordDict.hasOwnProperty(cycles)) {
        cyclesToRecordDict[cycles] = cycles * X;
      }
      X += parseInt(command[1], 10);
    }
  }
  return cyclesToRecordDict;
}

function checkLimit(cycles, currentCycle, X, crt, limit) {
    if (cycles == limit) {
        if (cycles == X || cycles == X + 1 || cycles == X + 2) {
          currentCycle += "#";
        } else {
          currentCycle += ".";
        }
        crt.push(currentCycle);
        currentCycle = "";
        cycles = 0;
      } else {
        if (cycles == X || cycles == X + 1 || cycles == X + 2) {
          currentCycle += "#";
        } else {
          currentCycle += ".";
        }
      }
      return [cycles, currentCycle, X, crt]
}

function drawCrt(commands) {
  let crt = [];
  let currentCycle = "";
  let X = 1;
  let cycles = 0;

  for (let i in commands) {
    let command = commands[i].split(" ");

    if (command[0] == "noop") {
      cycles += 1;
      [cycles, currentCycle, X, crt] = checkLimit(cycles, currentCycle, X, crt, 40)
    } else if (command[0] == "addx") {
      cycles += 1;
      [cycles, currentCycle, X, crt] = checkLimit(cycles, currentCycle, X, crt, 40)
      cycles += 1;
      [cycles, currentCycle, X, crt] = checkLimit(cycles, currentCycle, X, crt, 40)
      X += parseInt(command[1], 10);
    }
  }
  return crt;
}

const commands = common.textFileToArray("./dayTen.txt");

const questionOneCycles = [20, 60, 100, 140, 180, 220];

let cyclesOne = trackCyclesAndValueX(commands, questionOneCycles);
let answerOne = 0;
for (let key in cyclesOne) {
  answerOne += cyclesOne[key];
}

console.log(answerOne);
console.log(drawCrt(commands));
