import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Board from './Board';
import { generateSudokuRows } from '@/lib/sudoku';



const Puzzle = () => {
  //const sudokuRows = (await getSudokuRows(params.id)) ?? [];
  const sudokuRows = generateSudokuRows('293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5');
  return (
    <>
      <Board sudokuRows={sudokuRows} />
    </>
  );
};

export default Puzzle;
