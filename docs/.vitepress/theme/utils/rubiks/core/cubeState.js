import { Vector3 } from "three";
class CubeState {
    constructor(squares) {
        /** 是否正处于旋转状态 */
        this.inRotation = false;
        /**
         * 已经旋转的角度（弧度）
         */
        this.rotateAnglePI = 0;
        /** 正在旋转的方块 */
        this.activeSquares = [];
        this._squares = squares;
    }
    setRotating(control, actives, direction, rotateAxisLocal) {
        this.inRotation = true;
        this.controlSquare = control;
        this.activeSquares = actives;
        this.rotateDirection = direction;
        this.rotateAxisLocal = rotateAxisLocal;
    }
    resetState() {
        this.inRotation = false;
        this.activeSquares = [];
        this.controlSquare = undefined;
        this.rotateDirection = undefined;
        this.rotateAxisLocal = undefined;
        this.rotateAnglePI = 0;
    }
    /**
     * 是否是六面对齐
     */
    validateFinish() {
        let finish = true;
        const sixPlane = [
            {
                nor: new Vector3(0, 1, 0),
                squares: []
            },
            {
                nor: new Vector3(0, -1, 0),
                squares: []
            },
            {
                nor: new Vector3(-1, 0, 0),
                squares: []
            },
            {
                nor: new Vector3(1, 0, 0),
                squares: []
            },
            {
                nor: new Vector3(0, 0, 1),
                squares: []
            },
            {
                nor: new Vector3(0, 0, -1),
                squares: []
            },
        ];
        for (let i = 0; i < this._squares.length; i++) {
            const plane = sixPlane.find((item) => this._squares[i].element.normal.equals(item.nor));
            plane.squares.push(this._squares[i]);
        }
        for (let i = 0; i < sixPlane.length; i++) {
            const plane = sixPlane[i];
            if (!plane.squares.every((square) => square.element.color === plane.squares[0].element.color)) {
                finish = false;
                break;
            }
        }
        return finish;
    }
}
export default CubeState;
//# sourceMappingURL=cubeState.js.map