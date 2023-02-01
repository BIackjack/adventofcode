import { Stack } from "../../../helpers/stack";

export type Move = {
    src: string,
    dst: string,
    nbMoves: number
};

export type MovingCrates = {
    nbCratesMoved: number;
    srcStack: string;
    dstStack: string;
}

export type State = {
    stacks: Stack[];
    message: string;
    movingCrates?: MovingCrates;
}