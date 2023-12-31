'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';


type TCellProps = {
    puzzleValue: string;
    coor: TCoordinates;
    isDisabled: boolean;
    onCellChange:(puzzleValue:string,coor:TCoordinates)=>void;
};

const Cell = ({ puzzleValue, coor, isDisabled, onCellChange}: TCellProps) => {

    const [thisPuzzleValue, setThisPuzzleValue] = useState(puzzleValue);

    if (!(thisPuzzleValue == puzzleValue)) {
        setThisPuzzleValue(puzzleValue);
    }

    const handleInput = (inputValue: string, inputCoor: TCoordinates) => {
        if (!!parseInt(inputValue)) {
            console.log('handleInput +');
            console.log(inputValue);
            setThisPuzzleValue(inputValue);
            onCellChange(inputValue,{
                x: coor.x,
                y: coor.y,
            });
        }
        else {
            setThisPuzzleValue('');
        }
    }

    return (
        <div
            id={`sudoku-cell-${coor.x}${coor.y}`}
            className={classNames('flex aspect-square items-center border text-blue-700', {
                'border-b-gray-700': (coor.x + 1) % 3 === 0 && coor.x < 8,
                'border-r-gray-700': (coor.y + 1) % 3 === 0 && coor.y < 8,
                //'text-red-700': invalidCoors.includes(`${coor.x}${coor.y}`), // mark text number to red when invalid
            })}>
            <input
                className="h-full w-full grow text-center text-2xl font-bold sm:text-2xl md:text-2xl"
                type="number"
                min={0}
                max={9}
                maxLength={1}
                value={thisPuzzleValue}
                onChange={(e) =>
                    void handleInput(
                        e.target.value.split('').pop() as string, // making sure only single digit is being inputted
                        {
                            x: coor.x,
                            y: coor.y,
                        }
                    )
                }
            />
        </div>
    )
}

export default Cell;