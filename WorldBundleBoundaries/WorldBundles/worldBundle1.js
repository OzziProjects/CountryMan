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
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row3": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row4": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row5": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row6": [
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),
        allBoundaryStates(false), allBoundaryStates(false),
    ],
    "row7": [
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        specificBoundaryStates(false, false, true, true, false, false, true, true),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, true, true, false, true, true),
        specificBoundaryStates(true, false, true, true, false, true, true, true),
        allBoundaryStates(true),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),
    ],
    "row8": [
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        specificBoundaryStates(false, false, true, true, false, false, true, true),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, true, true, false, true, true),
        specificBoundaryStates(true, false, true, true, false, true, true, true),
        allBoundaryStates(true),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),
    ],
    "row9": [
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
    ],
    "row10": [
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),

        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),

        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),

        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),

        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),

    ],
    "row11": [
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),

        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),

        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),

        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),

        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
    ],
    "row12": [
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),

        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),

        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),

        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),

        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
    ],
    "row13": [
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),

        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),

        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),

        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),

        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
    ],
    "row14": [
        specificBoundaryStates(true, true, true, false, true, true, false, true),
        specificBoundaryStates(false, true, true, false, true, false, false, true),
        specificBoundaryStates(false, false, true, false, false, false, false, true),
        specificBoundaryStates(true, false, true, false, false, true, false, true),

        specificBoundaryStates(true, true, false, true, true, true, true, false),
        specificBoundaryStates(false, true, false, true, true, false, true, false),
        specificBoundaryStates(false, false, false, true, false, false, true, false),
        specificBoundaryStates(true, false, false, true, false, true, true, false),

        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        specificBoundaryStates(true, true, false, false, true, true, false, false),
        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
        
        allBoundaryStates(false), allBoundaryStates(false), allBoundaryStates(false),

        specificBoundaryStates(false, true, false, false, true, false, false, false),
        specificBoundaryStates(true, false, false, false, false, true, false, false),
    ],
    "row15": [
        allBoundaryStates(true),
    ],
};