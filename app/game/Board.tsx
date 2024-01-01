
import React, { EventHandler } from 'react';
import { useState, useEffect } from 'react';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';
import Cell from './Cell'

type TBoardProps = {
  sudokuRows: string[][];
  sudokuStatus: string[][];
  onBoardChange: (puzzleValue: string, coor: TCoordinates) => void;
};

const Board = ({ sudokuRows, sudokuStatus, onBoardChange }: TBoardProps) => {


  const handleCellChange = (inputValue: string, coor: TCoordinates) => {
    onBoardChange(inputValue, coor);
  }
  return (
    <>
      <div
        id="sudoku-board"
        className="mx-auto my-8 grid aspect-square max-w-screen-md grid-rows-9 gap-0 border-2 border-gray-700"
      >
        {sudokuRows?.map((row, rowIdx) => (
          <div
            className="grid grid-cols-9 gap-0"
            id={`sudoku-row-${rowIdx}`}
            key={`row-${rowIdx}`}
          >
            {row.map((col, colIdx) => (
              <Cell
                cellValue={col == '-' ? '' : col}
                cellStatus = {sudokuStatus[rowIdx][colIdx]}
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

