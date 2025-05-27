// Using iteration, write a function fibs which takes a number and returns an array containing that many numbers from the Fibonacci sequence.
// Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].

function fibs(n) {
    let array = [0, 1];
    let first = 0;
    let second = 1;
    let current

    for (let i = 2; i < n; i++) { 
        current = first + second
        array.push(current);

        first = second;
        second = current
    };

    return array;
}

// console.log(fibs(12)); //[ 0, 1, 1, 2, 3, 5,  8, 13, 21, 34, 55, 89 ]



// Now write another function fibsRec which solves the same problem recursively.
function fibsRec1(n) {
    if (n < 2) return [0];
    if (n < 3) return [0, 1];

    let a = fibsRec1(n - 1);
    a.push(a[n - 3] + a[n - 2]);
    return a;
}

function fibsRec2(n) {
    if (n < 2) return [0];
    if (n < 3) return [0, 1];

    const arr = fibsRec2(n - 1);

    return [...arr, arr[n - 3] + arr[n - 2]];
}

function fibsRec3(n) {
    if(n === 0) return []
    if(n === 1) return [0]
    if(n === 2) return [0, 1]
    
    let arr = fibsRec3(n - 1)
    let next = arr[arr.length - 1] + arr[arr.length - 2]
    arr.push(next)
    return arr
}

console.log(fibsRec1(8)); //[ 0, 1, 1, 2, 3, 5,  8, 13 ]
console.log(fibsRec2(8)); //[ 0, 1, 1, 2, 3, 5,  8, 13 ]
console.log(fibsRec3(8)); //[ 0, 1, 1, 2, 3, 5,  8, 13 ]
