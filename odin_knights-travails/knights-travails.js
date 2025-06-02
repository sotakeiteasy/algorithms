"use strict";
let vertexes = {};

let start = [7, 1];
let end = [1, 1];

function knightMoves(start, end, count = 2) {
  if (String(start) === String(end)) {
    endMessage();
    return true;
  }

  if (count > 64) return false;

  const possibleMoves = findNextMove(start);

  // console.log("here", possibleMoves);

  if (possibleMoves.length === 0) {
    let keys = Object.keys(vertexes);
    let stepBackKey = keys[keys.length - count];
    let stepBackCoords = stepBackKey.split(",").map(Number);
    // console.log({ vertexes, start, stepBackCoords });
    return knightMoves(stepBackCoords, end, count + 1);
  }

  if (possibleMoves.length > 0) {
    let nextStart = possibleMoves[0];
    vertexes[start] = [...(vertexes[start] || []), nextStart];
    vertexes[nextStart] = [];

    return knightMoves(nextStart, end);
  }

  return false;
}

function isPlaceInDesc(place) {
  for (let i = 0; i < 2; i++) {
    if (place[i] < 0 || place[i] > 7) return false;
  }

  return true;
}

function isPlaceVisited(place) {
  return Object.keys(vertexes).some(
    (visPlace) => String(visPlace) === String(place)
  );
}

function findNextMove(lastPlace) {
  let first = lastPlace[0];
  let second = lastPlace[1];

  return [
    [first + 1, second + 2],
    [first + 2, second + 1],
    [first + 2, second - 1],
    [first + 1, second - 2],
    [first - 1, second - 2],
    [first - 2, second - 1],
    [first - 2, second + 1],
    [first - 1, second + 2],
  ].filter((place) => isPlaceInDesc(place) && !isPlaceVisited(place));
}

function endMessage() {
  console.log(`\n We made it in ${Object.keys(vertexes).length} moves.`);
  console.log(`Here is our way from [${start}] to [${end}]`);
  console.log(vertexes);
}

knightMoves(start, end);
