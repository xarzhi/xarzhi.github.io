export const setFinish = (finish) => {
    const finishEle = document.getElementById("finish");
    if (finishEle) {
        finishEle.innerText = finish ? "👏 恭喜!" : "🤔 加油";
    }
};
//# sourceMappingURL=statusbar.js.map