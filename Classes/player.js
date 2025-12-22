import { keyTracker, rogueCamera, mapVisuals, mapBoundaryStates } from "../Screens/gameplay.js";
import { canvasEntities, worldData, gridBoxAspectRatio } from "../index.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class PlayerEntity {
    constructor() {
        this.firstName = "Luke";
        this.lastName = "Bennett";
        this.color = "yellow";
        this.width = 32;
        this.height = 32;
        this.speed = 1;
        
        this.screenPosition = {
            x: (canvas.width / 2) - (this.width / 2), 
            y: (canvas.height / 2) - (this.height / 2)
        };
        this.origPosition = {x: 672, y: 224};
        this.position = {x: this.origPosition.x, y: this.origPosition.y};
        this.cameraMoveTracker = {x: 0, y: 0};

        this.numOfSteps = 0;
        this.numOfStepsRequirement = 32;

        this.move = false;
        this.lastMove = "None";
        this.verticalOrHorizontalDirection = "None";

        this.currentMap = 0;
        this.positionInMap = {x: 0, y: 0};
    }
    draw() {
        this.screenPosition = {
            x: (canvas.width / 2) - (this.width / 2),
            y: (canvas.height / 2) - (this.height / 2)
        };
        
        ctx.fillStyle = this.color;
        if (!rogueCamera) {
            ctx.fillRect(
                this.screenPosition.x, this.screenPosition.y, 
                this.width, this.height
            );
        }
        else {
            ctx.fillRect(
                this.screenPosition.x + this.cameraMoveTracker.x, 
                this.screenPosition.y + this.cameraMoveTracker.y,
                this.width, this.height
            );
        }
    }
    update() {
        // Use this to keep track of how many buttons are true at once
        this.draw();
        this.updatePlayerCurrentMap(this);
        this.movement(this, false);
    }
    updatePlayerCurrentMap(player) {
        for (let i = 0; i < worldData.maps.length; i++) {
            const map = worldData.maps[i];
            if (player.position.x >= map.position.x &&
                player.position.x + player.width <= map.position.x + (map.tileswide * map.tilewidth) &&
                player.position.y >= map.position.y &&
                player.position.y + player.height <= map.position.y + (map.tileshigh * map.tileheight)
            ) {
                player.currentMap = map.mapIndex;
                Object.assign(player.positionInMap, {x: (player.position.x - map.position.x), y: (player.position.y - map.position.y)});
            }
        }
    }
    surroundingTileIsInSameMap(player, direction) {
        const tilePosition = {x: 0, y: 0};
        let currentMap = 0;
        const tilePositionInMap = {x: 0, y: 0};
        let sameAsPlayerMap = false;
        let tileBoundary = {in: false, out: false};

        let row = 0;

        switch (direction) {
            case "Up":
                tilePosition.x = player.position.x;
                tilePosition.y = player.position.y - player.height;
                break;
            case "Down":
                tilePosition.x = player.position.x;
                tilePosition.y = player.position.y + player.height;
                break;
            case "Left":
                tilePosition.x = player.position.x - player.width;
                tilePosition.y = player.position.y;
                break;
            case "Right":
                tilePosition.x = player.position.x + player.width;
                tilePosition.y = player.position.y;
                break;
        }

        for (let i = 0; i < worldData.maps.length; i++) {
            const map = worldData.maps[i];
            if (tilePosition.x >= map.position.x &&
                tilePosition.x + player.width <= map.position.x + (map.tileswide * map.tilewidth) &&
                tilePosition.y >= map.position.y &&
                tilePosition.y + player.height <= map.position.y + (map.tileshigh * map.tileheight)
            ) {
                currentMap = map.mapIndex;
                Object.assign(tilePositionInMap, {x: (tilePosition.x - map.position.x), y: (tilePosition.y - map.position.y)});
                switch (direction) {
                    case "Up":
                        row = Math.ceil(tilePositionInMap.y / map.tileheight);
                        break;
                    case "Down":
                        row = Math.floor(tilePositionInMap.y / map.tileheight);
                        break;
                    case "Left":
                        row = Math.ceil(tilePositionInMap.y / map.tileheight);
                        break;
                    case "Right":
                        row = Math.floor(tilePositionInMap.y / map.tileheight);
                        break;
                }

                const column = Math.trunc(tilePositionInMap.x / map.tilewidth);
                const tileIndex = Math.trunc((row * map.tileswide) + column);

                switch (direction) {
                    case "Up":
                        tileBoundary.in = mapBoundaryStates[currentMap][tileIndex].inUp;
                        tileBoundary.out = mapBoundaryStates[currentMap][tileIndex].outUp; break;
                    case "Down":
                        tileBoundary.in = mapBoundaryStates[currentMap][tileIndex].inDown; 
                        tileBoundary.out = mapBoundaryStates[currentMap][tileIndex].outDown; break;
                    case "Left":
                        tileBoundary.in = mapBoundaryStates[currentMap][tileIndex].inLeft; 
                        tileBoundary.out = mapBoundaryStates[currentMap][tileIndex].outLeft; break;
                    case "Right":
                        tileBoundary.in = mapBoundaryStates[currentMap][tileIndex].inRight;
                        tileBoundary.out = mapBoundaryStates[currentMap][tileIndex].outRight; break;
                }

                if (currentMap === player.currentMap) {
                    sameAsPlayerMap = true;
                    return {
                        boundary: tileBoundary,
                        sameMap: sameAsPlayerMap,
                        positionInMap: tilePositionInMap,
                        index: tileIndex
                    };
                }
                else {
                    return {
                        boundary: tileBoundary,
                        sameMap: sameAsPlayerMap,
                        positionInMap: tilePositionInMap,
                        index: tileIndex
                    };
                }
            }
        }
        return {
            boundary: tileBoundary
        };
    }
    playerIsOnTile(player, direction) {
        const currentMap = worldData.maps[player.currentMap];
        const tilePos = {x: 0, y: 0};
        let rowOfTiles = 0;
        let totalTiles = 0;
        let tileIndex = 0;
        let tileBoundary = false;

        currentMap.layers[0].tiles.forEach(tile => {
            if (tilePos.x === player.positionInMap.x && tilePos.y === player.positionInMap.y &&
                player.positionInMap.x % player.numOfStepsRequirement === 0 &&
                player.positionInMap.y % player.numOfStepsRequirement === 0
            ) {
                switch (direction) {
                    case "Up":
                        tileBoundary = mapBoundaryStates[player.currentMap][tileIndex].inUp; break;
                    case "Down":
                        tileBoundary = mapBoundaryStates[player.currentMap][tileIndex].inDown; break;
                    case "Left":
                        tileBoundary = mapBoundaryStates[player.currentMap][tileIndex].inLeft; break;
                    case "Right":
                        tileBoundary = mapBoundaryStates[player.currentMap][tileIndex].inRight; break;
                }
                return tileBoundary;
            }

            totalTiles++;
            tileIndex++;

            tilePos.x += gridBoxAspectRatio.width;
            if (tile.x === currentMap.tileswide - 1) {
                if (tile.y === currentMap.tileshigh - 1) {return tileBoundary;}
                rowOfTiles++;
                tilePos.y += gridBoxAspectRatio.height;
                tilePos.x = 0;
            }
        });
        return tileBoundary;
    }
    playerBoundaries(player) {
        if (keyTracker.w) {
            const inUpBoundary = this.playerIsOnTile(player, "Up");
            if (inUpBoundary) {return true;}

            const outUpBoundary = this.surroundingTileIsInSameMap(player, "Up");
            if (outUpBoundary.boundary.out && outUpBoundary.positionInMap.x % 32 === 0) {return true;}
            return false;
        }
        else if (keyTracker.s) {
            const inDownBoundary = this.playerIsOnTile(player, "Down");
            if (inDownBoundary) {return true;}
            
            const outDownBoundary = this.surroundingTileIsInSameMap(player, "Down");
            if (outDownBoundary.boundary.out && outDownBoundary.positionInMap.x % 32 === 0) {return true;}
            return false;
        }
        else if (keyTracker.a) {
            const inLeftBoundary = this.playerIsOnTile(player, "Left");
            if (inLeftBoundary) {return true;}

            const outLeftBoundary = this.surroundingTileIsInSameMap(player, "Left");
            if (outLeftBoundary.boundary.out && outLeftBoundary.positionInMap.x % 32 === 0) {return true;}
            return false;
        }
        else if (keyTracker.d) {
            const inRightBoundary = this.playerIsOnTile(player, "Right");
            if (inRightBoundary) {return true;}

            const outRightBoundary = this.surroundingTileIsInSameMap(player, "Right");
            if (outRightBoundary.boundary.out && outRightBoundary.positionInMap.x % 32 === 0) {return true;}

            return false;
        }
        return false;
    }
    movementValueChanges(player, direction) {
        switch(direction) {
            case "Up":
                player.position.y -= player.speed;
                break;
            case "Down":
                player.position.y += player.speed;
                break;
            case "Left":
                player.position.x -= player.speed;
                break;
            case "Right":
                player.position.x += player.speed;
                break;
        }
    }
    completedSteps(player) {
        if (player.verticalOrHorizontalDirection !== "Horizontal" && (keyTracker.w || keyTracker.s)) {
            if (keyTracker.w) {this.movementValueChanges(player, "Up");}
            else if (keyTracker.s) {this.movementValueChanges(player, "Down");}
        }
        else if (player.verticalOrHorizontalDirection !== "Vertical" && (keyTracker.a || keyTracker.d)) {
            if (keyTracker.a) {this.movementValueChanges(player, "Left");}
            else if (keyTracker.d) {this.movementValueChanges(player, "Right");}
        }
        else if (player.lastMove === "Up") {this.movementValueChanges(player, "Up");}
        else if (player.lastMove === "Down") {this.movementValueChanges(player, "Down");}
        else if (player.lastMove === "Left") {this.movementValueChanges(player, "Left");}
        else if (player.lastMove === "Right") {this.movementValueChanges(player, "Right");}
    }
    movement(player) {
        if (rogueCamera) {return;}
        let obstacle = this.playerBoundaries(player);
        if (obstacle) {return;}
        if (
            player.position.x % player.numOfStepsRequirement === 0 &&
            player.position.y % player.numOfStepsRequirement === 0
        ) {
            if (keyTracker.w) {
                player.verticalOrHorizontalDirection = "Vertical";
                player.lastMove = "Up"; this.completedSteps(player);
            }
            else if (keyTracker.s) {
                player.verticalOrHorizontalDirection = "Vertical";
                player.lastMove = "Down"; this.completedSteps(player);
            }
            else if (keyTracker.a) {
                player.verticalOrHorizontalDirection = "Horizontal";
                player.lastMove = "Left"; this.completedSteps(player);
            }
            else if (keyTracker.d) {
                player.verticalOrHorizontalDirection = "Horizontal";
                player.lastMove = "Right"; this.completedSteps(player);
            }
        }
        else if (
            player.position.x % player.numOfStepsRequirement !== 0 || 
            player.position.y % player.numOfStepsRequirement !== 0
        ) {
            player.move = true;
            this.completedSteps(player);
            if (
                player.position.x % player.numOfStepsRequirement === 0 && 
                player.position.y % player.numOfStepsRequirement === 0
            ) {
                player.move = false;
                player.lastMove = "None";
                player.verticalOrHorizontalDirection = "None";
            }
        }
    }
}