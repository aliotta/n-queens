/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; 
    
    var findPossibilities = function(matrix, row){
       var viableBoards = [];
       //var skip;
       
      for (var i = 0; i < n; i++) {
          //skip = false;
          matrix.togglePiece(row, i);
          var test1 = matrix.hasAnyRooksConflicts();
          if (!(test1)){ 
            var copy = matrix.rows().slice();

            viableBoards.push(JSON.stringify(copy));
          }
          matrix.togglePiece(row, i);
      }
      for (var j = 0; j < viableBoards.length; j++) {
         viableBoards[j] = new Board(JSON.parse(viableBoards[j]));
      }
      return viableBoards;

    }

    var recursiveSearch = function(size){
      //debugger;
      var emptyBoard = new Board({n: size});
      var tripleStackedArray = [emptyBoard];
      var i = 0;
      var deeperArray = [];
      var storage = [];
      while (size > i){

        if(i === 0){
          for (var k = 0; k < tripleStackedArray.length; k++) {
            deeperArray.push(findPossibilities(tripleStackedArray[k], 0));
            // console.log(deeperArray);
            // console.log(tripleStackedArray[j]);
          };  
        } else {
          var deepElementLength = deeperArray[0].slice().length * deeperArray.length;
          for (var j = 0; j < deepElementLength; j++) {
            if ( j === 0){
              storage = [];
            }
            //console.log(deeperArray[deeperArray.length -1]);
            storage.push(findPossibilities(deeperArray[deeperArray.length -1][j], i));
              
            if (j === deepElementLength -1){
              var tempStore = [_.flatten(storage,1)]; 
              
              deeperArray = tempStore;

              
            }
          }; 
          
        }
        
        i++;
      }
      var flat = _.flatten(deeperArray,1) 
      return flat.length;
    }

    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    
    var count = recursiveSearch(n);
    return count;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.findNRooksObjects = function(n){
    var solution = undefined; 
    
    var findPossibilities = function(matrix, row){
       var viableBoards = [];
       //var skip;
       
      for (var i = 0; i < n; i++) {
          //skip = false;
          matrix.togglePiece(row, i);
          var test1 = matrix.hasAnyRookConflicts();
          if (!(test1)){ 
            var copy = matrix.rows().slice();

            viableBoards.push(JSON.stringify(copy));
          }
          matrix.togglePiece(row, i);
      }
      for (var j = 0; j < viableBoards.length; j++) {
         viableBoards[j] = new Board(JSON.parse(viableBoards[j]));
      }
      return viableBoards;

    }

    var recursiveSearch = function(size){
      //debugger;
      var emptyBoard = new Board({n: size});
      var tripleStackedArray = [emptyBoard];
      var i = 0;
      var deeperArray = [];
      var storage = [];
      while (size > i){

        if(i === 0){
          for (var k = 0; k < tripleStackedArray.length; k++) {
            deeperArray.push(findPossibilities(tripleStackedArray[k], 0));
            // console.log(deeperArray);
            // console.log(tripleStackedArray[j]);
          };  
        } else {
          var deepElementLength = deeperArray[0].slice().length * deeperArray.length;
          for (var j = 0; j < deepElementLength; j++) {
            if ( j === 0){
              storage = [];
            }
            //console.log(deeperArray[deeperArray.length -1]);
            storage.push(findPossibilities(deeperArray[deeperArray.length -1][j], i));
              
            if (j === deepElementLength -1){
              var tempStore = [_.flatten(storage,1)]; 
              
              deeperArray = tempStore;

              
            }
          }; 
          
        }
        
        i++;
      }
      var flat = _.flatten(deeperArray,1) 
      return flat;
    }
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    var output = recursiveSearch(n);
    return output;
};
