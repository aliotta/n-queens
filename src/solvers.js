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
    n = n + 3; //remove me eventually
    
    var findPossibilities = function(matrix){
       var viableBoards = [];
       var skip;
       

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          skip = false;
          var toggledBoard = matrix;
          if(toggledBoard.rows()[i][j] !== 1){
            toggledBoard.togglePiece(i, j);
          } else {
            skip = true;
          }
          if (skip === true) {

          } else{
            var test1 = toggledBoard.hasAnyColConflicts();
            var test2 = toggledBoard.hasAnyRowConflicts();
            if (!(test1 || test2)){ //fix metest1
              
              var copy = toggledBoard.rows().slice();
              
              

              viableBoards.push(JSON.stringify(copy));

              matrix.togglePiece(i,j);


              
            }
          }
          
        }
      }
      for (var i = 0; i < viableBoards.length; i++) {
         viableBoards[i] = new Board(JSON.parse(viableBoards[i]));
      }

      return viableBoards;

    }

    var recursiveSearch = function(size){
      var emptyBoard = new Board({n: size});
      var tripleStackedArray = [emptyBoard];
      var i = 0;
      var deeperArray = [];
      while (size > i){
         // deeperArray = [];
        // _.each(tripleStackedArray, function(val, index, collection){

        //  deeperArray.push(findPossibilities(val))
        // });
        if(i === 0){
          for (var j = 0; j < tripleStackedArray.length; j++) {
            deeperArray.push(findPossibilities(tripleStackedArray[j]));
          };  
        } else {
          for (var j = 0; j < deeperArray.length; j++) {
            deeperArray.push(findPossibilities(deeperArray[0][j]));
          };  
        }
        
        i++;
      }
      return deeperArray.length;
    }

    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    //debugger;
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
