import { Matrix4 } from "three";
export const rotateAroundWorldAxis = (object, axis, radians) => {
    const mat = new Matrix4();
    mat.makeRotationAxis(axis.normalize(), radians);
    mat.multiply(object.matrix);
    object.matrix = mat;
    object.rotation.setFromRotationMatrix(object.matrix);
};
export const ndcToScreen = (ndc, winW, winH) => {
    const halfW = winW * 0.5;
    const halfH = winH * 0.5;
    const x = (ndc.x * halfW) + halfW;
    const y = halfH - (ndc.y * halfH);
    return { x, y };
};
//# sourceMappingURL=transform.js.map