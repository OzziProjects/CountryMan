import { allBoundaryStates, specificBoundaryStates } from "../../boundaries.js";

export const worldBundle1Boundaries = {
    "row0": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row1": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row2": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row3": [],
    "row4": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row5": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row6": [
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        allBoundaryStates(true), allBoundaryStates(true), allBoundaryStates(true), allBoundaryStates(true),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
    ],
    "row7": [],
    "row8": [
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
    ],
    "row9": [allBoundaryStates(true)]
};