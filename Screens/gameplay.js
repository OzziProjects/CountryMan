'use strict';

import { SpecialTileEntity } from "../Classes/specialTile.js";
import { gridBoxAspectRatio, canvasEntities, worldData, playerUIData, currentMainScreen } from "../index.js";
import { worldBundleBoundaries } from "../WorldBundleBoundaries/allWorldBundles.js";
import { allMapUrls } from "../mapsList.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export const keyTracker = {
    "arrowLeft": false, "arrowRight": false, "arrowUp": false, "arrowDown": false,
    "w": false, "s": false, "a": false, "d": false
};

const numOfMaps = 3;
export const mapVisuals = [];
export const mapBoundaryStates = [];
let mapVisualsLoaded = false;
let mapBoundaryStatesLoaded = false;

function resetCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const worldBundle1Img = new Image();
const movingWater1Img = new Image();

function displayImgOnCanvas() {
    worldBundle1Img.addEventListener("load", () => {
        getData();
    });
    worldBundle1Img.src = "Images/Tiles/WorldBundle1.png";
    movingWater1Img.src = "Images/Tiles/SpecialTiles/MovingWater1.png";
}
displayImgOnCanvas();

let getDataLoaded = false;
async function getData() {
    try {
        for (let i = 0; i < allMapUrls.length; i++) {
            const response = await fetch(allMapUrls[i]);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            worldData.maps.push(result);
        }
        
        console.log(worldData);
        getDataLoaded = true;
    }
    catch (error) {
        console.error(error.message);
    }
}

const specialTilesTimers = {
    water: new SpecialTileEntity({image: movingWater1Img, type: "Water", totalFrames: 5, totalFramesPerFrame: 40}),
}

// Camera Data
const cameraSpeed = 4;
export let cameraReset = true;
export let rogueCamera = false;
export let rogueCameraPosition = {x: 0, y: 0};

function resetEntityCameraPosition(entity) {
    if (rogueCamera) {
        entity.position.x -= canvasEntities.player.cameraMoveTracker.x;
        entity.position.y -= canvasEntities.player.cameraMoveTracker.y;
    }
}
export function resetAllCameraPositions() {
    if (rogueCamera) {
        if (cameraReset) {
            worldData.maps.forEach(map => {
                resetEntityCameraPosition(map);
            });
            Object.assign(canvasEntities.player.cameraMoveTracker, {x: 0, y: 0});

            if (worldData.maps.length === numOfMaps) {
                cameraReset = false;
            }
        }
    }
    else {
        if (worldData.maps.length === numOfMaps) {
            cameraReset = false;
        }
    }
}
function cameraEventListeners() {
    window.addEventListener("keydown", (event) => {
        if (currentMainScreen === "gameplay") {
          switch (event.code) {
            case "ArrowUp":
              keyTracker.arrowUp = true;
              break;
            case "ArrowDown":
              keyTracker.arrowDown = true;
              break;
            case "ArrowLeft":
              keyTracker.arrowLeft = true;
              break;
            case "ArrowRight":
              keyTracker.arrowRight = true;
              break;
          }
        }
    });
    window.addEventListener("keyup", (event) => {
        if (currentMainScreen === "gameplay") {
          switch (event.code) {
            case "ArrowUp":
                keyTracker.arrowUp = false;
                break;
            case "ArrowDown":
                keyTracker.arrowDown = false;
                break;
            case "ArrowLeft":
                keyTracker.arrowLeft = false;
                break;
            case "ArrowRight":
                keyTracker.arrowRight = false;
                break;
            case "Slash":
                cameraReset = true;
                resetAllCameraPositions();
                rogueCamera = false;
                break;
          }
        }
    });
}
function moveCamera() {
    if (keyTracker.arrowUp) {
        cameraReset = true;
        rogueCamera = true;
        worldData.maps.forEach(map => {
            map.position.y += cameraSpeed;
        });
        canvasEntities.player.cameraMoveTracker.y += cameraSpeed;
    }
    else if (keyTracker.arrowDown) {
        cameraReset = true;
        rogueCamera = true;
        worldData.maps.forEach(map => {
            map.position.y -= cameraSpeed;
        });
        canvasEntities.player.cameraMoveTracker.y -= cameraSpeed;
    }
    if (keyTracker.arrowLeft) {
        cameraReset = true;
        rogueCamera = true;
        worldData.maps.forEach(map => {
            map.position.x += cameraSpeed;
        });
        canvasEntities.player.cameraMoveTracker.x += cameraSpeed;
    }
    else if (keyTracker.arrowRight) {
        cameraReset = true;
        rogueCamera = true;
        worldData.maps.forEach(map => {
            map.position.x -= cameraSpeed;
        });
        canvasEntities.player.cameraMoveTracker.x -= cameraSpeed;
    }
}
cameraEventListeners();

