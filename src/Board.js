// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      // since all values are either 0 or 1, if you reduce over a row and the sum/total is more than 1, you have a conflict. 
      var count = _.reduce(row, function(a,b){return a +b}, 0);
      return !(count < 2);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rotated = this.rotateMatrix();
      return rotated.hasRowConflictAt(colIndex); 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rotated = this.rotateMatrix();
      return rotated.hasAnyRowConflicts(); 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //array of arrays: all the rows. 
     var matrix = this.rows();
     var diagonal = [];
     var shifter;

     if (majorDiagonalColumnIndexAtFirstRow > 0) {
       shifter = majorDiagonalColumnIndexAtFirstRow;
     } else {
       shifter = 0;
     }
     //for the nth iterations through the columns and the rows, push those values to the diagnols array.
     // - major... because as you iterate, the diagonals get smaller
     for (var i = 0; i < matrix.length - shifter; i++) {
      //you only want to change the access point not the value, that's why you add inside, to the index.
       if (i + majorDiagonalColumnIndexAtFirstRow >= 0) {
          diagonal.push(matrix[i][i + majorDiagonalColumnIndexAtFirstRow]);
       };
     }

      var diagonalCount = _.reduce(diagonal, function(a,b){return a + b}, 0);
      return !(diagonalCount < 2);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var diagonalsLength = (this.rows().length * 2) - 3;
      var startDiagonal = (this.rows().length * -1) + 1; 
      for (var i = startDiagonal; i < diagonalsLength + startDiagonal; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    rotateMatrix: function(){
      var matrix = this.rows();
      var size = matrix.length;
      var rotated = [];
      for (var i = 0; i < size; i++) {
        rotated.push([]);
        for (var k = 0; k < size; k++) {
          rotated[i][k] = matrix[size - k - 1][i];
        };
      };
      var newBoard = new Board(rotated);
      return newBoard;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = minorDiagonalColumnIndexAtFirstRow;

      for( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ) {
        if( colIdx < size ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
      // var rotated = this.rotateMatrix();
      // return rotated.hasMajorDiagonalConflictAt(minorDiagonalColumnIndexAtFirstRow); 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var size = this.get('n');

      for( var i = (size * 2) - 1; i >= 0; i-- ) {
        if( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;
          
      // var rotated = this.rotateMatrix();
      // return rotated.hasAnyMajorDiagonalConflicts(); 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
