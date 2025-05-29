// Helper function to merge two sorted portions of the array
// function merge(arr, left, mid, right) {
//   let arr1 = arr.slice(left, mid + 1);
//   let arr2 = arr.slice(mid + 1, right + 1);

//   let i = 0,
//     j = 0,
//     k = left;

//   while (i < arr1.length && j < arr2.length) {
//     arr[k++] = arr1[i] <= arr2[j] ? arr1[i++] : arr2[j++];
//   }

//   while (i < arr1.length) arr[k++] = arr1[i++];
//   while (j < arr2.length) arr[k++] = arr2[j++];
// }

// // Main sorting function
// function mergeSort(arr) {
//   let n = arr.length;

//   for (let currSize = 1; currSize <= n - 1; currSize *= 2) {
//     for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
//       let mid = Math.min(leftStart + currSize - 1, n - 1);
//       let rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);
//       merge(arr, leftStart, mid, rightEnd);
//     }
//   }
// }



// Driver Code
// let arr = [4, 1, 3, 9, 7];
// mergeSort(arr);
// console.log(arr);

let arr = [4, 1, 3, 9, 7];
mergeSort(arr);
console.log(arr);



// // Merge Recursive Way (New array)
// function mergeSort(array) {
//   if (array.length <= 1) return array;

//   const middle = array.length / 2;
//   let left = array.slice(0, middle);
//   let right = array.slice(middle);

//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge(left, right) {
//   let newArray = [];
//   let i = 0,
//     j = 0;

//   while (i < left.length && j < right.length) {
//     left[i] < right[j] ? newArray.push(left[i++]) : newArray.push(right[j++]);
//   }

//   while (i < left.length) newArray.push(left[i++]);
//   while (j < right.length) newArray.push(right[j++]);

//   return newArray;
// }



// // Merge Recursive Way (sort in place)
// function mergeSort(arr, left = 0, right = arr.length - 1) {
//   if (left >= right) return;
//   const mid = Math.floor((left + right) / 2);

//   mergeSort(arr, left, mid);
//   mergeSort(arr, mid + 1, right);

//   merge(arr, left, mid, right);
// }

// function merge(arr, left, mid, right) {
//   const leftPart = arr.slice(left, mid + 1);
//   let i = 0,
//     j = mid + 1,
//     k = left;

//   while (i < leftPart.length && j <= right) {
//     arr[k++] = leftPart[i] <= arr[j] ? leftPart[i++] : arr[j++];
//   }
//   while (i < leftPart.length) arr[k++] = leftPart[i++];
// }



// Merge recoursive way - iterative-like
function mergeSort(arr, low = 0, high = arr.length - 1) {
    if(arr.length === 0) return [];
    if(low === high) return [arr[low]];
    if(low < high) {
        const mid = Math.floor((low + high) / 2);
        const left = mergeSort(arr, low, mid);
        const right = mergeSort(arr, mid + 1, high);
        return merge(left, right)
    }
    return;
}

function merge(left, right) {
    let array = [], i = 0, j = 0, k = 0;

    while(i < left.length && j < right.length) {
        array[k++] = left[i] < right[j] ? left[i++] : right[j++];
    }
    while(i < left.length) array[k++] = left[i++];
    while(j < right.length) array[k++] = right[j++];

    return array;
}
