export function specificBoundaryStates(
    outsideLeft, outsideRight, outsideUp, outsideDown,
    insideLeft, insideRight, insideUp, insideDown
) {
    return {
        "outLeft": outsideLeft, "outRight": outsideRight,
        "outUp": outsideUp, "outDown": outsideDown,
        "inLeft": insideLeft, "inRight": insideRight,
        "inUp": insideUp, "inDown": insideDown
    };
}

export function allBoundaryStates(allBoundariesTileState) {
    return {
        "outLeft": allBoundariesTileState, "outRight": allBoundariesTileState,
        "outUp": allBoundariesTileState, "outDown": allBoundariesTileState,
        "inLeft": allBoundariesTileState, "inRight": allBoundariesTileState,
        "inUp": allBoundariesTileState, "inDown": allBoundariesTileState
    };
}