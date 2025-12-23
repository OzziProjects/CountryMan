'use strict';

import { PlayerEntity } from "./Classes/player.js";
import { runGameplay, keyTracker, mapVisuals, mapBoundaryStates } from "./Screens/gameplay.js";
import { worldBundleBoundaries } from "./WorldBundleBoundaries/allWorldBundles.js";

// const mainContainer = document.getElementById("mainContainer");
const canvas = document.getElementById('game');
const startMenuElement = document.getElementById("game-StartMenu");
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

let domHasLoaded = false;

const allMainScreens = {startMenu: false, gameplay: true, pauseMenu: false};
const allSubScreens = {
  startMenu: {main: true, settings: false}
};

export let currentMainScreen = "gameplay";

const initialStartMenuSettingsValues = [100, 100, 100, 100, 0, 0, false];
const startMenuSettings = {
  0: {
    id: document.getElementById("game-StartMenuSettings-VolumeText"),
    name: "Volume", value: initialStartMenuSettingsValues[0]
  },
  1: {
    id: document.getElementById("game-StartMenuSettings-SaturationText"),
    name: "Saturate", value: initialStartMenuSettingsValues[1]
  },
  2: {
    id: document.getElementById("game-StartMenuSettings-BrightnessText"),
    name: "Brightness", value: initialStartMenuSettingsValues[2]
  },
  3: {
    id: document.getElementById("game-StartMenuSettings-ContrastText"),
    name: "Contrast", value: initialStartMenuSettingsValues[3]
  },
  4: {
    id: document.getElementById("game-StartMenuSettings-HueRotateText"),
    name: "HueRotate", value: initialStartMenuSettingsValues[4]
  },
  5: {
    id: document.getElementById("game-StartMenuSettings-SepiaText"),
    name: "Sepia", value: initialStartMenuSettingsValues[5]
  },
  6: {
    id: document.getElementById("game-StartMenuSettings-InvertText"),
    name: "Invert", value: initialStartMenuSettingsValues[6]
  }
}
const startMenuSettingsNames = ["Volume", "Saturate", "Brightness", "Contrast", "HueRotate", "Sepia", "Invert"];

const playerEntity = new PlayerEntity;

export const canvasEntities = {
  player: playerEntity
};

export const gameData = {
  settings: {
    sound: {volume: startMenuSettings[0].value},
    graphics: {
      saturation: startMenuSettings[1].value,
      brightness: startMenuSettings[2].value,
      contrast: startMenuSettings[3].value,
      hueRotate: startMenuSettings[4].value,
      sepia: startMenuSettings[5].value,
      invert: startMenuSettings[6].value
    }
  }
}
export const worldData = {
  maps: []
};

export const playerUIData = {
  health: {
    regular: 100,
    armour: 0
  },
  currency: 0,
  inventory: {
    maxLimit: 5,
    items: []
  }
};
function updateGameData() {
  gameData.settings = {
    sound: {volume: startMenuSettings[0].value},
    graphics: {
      saturation: startMenuSettings[1].value,
      brightness: startMenuSettings[2].value,
      contrast: startMenuSettings[3].value,
      hueRotate: startMenuSettings[4].value,
      sepia: startMenuSettings[5].value,
      invert: startMenuSettings[6].value
    }
  };
}

