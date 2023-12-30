// 在服务器组件中添加"use client"指令
"use client"
import type { Metadata } from 'next'
import classNames from 'classnames';
import { checkSolutionValidity, TCoordinates } from '../../lib/sudoku';


type TCellProps = {
    puzzleValue: string | number;
    coor: TCoordinates;
    isDisabled: boolean;
  };

  const fillPuzzle = (val: string, coor: TCoordinates) => {
    if (!val || val === '0') {
      //removeSolution(coor);
    }
    // if (parseInt(val) > 0) {
    //   // when input is valid, create coorStr
    //   // and check solution validity
    //   const coorStr = `${coor.x}${coor.y}`;
    //   const isSolutionForCellValid = checkSolutionValidity(val, coor, solution);

    //   // solution is invalid, and coordinate not stored in invalidCoors
    //   if (!isSolutionForCellValid && !invalidCoors.includes(coorStr)) {
    //     // store `coorStr` to `invalidCoors`
    //     addInvalidCoors(coorStr);
    //   }

    //   // solution is valid, but `coorStr` previously deemed as invalid
    //   if (isSolutionForCellValid && invalidCoors.includes(coorStr)) {
    //     // remove `coorStr` from `invalidCoors`
    //     // update `invalidCoors` value
    //     removeInvalidCoors(coorStr);
    //   }

    //   fillSolution(val, coor);
    // }
  };

  const handleInput =  (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    console.log(newValue);
    //self.puzzleValue = newValue;
    }

  const Cell = ({ puzzleValue, coor, isDisabled }: TCellProps) => {
    return (
      <div
      id={`sudoku-cell-${coor.x}${coor.y}`}
      className={classNames('flex aspect-square items-center border text-red-700', {
        'border-b-gray-700': (coor.x + 1) % 3 === 0 && coor.x < 8,
        'border-r-gray-700': (coor.y + 1) % 3 === 0 && coor.y < 8,
        //'text-red-700': invalidCoors.includes(`${coor.x}${coor.y}`), // mark text number to red when invalid
      })}>
        <input
          className="h-full w-full grow text-center text-lg font-bold sm:text-xl md:text-2xl"
          type="number"
          min={0}
          max={9}
          maxLength={1} 
          value={puzzleValue}
          onChange={handleInput}
          />
      </div>
    )
  }
  
export default Cell;