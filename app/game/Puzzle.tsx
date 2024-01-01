'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

import Board from './Board';
import { generateSudokuRows, generateSudokuStatus, TCellStatus } from '@/lib/sudoku';
import { getSudoku } from 'sudoku-gen';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';

type TPuzzle = {
  puzzle: string;
  solution: string;
  difficulty: string;
  rows: string[][];
  status: string[][];
};
const Puzzle = () => {
  //const sudokuRows = (await getSudokuRows(params.id)) ?? [];
  var sudokuPuzzle: TPuzzle = {
    puzzle: '',
    solution: '',
    difficulty: '',
    rows: generateSudokuRows(''),
    status: generateSudokuStatus('')
  };

  const [thisSudokuPuzzle, setThisSudokuPuzzle] = useState(sudokuPuzzle);


  const handleButtonNew = () => {
    console.log('handleButtonNew +');
    const _sudokuPuzzle = getSudoku('easy');
    var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
    sudokuPuzzleUpdate.puzzle = _sudokuPuzzle.puzzle
    sudokuPuzzleUpdate.solution = _sudokuPuzzle.solution
    sudokuPuzzleUpdate.difficulty = _sudokuPuzzle.difficulty
    sudokuPuzzleUpdate.rows = generateSudokuRows(_sudokuPuzzle.puzzle);
    sudokuPuzzleUpdate.status = generateSudokuStatus(_sudokuPuzzle.puzzle);
    setThisSudokuPuzzle(sudokuPuzzleUpdate);
    console.log(sudokuPuzzleUpdate);
  }

  const handleButtonCheck = () => {
    console.log('handleButtonCheck +');
    console.log(thisSudokuPuzzle.solution);
    console.log(thisSudokuPuzzle.rows.join(',').replaceAll(',', ''));
    if (!(thisSudokuPuzzle.solution == thisSudokuPuzzle.rows.join(',').replaceAll(',', ''))) {
      var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
      for (let i = 0; i < sudokuPuzzleUpdate.status.length; i++) {
        for (let j = 0; j < sudokuPuzzleUpdate.status[i].length; j++) {
          sudokuPuzzleUpdate.status[i][j] = '5';
        }
      }
      setThisSudokuPuzzle(sudokuPuzzleUpdate);
    }
  }

  const handleButtonAnswer = () => {
    console.log('handleButtonNew +');
    var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
    sudokuPuzzleUpdate.rows = generateSudokuRows(sudokuPuzzleUpdate.solution);
    for (let i = 0; i < sudokuPuzzleUpdate.status.length; i++) {
      for (let j = 0; j < sudokuPuzzleUpdate.status[i].length; j++) {
        sudokuPuzzleUpdate.status[i][j] = '2';
      }
    }
    setThisSudokuPuzzle(sudokuPuzzleUpdate);
  }


  const handleBoardChange = (inputValue: string, coor: TCoordinates) => {

    if (checkSolutionValidity(inputValue, coor, thisSudokuPuzzle.rows)) {
      console.log('handleBoardUpdate +');
      var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
      sudokuPuzzleUpdate.rows[coor.x][coor.y] = inputValue;
      if (inputValue == ''){
        sudokuPuzzleUpdate.status[coor.x][coor.y] = '1';
      }else{
        sudokuPuzzleUpdate.status[coor.x][coor.y] = '2';
      }
      const rowsAnswer=sudokuPuzzleUpdate.status.join().replaceAll(',','');
      console.log(rowsAnswer);
      console.log(rowsAnswer.indexOf('1'));
      
      if(rowsAnswer.indexOf('1')==-1){
        console.log('win');

        for (let i = 0; i < sudokuPuzzleUpdate.status.length; i++) {
          for (let j = 0; j < sudokuPuzzleUpdate.status[i].length; j++) {
            sudokuPuzzleUpdate.status[i][j] = '5';
          }
        }
      }
      setThisSudokuPuzzle(sudokuPuzzleUpdate);
    } else {

      var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
      const lastStatus = sudokuPuzzleUpdate.status[coor.x][coor.y];
      const x = coor.x;
      const y = coor.y;
      sudokuPuzzleUpdate.status[coor.x][coor.y] = '3';
      setThisSudokuPuzzle(sudokuPuzzleUpdate);
      setTimeout(function () {
        var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
        sudokuPuzzleUpdate.status[x][y] = lastStatus;
        setThisSudokuPuzzle(sudokuPuzzleUpdate);
      }, 500);
    }
  }

  return (
    <>
      <div className="w-full ">
        <Board sudokuRows={thisSudokuPuzzle.rows} sudokuStatus={thisSudokuPuzzle.status} onBoardChange={handleBoardChange} />
      </div>
      <div className="w-full grid grid-cols-2">
        <button id="new" onClick={handleButtonNew}>生成新题</button>
        <button id="answer" onClick={handleButtonAnswer}>查看答案</button>
      </div>
    </>
  );
};

export default Puzzle;