function startMenuSettingsTextUpdate() {
  function updateText(id, name, value) {
    if (name === "Invert") {id.textContent = `${name}`;}
    else {id.textContent = `${name}: ${value}`;}
  }
  startMenuSettingsNames.forEach((name, i) => {
    updateText(startMenuSettings[i].id, startMenuSettings[i].name, startMenuSettings[i].value);
  });
}
function startMenuSettingsValueUpdate(index, value) {
  if (Number.isInteger(parseInt(value)) === true) {
    startMenuSettings[index].value = parseInt(value);
  }
  else {
    if (startMenuSettings[index].name === "Invert") {
      if (!value) {startMenuSettings[index].value = 0;}
      else {startMenuSettings[index].value = 100;}
    };
  }
  
  startMenuSettingsTextUpdate();
  updateGameData();

  const sound = gameData.settings.sound;
  const graphics = gameData.settings.graphics;
  const values = [
    sound.volume, graphics.saturation, graphics.brightness, graphics.contrast,
    graphics.hueRotate, graphics.sepia, graphics.invert
  ];
  const elements = [canvas, startMenuElement];
  elements.forEach(element => {
    element.style.filter = `saturate(${values[1]}%) brightness(${values[2]}%) contrast(${values[3]}%) hue-rotate(${values[4]}deg) sepia(${values[5]}%) invert(${values[6]}%)`;
  });
}
function startMenuSettingsResetASetting(id, index, value) {
  document.getElementById(id).value = value;
  startMenuSettingsValueUpdate(index, value);
}
function initialStartMenuSettings() {
  const values = [100, 100, 100, 100, 0, 0, false];
  values.forEach((value, i) => {
    startMenuSettingsValueUpdate(i, value);
  });
}
function trackScreenChange() {
  if (currentMainScreen === "startMenu") {
    canvas.style.display = "none";
    startMenuElement.style.display = "flex";
    console.log(currentMainScreen);
  }
  else if (currentMainScreen === "gameplay") {
    canvas.style.display = "block";
    startMenuElement.style.display = "none";
  }
  else if (currentMainScreen === "pauseMenu") {}
}

trackScreenChange();
initialStartMenuSettings();

function startMenuEventListeners() {
  document.getElementById("game-StartMenuOptions-Start").addEventListener("click", () => {
    allMainScreens.startMenu = false; allMainScreens.gameplay = true;
    currentMainScreen = "gameplay";
    trackScreenChange();
  });
  document.getElementById("game-StartMenuOptions-Settings").addEventListener("click", () => {
    if (allMainScreens.startMenu && allSubScreens.startMenu.main) {
      document.getElementById("game-StartMenuOptions").style.display = "none";
      document.getElementById("game-StartMenuSettings").style.display = "flex";
      document.getElementById("game-StartMenuReturn").style.display = "flex";
      allSubScreens.startMenu.main = false;
      allSubScreens.startMenu.settings = true;
    }
  });
  document.getElementById("game-StartMenuReturn").addEventListener("click", () => {
      document.getElementById("game-StartMenuOptions").style.display = "flex";
      document.getElementById("game-StartMenuSettings").style.display = "none";
      document.getElementById("game-StartMenuReturn").style.display = "none";
      allSubScreens.startMenu.main = true;
      allSubScreens.startMenu.settings = false;
  });

  document.getElementById("game-StartMenuSettings-VolumeRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(0, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-SaturationRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(1, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-BrightnessRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(2, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-ContrastRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(3, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-HueRotateRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(4, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-SepiaRange").addEventListener("mousemove", (e) => {
    startMenuSettingsValueUpdate(5, e.target.value);
  });
  document.getElementById("game-StartMenuSettings-InvertCheckbox").addEventListener("click", (e) => {
    startMenuSettingsValueUpdate(6, e.target.checked);
  });
  
  document.getElementById("game-StartMenuSettings-ResetVolume").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-VolumeRange", 0, initialStartMenuSettingsValues[0]);
  });
  document.getElementById("game-StartMenuSettings-ResetSaturation").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-SaturationRange", 1, initialStartMenuSettingsValues[1]);
  });
  document.getElementById("game-StartMenuSettings-ResetBrightness").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-BrightnessRange", 2, initialStartMenuSettingsValues[2]);
  });
  document.getElementById("game-StartMenuSettings-ResetContrast").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-ContrastRange", 3, initialStartMenuSettingsValues[3]);
  });
  document.getElementById("game-StartMenuSettings-ResetHueRotate").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-HueRotateRange", 4, initialStartMenuSettingsValues[4]);
  });
  document.getElementById("game-StartMenuSettings-ResetSepia").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-SepiaRange", 5, initialStartMenuSettingsValues[5]);
  });
  document.getElementById("game-StartMenuSettings-ResetInvert").addEventListener("click", () => {
    startMenuSettingsResetASetting("game-StartMenuSettings-InvertCheckbox", 6, initialStartMenuSettingsValues[6]);
    document.getElementById("game-StartMenuSettings-InvertCheckbox").checked = initialStartMenuSettingsValues[6];
  });
}

