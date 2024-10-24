/**
 * get the angle between two Vector2
 * @returns angles in radian
 */
export const getAngleBetweenTwoVector2 = (vec1, vec2) => {
    const dotValue = vec1.clone().dot(vec2);
    const angle = Math.acos(dotValue / (vec1.length() * vec2.length()));
    return angle;
};
export const equalDirection = (vec1, vec2, precision = 0.1) => {
    const angle = vec1.angleTo(vec2);
    return Math.abs(angle) < precision;
};
//# sourceMappingURL=math.js.map