import { useEffect, useState } from "react";
//part 1
//536753 wrong
//535078

//part 2
// 73465356 too low
//75312571
function Day3() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**

    const schematic = inputValue.split("\n");

    console.log("schematic", schematic);
    const height = schematic?.length;
    const width = schematic[0]?.length;

    const sumOfParts = schematic.reduce((sumOfParts, line, yValue) => {
      // create a list of valid parts in the line
      const partsList = Array.from(line).reduce(
        (partsInLine, value, xValue) => {
          const numPattern = /[0-9]/;
          const periodPattern = /\./;
          // look for full part numbers that have valid symbol adjacent
          // first, ignore if a period or not first digit in the number
          if (
            periodPattern.test(value) ||
            (numPattern.test(value) && numPattern.test(line[xValue - 1]))
          ) {
            //console.log("return early", line[xValue - 1]);
            return partsInLine;
          }

          //next if it is a number, find the end of the number to capture part all as one number
          if (numPattern.test(value)) {
            const partNum = findFullPartNumberFromStart(
              line,
              xValue,
              numPattern
            );
            if (
              isSymbolAdjacent(
                schematic,
                xValue,
                yValue,
                partNum.toString().length
              )
            ) {
              partsInLine.push(partNum);
            }
          }

          return partsInLine;
        },
        []
      );
      //console.log("parts", partsList);
      const sumOfCurrentParts = partsList?.reduce((partialSum, partNum) => {
        return partialSum + Number(partNum);
      }, 0);
      return sumOfParts + sumOfCurrentParts;
    }, 0);

    setAnswer1(sumOfParts);

    // **solve part 2**
    console.log("part 2");
    const sumOfGearRatio = schematic.reduce((sumOfGearRatio, line, yValue) => {
      // create a list of valid parts in the line
      const gearRatioList = Array.from(line).reduce(
        (gearRatioInLine, value, xValue) => {
          const starPattern = /\*/;
          // look for * symbols (gears) that have valid parts adjacent
          // first, ignore if not a *
          if (!starPattern.test(value)) {
            return gearRatioInLine;
          }

          //next if it is a *, check if there are 2 part numbers adjacent
          if (starPattern.test(value)) {
            const gearRatio = findGearRatio(schematic, xValue, yValue);
            //console.log("gear ratio?", gearRatio);
            gearRatioInLine.push(gearRatio);
          }

          return gearRatioInLine;
        },
        []
      );
      //console.log("gear Ratios in current line", gearRatioList);
      const sumOfRatios = gearRatioList?.reduce((partialSum, ratio) => {
        return partialSum + Number(ratio);
      }, 0);
      return sumOfGearRatio + sumOfRatios;
    }, 0);
    setAnswer2(sumOfGearRatio);
  }, [inputValue]);

  const findFullPartNumberFromStart = (line, index, numPattern) => {
    let partNum = "";
    console.log("line", { line, index });
    for (let i = index; i < line.length; i++) {
      if (!numPattern.test(line[i])) {
        break;
      }
      partNum += line[i] + "";
    }
    console.log("partNum", partNum);
    return Number(partNum);
  };

  const isSymbolAdjacent = (schematic, xValue, yValue, partNumLength) => {
    //return true at any point that a symbol is found
    const numDotPattern = /[0-9\.]/;
    const startingX = xValue > 0 ? xValue - 1 : xValue;
    const endingX =
      xValue + partNumLength + 1 < schematic[yValue].length
        ? xValue + partNumLength + 1
        : xValue + partNumLength;

    //check y-1 if not first row
    if (yValue > 0) {
      for (let x = startingX; x < endingX; x++) {
        //console.log("testing", schematic[yValue - 1][x]);
        if (!numDotPattern.test(schematic[yValue - 1][x])) {
          return true;
        }
      }
    }
    //check y
    for (let x = startingX; x < endingX; x++) {
      //console.log("testing", schematic[yValue][x]);
      if (!numDotPattern.test(schematic[yValue][x])) {
        return true;
      }
    }
    //check y+1 if not last row
    if (yValue + 1 < schematic.length) {
      for (let x = startingX; x < endingX; x++) {
        //console.log("testing", schematic[yValue + 1][x]);
        if (!numDotPattern.test(schematic[yValue + 1][x])) {
          return true;
        }
      }
    }
    return false;
  };

  //TODO: this could use some major cleanup
  //take the gear's (star) coordinates, verify it's a gear, and calculate the ratio
  const findGearRatio = (schematic, xValue, yValue) => {
    let partNums = [];
    const numPattern = /[0-9]/;

    const startingX = xValue > 0 ? xValue - 1 : xValue;
    const endingX = xValue + 1 < schematic[yValue].length ? xValue + 1 : xValue;

    // console.log("line with star", {
    //   line: schematic[yValue],
    //   startingX,
    //   endingX,
    // });

    //check y-1 if not first row
    let skipUntilSpaceOrNewLine = false;
    if (yValue > 0) {
      for (let x = startingX; x <= endingX; x++) {
        //don't want to search same part number multiple times
        //if non number is found when this is set, set it back to false
        if (
          skipUntilSpaceOrNewLine &&
          !numPattern.test(schematic[yValue - 1][x])
        ) {
          skipUntilSpaceOrNewLine = false;
        } else if (
          !skipUntilSpaceOrNewLine &&
          numPattern.test(schematic[yValue - 1][x])
        ) {
          const partNum = findFullPartNumber(
            schematic[yValue - 1],
            x,
            numPattern
          );
          partNums.push(partNum);
          skipUntilSpaceOrNewLine = true;
        }
      }
    }

    //check y
    skipUntilSpaceOrNewLine = false;
    for (let x = startingX; x <= endingX; x++) {
      //don't want to search same part number multiple times
      //if non number is found when this is set, set it back to false
      if (skipUntilSpaceOrNewLine && !numPattern.test(schematic[yValue][x])) {
        skipUntilSpaceOrNewLine = false;
      } else if (
        !skipUntilSpaceOrNewLine &&
        numPattern.test(schematic[yValue][x])
      ) {
        const partNum = findFullPartNumber(schematic[yValue], x, numPattern);
        partNums.push(partNum);
        skipUntilSpaceOrNewLine = true;
      }
    }

    //check y+1 if not last row
    skipUntilSpaceOrNewLine = false;
    if (yValue + 1 < schematic.length) {
      for (let x = startingX; x <= endingX; x++) {
        //don't want to search same part number multiple times
        //if non number is found when this is set, set it back to false
        if (
          skipUntilSpaceOrNewLine &&
          !numPattern.test(schematic[yValue + 1][x])
        ) {
          skipUntilSpaceOrNewLine = false;
        } else if (
          !skipUntilSpaceOrNewLine &&
          numPattern.test(schematic[yValue + 1][x])
        ) {
          const partNum = findFullPartNumber(
            schematic[yValue + 1],
            x,
            numPattern
          );
          partNums.push(partNum);
          skipUntilSpaceOrNewLine = true;
        }
      }
    }

    if (partNums.length == 2) {
      return partNums[0] * partNums[1];
    } else {
      return 0;
    }
  };

  const findFullPartNumber = (line, index, numPattern) => {
    let partNum = "";
    //console.log("line", { line, index });
    //look forward
    for (let i = index; i < line.length; i++) {
      if (!numPattern.test(line[i])) {
        break;
      }
      partNum += line[i] + "";
    }
    //look backward
    for (let i = index - 1; i >= 0; i--) {
      if (!numPattern.test(line[i])) {
        break;
      }
      partNum = line[i] + partNum;
    }
    //console.log("partNum", partNum);
    return Number(partNum);
  };

  return (
    <div>
      <h2>Day 3</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day3;