function gameplayEventListeners() {
  window.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyP":
        if (currentMainScreen === "gameplay") {
          currentMainScreen = "startMenu";
          allMainScreens.gameplay = false;
          allMainScreens.startMenu = true;
          trackScreenChange();
        }
        else if (currentMainScreen === "startMenu") {
          currentMainScreen = "gameplay";
          allMainScreens.gameplay = true;
          allMainScreens.startMenu = false;
          trackScreenChange();
        }
        break;
    }
  });
}

startMenuEventListeners();
gameplayEventListeners();

// What size are your grid boxes?
export const gridBoxAspectRatio = {'width': 32, 'height': 32};
const aspectRatio = {'width': 16, 'height': 9};
// const sizeMultiplier = 20;
const sizeMultiplier = 32;
// const sizeMultiplier = 60;

canvas.width = aspectRatio.width * sizeMultiplier;
canvas.height = aspectRatio.height * sizeMultiplier;
startMenuElement.style.width = `${aspectRatio.width * sizeMultiplier}px`;
startMenuElement.style.height = `${aspectRatio.height * sizeMultiplier}px`;

function scaleCanvas(scaleMultiplier) {
  // Assigning 'top left' to the canvas transform origin allows it to stay in place
  canvas.style.transform = `scale(${ scaleMultiplier }) translate(-50%, -50%)`;
  startMenuElement.style.transform = `scale(${ scaleMultiplier }) translate(-50%, -50%)`;

  // canvas.style.transform = `scale(${ scaleMultiplier }) translateX(-50%)`;
  // startMenuElement.style.transform = `scale(${ scaleMultiplier }) translateX(-50%)`;
}
// scaleCanvas(1.5);
scaleCanvas(0.9);
// scaleCanvas(0.5);

function animate(timestamp) {
  if (!domHasLoaded) { requestAnimationFrame(animate); return; }

  if (allMainScreens.gameplay) {
    runGameplay();
  }

  requestAnimationFrame(animate);
}

function loadedDOMCheck() {
  window.addEventListener('DOMContentLoaded', () => {
    domHasLoaded = true;
  });
}
function viewDataEventListeners() {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    switch(e.code) {
      case "Numpad1":
        console.log(gameData);
        break;
      case "Numpad2":
        console.log(worldData);
        break;
      case "Numpad3":
        console.log(playerUIData);
        break;
      case "Numpad4":
        console.log(allMainScreens, allSubScreens);
        break;
      case "Numpad5":
        console.log(
          "playerLastMove", canvasEntities.player.lastMove,
          "playerPosX", canvasEntities.player.position.x,
          "playerScreenPosX", canvasEntities.player.screenPosition.x,
          "playerCameraMoveTrackerX", canvasEntities.player.cameraMoveTracker.x,
          "worldMapPosX", worldData.maps[0].position.x
        );
        break;
      case "Numpad6":
        console.log(mapVisuals);
        console.log(mapBoundaryStates);
        break;
      case "Numpad7":
        console.log("Player Current Map", canvasEntities.player.currentMap);
        console.log(canvasEntities.player.positionInMap.x, canvasEntities.player.positionInMap.y);
        break;
      case "Numpad8":
        console.log(worldBundleBoundaries);
        break;
    }
  });
}

loadedDOMCheck();
viewDataEventListeners();

animate();