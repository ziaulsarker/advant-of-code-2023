// Part 1;
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

// Part 2;

/* Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

*/


import * as fs from 'node:fs/promises';

const mapper = {
  'one': 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}

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
    let updatedLine = line.replace('twone', 'twoone');
    updatedLine = updatedLine.replace('nineight', 'nineeight')
    updatedLine = updatedLine.replace('fiveight', 'fiveeight')
    updatedLine = updatedLine.replace('threeight', 'threeeight')
    updatedLine = updatedLine.replace('eightwo', 'eighttwo')
    updatedLine = updatedLine.replace('eighthree', 'eightthree')
    updatedLine = updatedLine.replace('oneight', 'oneeight')
    updatedLine = updatedLine.replace('zerone', 'zeroone')
    arrOfLines.push(sumTwoNumbers(getDigitsFromLine(extractNumsFromLine(updatedLine))));
  }

  return arrOfLines;
}

const sumTwoNumbers = arrOfNumbers => arrOfNumbers.reduce((acc, curr) => `${acc}${curr}`);

const extractNumsFromLine = line => {
  const characters = line.split("");
  const result = [];


  let count = 0;

  while (count < characters.length) {
    let char = characters[count];
    const isNumber = !isNaN(parseInt(char))
    if(isNumber) {
      result.push(parseInt(char));
      count++;
      continue;
    }
    let combined = char;

    for(let j = count + 1; j < characters.length; j++) {
      combined += characters[j];

      if(mapper[combined]) {
        result.push(mapper[combined]);
        count = j;
        break;
      }
    }

    count++;
  }

  return result;

}

const getDigitsFromLine = digitsInLine => {
  if(!digitsInLine.length) return;

  const [firstDigit] = digitsInLine;

  if(digitsInLine.length === 1) return [firstDigit, firstDigit]

  console.log({digits: [firstDigit, digitsInLine.at(-1)]})
  return [firstDigit, digitsInLine.at(-1)]
}

const calibrateTextFile = async pathToFile => {
  if(!pathToFile) throw new Error("aint no file ther bitch");
  const file = await createFileHandler(pathToFile);
  const linesFromFile = await readLinesFromFileHandler(file)
  closeFileHandler(file);
  return linesFromFile.reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0);
}




calibrateTextFile("../data.txt")
.then((sum) => console.log({sum}))
.catch(err => console.error(err));