function playerMovementEventListeners() {
    window.addEventListener("keydown", (event) => {
        if (currentMainScreen === "gameplay") {
          switch (event.code) {
            case "KeyW":
              keyTracker.w = true;
              canvasEntities.player.move = true;
              cameraReset = true;
              resetAllCameraPositions();
              rogueCamera = false;
              break;
            case "KeyS":
              keyTracker.s = true;
              canvasEntities.player.move = true;
              cameraReset = true;
              resetAllCameraPositions();
              rogueCamera = false;
              break;
            case "KeyA":
              keyTracker.a = true;
              canvasEntities.player.move = true;
              cameraReset = true;
              resetAllCameraPositions();
              rogueCamera = false;
              break;
            case "KeyD":
              keyTracker.d = true;
              canvasEntities.player.move = true;
              cameraReset = true;
              resetAllCameraPositions();
              rogueCamera = false;
              break;
          }
        }
    });
    window.addEventListener("keyup", (event) => {
        if (currentMainScreen === "gameplay") {
          switch (event.code) {
            case "KeyW":
                keyTracker.w = false;
                canvasEntities.player.move = false;
                break;
            case "KeyS":
                keyTracker.s = false;
                canvasEntities.player.move = false;
                break;
            case "KeyA":
                keyTracker.a = false;
                canvasEntities.player.move = false;
                break;
            case "KeyD":
                keyTracker.d = false;
                canvasEntities.player.move = false;
                break;
          }
        }
    });
}
playerMovementEventListeners();

{/* For example, a limit of 8 means that there are only up to 8 tiles on each row
    of the Tiles file. If you change it to something else, like 12 tiles per row,
    change this tileRowLimit to 12. */}
const tileRowLimit = 20;
export function findXAndYIndexOfTileSource(numOfTile) {
    const findXIndex = ((numOfTile % tileRowLimit)) * gridBoxAspectRatio.width;
    const findYIndex = ((numOfTile - (numOfTile % tileRowLimit)) / tileRowLimit) * gridBoxAspectRatio.height;
    return {x: findXIndex, y: findYIndex, column: findXIndex / gridBoxAspectRatio.width, row: findYIndex / gridBoxAspectRatio.height};
}

