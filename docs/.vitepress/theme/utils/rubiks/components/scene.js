import { Color, Scene } from "three";
const createScene = (bgColor) => {
    const scene = new Scene();
    // scene.background = new Color(bgColor);
    return scene;
};
export default createScene;