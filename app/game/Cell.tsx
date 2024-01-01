'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';
import { checkSolutionValidity, TCoordinates } from '@/lib/sudoku';


type TCellProps = {
    cellValue: string | number;
    cellStatus: string;
    coor: TCoordinates;
    isDisabled: boolean;
    onCellChange: (puzzleValue: string, coor: TCoordinates) => void;
};

const Cell = ({ cellValue, cellStatus, coor, isDisabled, onCellChange }: TCellProps) => {

    const handleChange = (inputValue: string, inputCoor: TCoordinates) => {
        console.log(inputValue);
        if (!!inputValue) {
            onCellChange(inputValue, {
                x: coor.x,
                y: coor.y,
            });
        }
        else {
            onCellChange('', {
                x: coor.x,
                y: coor.y,
            });


        }
    }

    return (
        <div
            id={`sudoku-cell-${coor.x}${coor.y}`}
            className={classNames('flex aspect-square items-center border', {
                'border-b-gray-700': (coor.x + 1) % 3 === 0 && coor.x < 8,
                'border-r-gray-700': (coor.y + 1) % 3 === 0 && coor.y < 8,
            })}>
            <input
                className={classNames('h-full w-full grow text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl transition duration-500', {
                    'text-gray-700': cellStatus == '0', // mark text number to red when invalid
                    'bg-gray-100': cellStatus == '0', // mark text number to red when invalid
                    'text-blue-700': parseInt(cellStatus) >= 1, // mark text number to red when invalid
                    'text-blue-500': cellStatus == '2', // mark text number to red when invalid
                    'bg-red-100': cellStatus == '3', // mark text number to red when invalid
                    'text-red-500': cellStatus == '4', // mark text number to red when invalid
                    'bg-green-100': cellStatus == '5', // mark text number to red when invalid
                    'text-green-700': cellStatus == '5', // mark text number to red when invalid
                })}
                type="number"
                min={0}
                max={9}
                maxLength={1}
                value={cellValue}
                onChange={(e) =>
                    void handleChange(
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