import { useEffect, useState } from "react";

// went with recursion here, but apparently that was a bad idea becuase
// I was running into a call stack size exceeded error :Grimacing face
function Day6() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    const numGuardMovements = mapGuardMovements(inputValue);
    setAnswer1(numGuardMovements);

    // **solve part 2**
    setAnswer2(0);
  }, [inputValue]);

  const guardDirections = ["^", ">", "v", "<"];
  const guardDirectionRules = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    "<": { x: -1, y: 0 },
  };

  const findStartPosition = (mapGrid) => {
    let startCoordinates = null;
    mapGrid?.forEach((row, y) => {
      if (startCoordinates) return;
      const rowArray = [...row];
      rowArray?.forEach((cell, x) => {
        if (startCoordinates) return;
        if (guardDirections.includes(cell)) {
          startCoordinates = { x, y, guard: cell };
        }
      });
    });
    return startCoordinates;
  };

  let countMoves = 0;
  const moveGuard = (mapGrid, guardPosition) => {
    if (!mapGrid || !guardPosition) {
      return mapGrid;
    }
    // try to try recursion for call stack overflow
    countMoves++;
    console.log("countMoves", countMoves);
    const guardMovementDirection = guardDirectionRules[guardPosition.guard];
    const testX = guardPosition.x + guardMovementDirection.x;
    const testY = guardPosition.y + guardMovementDirection.y;

    // check if guard is leaving
    if (
      testY < 0 ||
      testY >= mapGrid.length ||
      testX < 0 ||
      testX >= mapGrid[testY].length
    ) {
      //guard is leaving the grid
      mapGrid[guardPosition.y][guardPosition.x] = "X";
      return mapGrid;
    }

    const newGuardPosition = { ...guardPosition };
    // check if guard will hit an obstacle
    if (mapGrid[testY][testX] === "#") {
      //turn right instead
      const guardDirectionIndex = guardDirections.indexOf(guardPosition.guard);
      const newGuardDirectionIndex =
        guardDirectionIndex + 1 >= guardDirections.length
          ? 0
          : guardDirectionIndex + 1;
      newGuardPosition.guard = guardDirections[newGuardDirectionIndex];
    } else {
      //make the move
      // console.log("mapGrid", mapGrid);
      mapGrid[guardPosition.y][guardPosition.x] = "X";
      newGuardPosition.x = testX;
      newGuardPosition.y = testY;
    }

    return moveGuard(mapGrid, newGuardPosition);
  };

  const mapGuardMovements = (input) => {
    const lines = input.split("\n");

    const mapGrid = lines.map((line) => {
      return [...line];
    });

    const startCoordinates = findStartPosition(mapGrid);
    console.log("startCoordinates", startCoordinates);

    const movementGrid = moveGuard(mapGrid, startCoordinates);
    console.log("movementGrid", movementGrid);
    // count the movements
    const flattenedGrid = movementGrid?.flat();
    const countPositionsMoved = flattenedGrid?.filter(
      (gridPosition) => gridPosition === "X"
    ).length;
    console.log("count positions", countPositionsMoved);
    return countPositionsMoved;
  };

  return (
    <div>
      <h2>Day 6</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day6;
