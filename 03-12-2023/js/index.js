// --- Day 3: Gear Ratios ---
// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

// It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

// "Aaah!"

// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

// The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

// The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine schematic:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

// Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?


import * as fs from 'node:fs/promises';


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


const readLinesFromFileHandler = async fileHandler => {
  if (!fileHandler) return;

  let arrOfLines = [];

  for await (const line of fileHandler.readLines()) {
    arrOfLines.push(line);
  }

  return arrOfLines;
}

const parseLines = lines => {
  const result = [];
  // console.log(lines);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    for(let j = i + 1; j < lines.length; j++) {
      console.log()
    }
  }

  return result
}




const findSumOfEngineParts = async filePath => {
  const file = await createFileHandler(filePath);
  const lines = await readLinesFromFileHandler(file)
  parseLines(lines)





  file?.close?.();
  return 0;
}

findSumOfEngineParts("../data.txt")
.then((sum) => console.log({sum}))
.catch(err => console.error(err));


