// function findLastPlace(lastPlace) {
//   let result = null;
//   for (const key of Object.keys(vertexes)) {
//     vertexes[key].map((vertex) => {
//       if (String(vertex) === String(lastPlace)) result = vertex;
//     });
//   }
//   return result;
// }

if (nextPossibleMoves.some((place) => String(place) === String(end))) {
  if (!vertexes[start]) {
    vertexes[start] = [];
  }
  vertexes[start].push(end);
  lastPlace = end;

  return `from [${start}] to [${lastPlace}]`;
}

// else {
//   console.log(`\nWe did not made it in ${visitedPlaces.length} moves.`);
//   console.log(
//     `Here is tempt to find way from [${visitedPlaces[0]}] to [${end}]`
//   );
//   visitedPlaces.forEach((el) => console.log(el));
// }
