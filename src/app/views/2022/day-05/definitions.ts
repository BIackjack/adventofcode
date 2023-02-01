import { Stack } from "../../../helpers/stack";

export type Move = {
    src: string,
    dst: string,
    nbMoves: number
};

export type MovingCrate = {
    crateLabel: string;
    srcStack: string;
    dstStack: string;
}

export type State = {
    stacks: Stack[];
    message: string;
    movingCrate?: MovingCrate;
}