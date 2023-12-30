import type { Metadata } from 'next'
import Cell from './Cell'

type TBoardProps = {
    sudokuRows: string[][];
  };
  
const Board = ({ sudokuRows }: TBoardProps) => {
  console.log(sudokuRows)
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
              puzzleValue={col}
              coor={{ x: rowIdx, y: colIdx }}
              //isDisabled={!!completionTimeInSecs || col !== '.'}
              isDisabled={col !== '.'}
              key={`cell-${rowIdx}-${colIdx}`}
            />
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default Board;

