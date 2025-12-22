import { gridBoxAspectRatio } from "../index.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class SpecialTileEntity {
    constructor({image, type, totalFrames, totalFramesPerFrame}) {
        this.img = image;
        this.type = type;
        this.totalFrames = totalFrames - 1;
        this.currentFrame = 0;
        this.currentFramePosition = 0;
        this.totalFramesPerFrame = totalFramesPerFrame;
        this.currentFramePerFrame = 0;
    }
    update() {
        if (this.currentFrame === this.totalFrames) {
            this.currentFrame = 0;
            this.currentFramePosition = this.currentFrame * gridBoxAspectRatio.width;
        }
        else {
            if (this.currentFramePerFrame === this.totalFramesPerFrame) {
                console.log(this.currentFrame, this.currentFramePerFrame);
                this.currentFramePerFrame = 0;
                this.currentFrame++;
                this.currentFramePosition = this.currentFrame * gridBoxAspectRatio.width;
            }
            else {
                this.currentFramePerFrame++;
            }
        }
    }
}