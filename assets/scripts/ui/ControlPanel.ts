import UIManager from "../UIManager";
import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPanel extends UIBase {

    @property(cc.Node) clickDownButton: cc.Node = undefined
    @property(cc.Node) clickLeftButton: cc.Node = undefined
    @property(cc.Node) clickRightButton: cc.Node = undefined
    @property(cc.Node) panelBkNode: cc.Node = undefined
    @property(cc.Node) panelMidNode: cc.Node = undefined


    onLoad () {
        super.onLoad()
    }

    init(uiManager:UIManager) {
        const {TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType

        // 轮盘事件
        this.panelBkNode.on(TOUCH_START, (event: cc.Event.EventTouch) => {
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            this.panelMidNode.setPosition(pos)
            const angle = cc.misc.radiansToDegrees(Math.atan2(pos.y, pos.x))
            // 传出角度
            
        }, this)

        this.panelBkNode.on(TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            //移动时限制位置
            this.panelMidNode.setPosition(this.limitMidNodePos(pos))
        }, this)

        this.panelBkNode.on(TOUCH_END, () => {
            this.panelMidNode.setPosition(0, 0)
        }, this)
        this.panelBkNode.on(TOUCH_CANCEL, () => {
            this.panelMidNode.setPosition(0, 0)
        }, this)
    }

    limitMidNodePos(pos: cc.Vec2) {
        const R = 130
        // 取当前位置长度
        const len = pos.mag()
        // 利用比例计算
        const ratio = len > R ? R/len : 1
        return cc.v2(pos.x*ratio, pos.y*ratio)
    }

    // update (dt) {}
}
