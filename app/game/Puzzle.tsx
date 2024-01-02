'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

import Board from './Board';
import { generateSudokuRows, generateSudokuStatus, TCellStatus } from '@/lib/sudoku';
import { getSudoku } from 'sudoku-gen';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';
import confetti from 'canvas-confetti';


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
  const [promptContent, setPromptContent] = useState('欢迎光临超级数独游戏');


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
    setPromptContent('准备开始喽！');
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
        if (!(sudokuPuzzleUpdate.status[i][j] == '0')) {
          sudokuPuzzleUpdate.status[i][j] = '2';
        }
      }
    }
    setThisSudokuPuzzle(sudokuPuzzleUpdate);
  }


  const handleBoardChange = (inputValue: string, coor: TCoordinates) => {
    if (!(inputValue == '' || inputValue == '0')) {
      if (checkSolutionValidity(inputValue, coor, thisSudokuPuzzle.rows)) {
        console.log('handleBoardUpdate +');
        var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
        sudokuPuzzleUpdate.rows[coor.x][coor.y] = inputValue;
        sudokuPuzzleUpdate.status[coor.x][coor.y] = '2';
        const rowsAnswer = sudokuPuzzleUpdate.status.join().replaceAll(',', '');
        console.log(rowsAnswer);
        console.log(rowsAnswer.indexOf('1'));

        if (rowsAnswer.indexOf('1') == -1) {
          setPromptContent('恭喜过关！');
          confetti({
            particleCount: 400,
            spread: 270,
            shapes: ['circle', 'circle', 'square'],
            colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],
            gravity: 0.5,
            startVelocity: 50,
            ticks: 100
          }
          );
          for (let i = 0; i < sudokuPuzzleUpdate.status.length; i++) {
            for (let j = 0; j < sudokuPuzzleUpdate.status[i].length; j++) {
              if(sudokuPuzzleUpdate.status[i][j] == '0'){
                sudokuPuzzleUpdate.status[i][j] = '4';
              }else{
                sudokuPuzzleUpdate.status[i][j] = '5';
              }
            }
          }
        }
        else {
          setPromptContent('不错哟！');
        }
        setThisSudokuPuzzle(sudokuPuzzleUpdate);
      } else {
        var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
        const lastStatus = sudokuPuzzleUpdate.status[coor.x][coor.y];
        const x = coor.x;
        const y = coor.y;
        sudokuPuzzleUpdate.status[coor.x][coor.y] = '3';
        setThisSudokuPuzzle(sudokuPuzzleUpdate);
        setPromptContent('这里不能填' + inputValue + '哟');
        setTimeout(function () {
          var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
          sudokuPuzzleUpdate.status[x][y] = lastStatus;
          setThisSudokuPuzzle(sudokuPuzzleUpdate);
        }, 500);
        setTimeout(function () {
          setPromptContent('加油呀！');
        }, 3000);
      }
    } else {
      var sudokuPuzzleUpdate = cloneDeep(thisSudokuPuzzle);
      sudokuPuzzleUpdate.rows[coor.x][coor.y] = '';
      sudokuPuzzleUpdate.status[coor.x][coor.y] = '1';
      setThisSudokuPuzzle(sudokuPuzzleUpdate);
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="text-center w-80 rounded-full mt-4 mx-auto border border-transparent px-2 py-2 transition-colors border-gray-300">{promptContent}</div>
      </div>
      <div className="w-full">
        <Board sudokuRows={thisSudokuPuzzle.rows} sudokuStatus={thisSudokuPuzzle.status} onBoardChange={handleBoardChange} />
      </div>
      <div className="w-full mx-auto text-center">
        <button
          id="new"
          className="group rounded-lg mx-2 border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={handleButtonNew}>生成新题</button>
        <button
          id="answer"
          className="group rounded-lg mx-2 border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={handleButtonAnswer}>查看答案</button>
      </div>
    </>
  );
};

export default Puzzle;
