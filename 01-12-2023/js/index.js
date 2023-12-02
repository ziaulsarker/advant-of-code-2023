// The newly-improved calibration document consists of lines of text; each 
// line originally contained a specific calibration value that the Elves now 
// need to recover. On each line, the calibration value can be found by combining 
// the first digit and the last digit (in that order) to form a single two-digit number.



/* 
  1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet  
*/

// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Part 1;


import * as fs from 'node:fs/promises';
import path from 'node:path';


// returns the file handler
const createFileHandler = async pathToFile => {
  if (!pathToFile) return;

  let fileHandler = {};

  try {
    fileHandler = await fs.open(pathToFile);
  } catch (err) {
    console.error("soory bitch could not read the file", err);
  }

  return fileHandler;
}

// fn to close any open handlers;
const closeFileHandler =  fileHandler => fileHandler?.close?.();

// reads all the lines from the file;
const readLinesFromFileHandler = async fileHandler => {
  if (!fileHandler) return;

  let arrOfLines = [];

  for await (const line of fileHandler.readLines()) {
    arrOfLines.push(sumTwoNumbers(getDigitsFromLine(extractNumsFromLine(line))));
  }

  return arrOfLines;
}

const sumTwoNumbers = arrOfNumbers => arrOfNumbers.reduce((acc, curr) => parseInt(acc + curr), 0);

const extractNumsFromLine = line => {
  const characters = line.split("");
  return characters.filter(char => char.match(/^\d+$/));
}

const getDigitsFromLine = digitsInLine => {
  if(!digitsInLine.length) return;

  const [firstDigit] = digitsInLine;

  if(digitsInLine.length === 1) return [firstDigit, firstDigit]

  return [firstDigit, digitsInLine.at(-1)]
}

const calibrateTextFile = async pathToFile => {
  if(!pathToFile) throw new Error("aint no file ther bitch");
  const file = await createFileHandler(pathToFile);
  const linesFromFile = await readLinesFromFileHandler(file)
  file.close();
  return linesFromFile.reduce((acc, curr) => acc + curr, 0);
}




calibrateTextFile("../data.txt")
.then((sum) => console.log({sum}))
.catch(err => console.error(err));