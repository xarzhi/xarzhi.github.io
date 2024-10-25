import { Matrix4, Raycaster, Vector2, Vector3 } from "three";
import { rotateAroundWorldAxis, ndcToScreen } from "../util/transform";
import { setFinish } from "./statusbar";
let spanEle;
const testSquareScreenPosition = (cube, square, camera) => {
    if (!spanEle) {
        spanEle = document.createElement("span");
        spanEle.style.position = "absolute";
        spanEle.style.color = "pink";
        document.body.appendChild(spanEle);
    }
    const pos = new Vector3();
    // square.updateMatrixWorld();
    const matrix = new Matrix4().multiply(square.matrixWorld).multiply(cube.matrix);
    pos.applyMatrix4(matrix);
    pos.project(camera);
    const { x, y } = ndcToScreen(pos, window.innerWidth, window.innerHeight);
    spanEle.style.top = `${y}px`;
    spanEle.style.left = `${x}px`;
    console.log(x, y);
    spanEle.innerText = `1`;
};
class Control {
    constructor(camera, scene, renderer, cube) {
        this._square = null;
        this.start = false;
        this.lastOperateUnfinish = false;
        this.startPos = new Vector2();
        this.raycaster = new Raycaster();
        this.cube = cube;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
    }
    get domElement() {
        return this.renderer.domElement;
    }
    getIntersects(offsetX, offsetY) {
        const x = (offsetX / this.domElement.clientWidth) * 2 - 1;
        const y = -(offsetY / this.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera({ x, y }, this.camera);
        let intersectSquares = [];
        for (let i = 0; i < this.cube.squares.length; i++) {
            const intersects = this.raycaster.intersectObjects([this.cube.squares[i]]);
            if (intersects.length > 0) {
                intersectSquares.push({
                    distance: intersects[0].distance,
                    square: this.cube.squares[i]
                });
            }
        }
        intersectSquares.sort((item1, item2) => item1.distance - item2.distance);
        if (intersectSquares.length > 0) {
            return intersectSquares[0];
        }
        return null;
    }
    operateStart(offsetX, offsetY) {
        if (this.start) {
            return;
        }
        this.start = true;
        this.startPos = new Vector2();
        const intersect = this.getIntersects(offsetX, offsetY);
        this._square = null;
        if (intersect) {
            this._square = intersect.square;
            this.startPos = new Vector2(offsetX, offsetY);
            // testSquareScreenPosition(this.cube, this._square, this.camera);
        }
    }
    operateDrag(offsetX, offsetY, movementX, movementY) {
        if (this.start && this.lastOperateUnfinish === false) {
            if (this._square) {
                const curMousePos = new Vector2(offsetX, offsetY);
                this.cube.rotateOnePlane(this.startPos, curMousePos, this._square, this.camera, { w: this.domElement.clientWidth, h: this.domElement.clientHeight });
            }
            else {
                const dx = movementX;
                const dy = -movementY;
                const movementLen = Math.sqrt(dx * dx + dy * dy);
                const cubeSize = this.cube.getCoarseCubeSize(this.camera, {
                    w: this.domElement.clientWidth,
                    h: this.domElement.clientHeight
                });
                const rotateAngle = Math.PI * movementLen / cubeSize;
                const moveVect = new Vector2(dx, dy);
                const rotateDir = moveVect.rotateAround(new Vector2(0, 0), Math.PI * 0.5);
                rotateAroundWorldAxis(this.cube, new Vector3(rotateDir.x, rotateDir.y, 0), rotateAngle);
            }
            this.renderer.render(this.scene, this.camera);
        }
    }
    operateEnd() {
        if (this.lastOperateUnfinish === false) {
            if (this._square) {
                const rotateAnimation = this.cube.getAfterRotateAnimation();
                this.lastOperateUnfinish = true;
                const animation = (time) => {
                    const next = rotateAnimation(time);
                    this.renderer.render(this.scene, this.camera);
                    if (next) {
                        requestAnimationFrame(animation);
                    }
                    else {
                        setFinish(this.cube.finish);
                        this.lastOperateUnfinish = false;
                    }
                };
                requestAnimationFrame(animation);
            }
            this.start = false;
            this._square = null;
        }
    }
}
export class MouseControl extends Control {
    constructor(camera, scene, renderer, cube) {
        super(camera, scene, renderer, cube);
        this.mousedownHandle = this.mousedownHandle.bind(this);
        this.mouseupHandle = this.mouseupHandle.bind(this);
        this.mousemoveHandle = this.mousemoveHandle.bind(this);
        this.mouseoutHandle = this.mouseoutHandle.bind(this);
        this.init();
    }
    mousedownHandle(event) {
        event.preventDefault();
        this.operateStart(event.offsetX, event.offsetY);
    }
    mouseupHandle(event) {
        event.preventDefault();
        console.log("mouseup");
        this.operateEnd();
    }
    mouseoutHandle(event) {
        event.preventDefault();
        this.operateEnd();
    }
    mousemoveHandle(event) {
        event.preventDefault();
        this.operateDrag(event.offsetX, event.offsetY, event.movementX, event.movementY);
    }
    init() {
        this.domElement.addEventListener("mousedown", this.mousedownHandle);
        this.domElement.addEventListener("mouseup", this.mouseupHandle);
        this.domElement.addEventListener("mousemove", this.mousemoveHandle);
        this.domElement.addEventListener("mouseout", this.mouseoutHandle);
    }
    dispose() {
        this.domElement.removeEventListener("mousedown", this.mousedownHandle);
        this.domElement.removeEventListener("mouseup", this.mouseupHandle);
        this.domElement.removeEventListener("mousemove", this.mousemoveHandle);
        this.domElement.removeEventListener("mouseout", this.mouseoutHandle);
    }
}
export class TouchControl extends Control {
    constructor(camera, scene, renderer, cube) {
        super(camera, scene, renderer, cube);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.init();
    }
    touchStart(event) {
        event.preventDefault();
        const touches = event.touches;
        if (touches.length === 1) {
            const touch = touches[0];
            this.lastPos = new Vector2(touch.pageX, touch.pageY);
            this.operateStart(touch.pageX, touch.pageY);
        }
    }
    touchMove(event) {
        event.preventDefault();
        const touches = event.touches;
        if (touches.length === 1 && this.lastPos) {
            const touch = touches[0];
            this.operateDrag(touch.pageX, touch.pageY, touch.pageX - this.lastPos.x, touch.pageY - this.lastPos.y);
            this.lastPos = new Vector2(touch.pageX, touch.pageY);
        }
    }
    touchEnd(event) {
        event.preventDefault();
        this.lastPos = undefined;
        this.operateEnd();
    }
    init() {
        this.domElement.addEventListener("touchstart", this.touchStart);
        this.domElement.addEventListener("touchmove", this.touchMove);
        this.domElement.addEventListener("touchend", this.touchEnd);
    }
    dispose() {
        this.domElement.removeEventListener("touchstart", this.touchStart);
        this.domElement.removeEventListener("touchmove", this.touchMove);
        this.domElement.removeEventListener("touchend", this.touchEnd);
    }
}
export default Control;