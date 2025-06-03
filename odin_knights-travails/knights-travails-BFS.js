"use strict";
let start = [0, 0];
let end = [1, 2];

knightMovesBFS(start, end);

function knightMovesBFS(start, end, adjacencyLists = {}) {
  let queue = [start];

  while (queue.length > 0) {
    let current = queue.shift();
    const possibleMoves = findNextMove(current, adjacencyLists);
    adjacencyLists[current] = possibleMoves;

    if (possibleMoves.some((node) => isEqual(node, end))) {
      let shortWay = findShortWay(start, end, adjacencyLists);
      endMessage(start, end, shortWay);
      return true;
    }

    possibleMoves.forEach((node) => {
      if (!adjacencyLists[node]) queue.push(node);
    });
  }

  return false;
}

function findShortWay(start, end, adjacencyLists) {
  let shortWay = [end];
  let endKey = findKey(end);

  if (isEqual(start, endKey)) {
    shortWay.push(start);
    return shortWay.reverse();
  }

  while (true) {
    shortWay.push(endKey);
    const nextKey = findEdge(endKey);

    if (isEqual(nextKey, start)) {
      shortWay.push(start);
      return shortWay.reverse();
    }
    endKey = nextKey;
  }

  function findEdge(endKey) {
    let key = Object.keys(adjacencyLists).find((key) =>
      adjacencyLists[key].some((node) => isEqual(node, endKey))
    );
    return [Number(key[0]), Number(key[2])];
  }

  function findKey(node) {
    let key = Object.entries(adjacencyLists).find(([key, values]) => {
      if (values.some((value) => isEqual(value, node))) return key;
    });
    return [Number(key[0][0]), Number(key[0][2])];
  }
}

function isEqual(first, second) {
  return first[0] === second[0] && first[1] === second[1];
}

function isNodeInDesc(node) {
  for (let i = 0; i < 2; i++) {
    if (node[i] < 0 || node[i] > 7) return false;
  }

  return true;
}

function isNodeVisited(node, adjacencyLists) {
  return Object.keys(adjacencyLists).some(
    (visNode) => String(visNode) === String(node)
  );
}

function findNextMove(lastNode, adjacencyLists) {
  let [first, second] = lastNode;

  return [
    [first + 1, second + 2],
    [first + 2, second + 1],
    [first + 2, second - 1],
    [first + 1, second - 2],
    [first - 1, second - 2],
    [first - 2, second - 1],
    [first - 2, second + 1],
    [first - 1, second + 2],
  ].filter(
    (node) => isNodeInDesc(node) && !isNodeVisited(node, adjacencyLists)
  );
}

function endMessage(start, end, shortWay) {
  const cyan = (str) => `\x1b[35m${str}\x1b[0m`;
  const lines = [];

  lines.push(cyan("\n╭─────────────────────────────────────────────╮"));
  lines.push(
    cyan(
      `|   We made it in ${shortWay.length - 1} ${
        shortWay.length - 1 > 1 ? "moves." : "move. "
      } (¯▿¯)              |`
    )
  );
  lines.push(cyan(`|   Here is our path from [${start}] to [${end}]      |`));
  lines.push(cyan("|                                             |"));

  shortWay.forEach((node, index) => {
    const arrow = index < shortWay.length - 1 ? " =>" : "   ";
    const line = `|${"".padEnd(index * 2 + 3, " ")}[${node[0]}, ${
      node[1]
    }] ${arrow.padEnd(38 - String(node).length - index * 2, " ")}|`;
    lines.push(cyan(line));
  });

  lines.push(cyan("|                                             |"));
  lines.push(cyan("╰─────────────────────────────────────────────╯\n"));

  lines.forEach((line, i) => {
    setTimeout(() => console.log(line), i * 150);
  });
}
