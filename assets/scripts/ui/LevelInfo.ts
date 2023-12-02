import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelInfo extends UIBase {

    @property(cc.Label) nowLevelLabel: cc.Label | undefined = undefined;
    @property(cc.Label) nowItemsLabel: cc.Label | undefined = undefined;

    onLoad () {
        super.onLoad()
        // console.log("执行onloadmei")

    }

    setLevelLabel(level: number) {
        const levelToStr = ['', '一', '二', '三', '四', '五', '六']
        this.nowLevelLabel.string = `第${levelToStr[level]}关`
    }

    setItemsLabel(nowNum: number, allNum: number) {
        this.nowItemsLabel.string = `${nowNum}/${allNum}`
    }

    // update (dt) {}
}