const tileBoundarySides = [
    "outLeft", "outRight", "outUp", "outDown",
    "inLeft", "inRight", "inUp", "inDown"
];
function addToMapVisual(mapIndex, tileSrcIndices) {
    if (tileSrcIndices.row === 9) {
        switch (tileSrcIndices.column) {
            case 0:
                mapVisuals[mapIndex].push("Water"); break;
        }
        return;
    }
    else {
        mapVisuals[mapIndex].push("Regular");
    }
}
function addMapBoundaryState(mapData, tileBoundaries) {
    let tileBoundaryStates = {};

    for (let i = 0; i < tileBoundarySides.length; i++) {
        tileBoundaryStates[tileBoundarySides[i]] = tileBoundaries[tileBoundarySides[i]];
    }
    mapBoundaryStates[mapData.mapIndex].push(tileBoundaryStates);
}
function tilesPlacer(mapData) {
    const boundaries = worldBundleBoundaries[mapData.worldTileset];
    const tilePos = {x: 0, y: 0};
    let rowOfTiles = 0;
    const tilesWide = mapData.tileswide;
    const tilesHigh = mapData.tileshigh;
    
    let totalTiles = 0;

    if (mapData === undefined) {
        return;
    }
    if (mapVisuals[mapData.mapIndex] === undefined) {mapVisuals.push([]);}
    if (mapVisuals[mapData.mapIndex].length === tilesWide * tilesHigh) {mapVisualsLoaded = true;}
    if (mapBoundaryStates[mapData.mapIndex] === undefined) {mapBoundaryStates.push([]);}
    if (mapBoundaryStates[mapData.mapIndex].length === tilesWide * tilesHigh) {mapBoundaryStatesLoaded = true;}
    
    mapData.layers[0].tiles.forEach(tile => {
        if (
            ((canvasEntities.player.screenPosition.x + (mapData.position.x - canvasEntities.player.position.x)) + tilePos.x <= canvas.width &&
            (canvasEntities.player.screenPosition.x + (mapData.position.x - canvasEntities.player.position.x)) + tilePos.x + mapData.tilewidth >= 0) &&
            ((canvasEntities.player.screenPosition.y + (mapData.position.y - canvasEntities.player.position.y)) + tilePos.y <= canvas.height &&
            (canvasEntities.player.screenPosition.y + (mapData.position.y - canvasEntities.player.position.y)) + tilePos.y + mapData.tileheight >= 0)
        ) {
            const tileSrcIndices = findXAndYIndexOfTileSource(tile.tile);
            if (!mapVisualsLoaded) {
                addToMapVisual(mapData.mapIndex, tileSrcIndices);
                addMapBoundaryState(mapData, boundaries[`row${tileSrcIndices.row}`][tileSrcIndices.column]);
            }
            if (tileSrcIndices.row === 9) {
                if (tileSrcIndices.column === 0) {
                    ctx.drawImage(
                        movingWater1Img, specialTilesTimers.water.currentFramePosition, 0,
                        mapData.tilewidth, mapData.tileheight, 
                        (canvasEntities.player.screenPosition.x + (mapData.position.x - canvasEntities.player.position.x)) + tilePos.x, 
                        (canvasEntities.player.screenPosition.y + (mapData.position.y - canvasEntities.player.position.y)) + tilePos.y, 
                        mapData.tilewidth, mapData.tileheight
                    );
                }
            }
            else {
                    ctx.drawImage(
                        worldBundle1Img, tileSrcIndices.x, tileSrcIndices.y, 
                        mapData.tilewidth, mapData.tileheight, 
                        (canvasEntities.player.screenPosition.x + (mapData.position.x - canvasEntities.player.position.x)) + tilePos.x, 
                        (canvasEntities.player.screenPosition.y + (mapData.position.y - canvasEntities.player.position.y)) + tilePos.y, 
                        mapData.tilewidth, mapData.tileheight
                    );
            }
        }
        else {
            const tileSrcIndices = findXAndYIndexOfTileSource(tile.tile);
            if (!mapBoundaryStatesLoaded && !mapVisualsLoaded) {
                addToMapVisual(mapData.mapIndex, tileSrcIndices);
                addMapBoundaryState(mapData, boundaries[`row${tileSrcIndices.row}`][tileSrcIndices.column]);
            }
        }

        totalTiles++;

        tilePos.x += gridBoxAspectRatio.width;
        if (tile.x === mapData.tileswide - 1) {
            rowOfTiles++;
            tilePos.y += gridBoxAspectRatio.height;
            tilePos.x = 0;
        }
    });
}

function createSpecialTileTimers() {
    specialTilesTimers.water.update();
}

function createMaps() {
    tilesPlacer(worldData.maps[0]);
    tilesPlacer(worldData.maps[1]);
    tilesPlacer(worldData.maps[2]);
}

function runGameEntities() {
    if (Object.keys(canvasEntities).length === 0) {return;}
    canvasEntities.player.update();
}

export function runGameplay() {
    // Do stuff inside of a fps function
    // Example => fpsFunction(timestamp);
    // For now, put reset function below
    resetCanvas();
    moveCamera();
    if (!getDataLoaded) {return;}
    createSpecialTileTimers();
    createMaps();
    runGameEntities();

    cameraReset = false;
}