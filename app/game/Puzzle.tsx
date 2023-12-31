'use client'
import React from 'react';
import { useState, useEffect } from 'react';

import Board from './Board';
import { generateSudokuRows } from '@/lib/sudoku';
import { getSudoku } from 'sudoku-gen';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';

const Puzzle = () => {
  //const sudokuRows = (await getSudokuRows(params.id)) ?? [];
  const sudoKuPuzzle = getSudoku();
  const sudokuBlank = generateSudokuRows('293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5');
  var sudoKuRows= generateSudokuRows(sudoKuPuzzle.puzzle);
  const [thisSudokuRows, setThisSudokuRows] = useState(sudoKuRows);
  
  const handleButtonNew = () => {
    console.log('handleButtonNew +');
    const sudoKuPuzzle= getSudoku();
    const sudoKuRows= generateSudokuRows(sudoKuPuzzle.puzzle);
    setThisSudokuRows(sudoKuRows);
  }


  const handleBoardChange = (puzzleValue:string,coor:TCoordinates) => {

    console.log('handleBoardUpdate +');
    console.log(puzzleValue);
    console.log(coor);
    console.log(thisSudokuRows);
    var sudoKuRowsUpdate = thisSudokuRows;
    sudoKuRowsUpdate[coor.x][coor.y]='';
    setThisSudokuRows(sudoKuRowsUpdate);
    sudoKuRowsUpdate[coor.x][coor.y]=puzzleValue;
    setThisSudokuRows(sudoKuRowsUpdate);
    console.log(sudoKuRowsUpdate);
  }

  return (
    <>
    <div className="w-full ">
      <Board sudokuRows={thisSudokuRows} onBoardChange={handleBoardChange}/>
      </div>
      <div className="w-full grid grid-cols-3">
      <button id="new" onClick={handleButtonNew}>生成新题</button>
      <button id="check">确认提交</button>
      <button id="answer">查看答案</button>
      </div>
    </>
  );
};

export default Puzzle;
