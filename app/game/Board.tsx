
import React, { EventHandler } from 'react';
import { useState, useEffect } from 'react';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';
import Cell from './Cell'

type TBoardProps = {
  sudokuRows: string[][];
  onBoardChange:(puzzleValue:string,coor:TCoordinates)=>void;
};

const Board = ({ sudokuRows,onBoardChange }: TBoardProps) => {

  const [thisBoradSudokuRows, setThisBoradSudokuRows] = useState(sudokuRows);

  if (!(thisBoradSudokuRows == sudokuRows)) {
    setThisBoradSudokuRows(sudokuRows);
  }
  const handleCellChange = (puzzleValue:string,coor:TCoordinates) => {
    onBoardChange(puzzleValue,coor);
  }
  return (
    <>
      <div
        id="sudoku-board"
        className="mx-auto my-8 grid aspect-square max-w-screen-md grid-rows-9 gap-0 border-2 border-gray-700"
      >
        {thisBoradSudokuRows?.map((row, rowIdx) => (
          <div
            className="grid grid-cols-9 gap-0"
            id={`sudoku-row-${rowIdx}`}
            key={`row-${rowIdx}`}
          >
            {row.map((col, colIdx) => (
              <Cell
                puzzleValue={col}
                coor={{ x: rowIdx, y: colIdx }}
                //isDisabled={!!completionTimeInSecs || col !== '.'}
                isDisabled={col !== '.'}
                key={`cell-${rowIdx}-${colIdx}`}
                onCellChange={handleCellChange}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Board;

