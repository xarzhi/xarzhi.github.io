import { Vector3 } from "three";
class CubeData {
    constructor(cubeOrder = 3, colors = ["#fb3636", "#ff9351", "#fade70", "#9de16f", "#51acfa", "#da6dfa"]) {
        this._size = 1;
        this.elements = [];
        this.cubeOrder = cubeOrder;
        this.colors = colors;
        this.initElements();
    }
    get elementSize() {
        return this._size;
    }
    ;
    /**
     * 初始化数据
     * @param localDataFirst 是否从 localStorage 读取数据
     */
    initElements(localDataFirst = true) {
        if (localDataFirst && localStorage) {
            this.elements = this.getLocalData();
        }
        if (this.elements.length === this.cubeOrder * this.cubeOrder * 6) {
            return;
        }
        this.initialFinishData();
    }
    /**
     * 创建复原的数据
     */
    initialFinishData() {
        this.elements = [];
        const border = (this.cubeOrder * this._size) / 2 - 0.5;
        // top and bottom
        for (let x = -border; x <= border; x++) {
            for (let z = -border; z <= border; z++) {
                this.elements.push({
                    color: this.colors[0],
                    pos: new Vector3(x, border + this._size * 0.5, z),
                    normal: new Vector3(0, 1, 0)
                });
                this.elements.push({
                    color: this.colors[1],
                    pos: new Vector3(x, -border - this._size * 0.5, z),
                    normal: new Vector3(0, -1, 0)
                });
            }
        }
        // left and right
        for (let y = -border; y <= border; y++) {
            for (let z = -border; z <= border; z++) {
                this.elements.push({
                    color: this.colors[2],
                    pos: new Vector3(-border - this._size * 0.5, y, z),
                    normal: new Vector3(-1, 0, 0),
                });
                this.elements.push({
                    color: this.colors[3],
                    pos: new Vector3(border + this._size * 0.5, y, z),
                    normal: new Vector3(1, 0, 0)
                });
            }
        }
        // front and back
        for (let x = -border; x <= border; x++) {
            for (let y = -border; y <= border; y++) {
                this.elements.push({
                    color: this.colors[4],
                    pos: new Vector3(x, y, border + this._size * 0.5),
                    normal: new Vector3(0, 0, 1),
                    withLogo: x === 0 && y === 0
                });
                this.elements.push({
                    color: this.colors[5],
                    pos: new Vector3(x, y, -border - this._size * 0.5),
                    normal: new Vector3(0, 0, -1)
                });
            }
        }
        // this.elements.forEach((ele) => console.log(ele.pos));
    }
    /**
     * 保存数据至 localStorage
     */
    saveDataToLocal() {
        const data = JSON.stringify(this.elements);
        if (localStorage) {
            localStorage.setItem(`${this.cubeOrder}-Rubik`, data);
        }
    }
    /**
     * 从 localStorage 读取数据
     * @returns
     */
    getLocalData() {
        if (localStorage) {
            const data = localStorage.getItem(`${this.cubeOrder}-Rubik`);
            if (data) {
                const parseData = JSON.parse(data);
                parseData.forEach((item) => {
                    item.normal = new Vector3(item.normal.x, item.normal.y, item.normal.z);
                    item.pos = new Vector3(item.pos.x, item.pos.y, item.pos.z);
                });
                return parseData;
            }
        }
        return [];
    }
}
export default CubeData;
//# sourceMappingURL=cubeData.js.map