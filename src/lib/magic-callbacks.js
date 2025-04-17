function magic(functions, finalCallback) {
  // Handle the case of no functions
  if (functions.length === 0) {
    return finalCallback(null, null);
  }
  
  // Start with initial function that takes only a callback
  const firstFunction = functions[0];
  const remainingFunctions = functions.slice(1);
  
  // Execute first function which takes only callback
  firstFunction((err, result) => {
    if (err) return finalCallback(err);
    
    // Create recursive function to process remaining functions
    function processNext(index, previousResult) {
      // If we've processed all functions, return the final result
      if (index >= remainingFunctions.length) {
        return finalCallback(null, previousResult);
      }
      
      // Get the next function
      const nextFunction = remainingFunctions[index];
      
      // Execute it with the previous result
      nextFunction(previousResult, (err, result) => {
        if (err) return finalCallback(err);
        
        // Process the next function
        processNext(index + 1, result);
      });
    }
    
    // Start processing with the first remaining function
    processNext(0, result);
  });
}

// Example usage with n functions
function f1(callback) {
  console.log(1);
  callback(null, 1);
}

function f2(input, callback) {
  console.log(2);
  callback(null, input + 1);
}

function f3(input, callback) {
  callback(null, 'done');
}

// Example with more functions
function f4(input, callback) {
  console.log('extra function');
  callback(null, input + ' with extra');
}

// Test with 3 functions
magic([f1, f2, f3], (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log(result);
  }
});

// Test with 4 functions
// magic([f1, f2, f3, f4], (err, result) => {
//   if (err) {
//     console.error('Error:', err);
//   } else {
//     console.log(result);
//   }
// });



const magicTwo = function() {
  const args = Array.from(arguments);
  const functions = args.slice(0, args.length - 1);
  const finalCallback = args[args.length - 1];
  
  // Base case: no functions
  if (functions.length === 0) {
    return finalCallback(null, null);
  }
  
  // Start with first function
  let currentIndex = 0;
  let currentResult = null;
  
  // First function only takes a callback
  functions[0]((err, result) => {
    if (err) return finalCallback(err);
    currentResult = result;
    currentIndex++;
    nextFunction();
  });
  
  // Process subsequent functions
  function nextFunction() {
    // If we've processed all functions, call the final callback
    if (currentIndex >= functions.length) {
      return finalCallback(null, currentResult);
    }
    
    // Get the current function
    const fn = functions[currentIndex];
    
    // Call the function with previous result and callback
    fn(currentResult, (err, result) => {
      if (err) return finalCallback(err);
      currentResult = result;
      currentIndex++;
      nextFunction();
    });
  }
};

// Test functions
function f1(callback) {
  console.log(1);
  callback(null, 1);
}

function f2(input, callback) {
  console.log(2);
  callback(null, input + 1);
}

function f3(input, callback) {
  callback(null, 'jdone');
}

// Test with 3 functions
magicTwo(f1, f2, f3, (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log(result);
  }
});