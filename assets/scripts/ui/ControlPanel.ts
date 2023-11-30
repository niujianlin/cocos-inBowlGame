import UIManager from "../UIManager";
import { Util } from "../utils/Util";
import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPanel extends UIBase {

    @property(cc.Node) clickDownButton: cc.Node = undefined
    @property(cc.Node) clickLeftButton: cc.Node = undefined
    @property(cc.Node) clickRightButton: cc.Node = undefined
    @property(cc.Node) panelBkNode: cc.Node = undefined
    @property(cc.Node) panelMidNode: cc.Node = undefined


    leftOpen: boolean = false
    rightOpen: boolean = false

    uiManager: UIManager | undefined = undefined

    onLoad () {
        super.onLoad()
    }

    init(uiManager:UIManager) {
        this.uiManager = uiManager
        const {TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType

        // 轮盘事件
        this.panelBkNode.on(TOUCH_START, (event: cc.Event.EventTouch) => {
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            this.panelMidNode.setPosition(pos)
            const angle = cc.misc.radiansToDegrees(Math.atan2(pos.y, pos.x))
            // 传出角度
            // console.log("传角度前")
            uiManager.onRotateFood(angle)
            
        }, this)

        this.panelBkNode.on(TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            //移动时限制位置
            this.panelMidNode.setPosition(this.limitMidNodePos(pos))
            const angle = cc.misc.radiansToDegrees(Math.atan2(pos.y, pos.x))
            // 传出角度
            uiManager.onRotateFood(angle)
        }, this)

        this.panelBkNode.on(TOUCH_END, () => {
            this.panelMidNode.setPosition(0, 0)
        }, this)
        this.panelBkNode.on(TOUCH_CANCEL, () => {
            this.panelMidNode.setPosition(0, 0)
        }, this)

        // 左向按钮
        this.clickLeftButton.on(TOUCH_START, () => {
            Util.clickDownTween(this.clickLeftButton)
            this.leftOpen = true
        }, this)

        this.clickLeftButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickLeftButton)
            this.leftOpen = false
        }, this)
        
        this.clickLeftButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.clickLeftButton)
            this.leftOpen = false
        }, this)

        // 右向按钮
        this.clickRightButton.on(TOUCH_START, () => {
            Util.clickDownTween(this.clickRightButton)
            this.rightOpen = true
        }, this)

        this.clickRightButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickRightButton)
            this.rightOpen = false

        }, this)
        
        this.clickRightButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.clickRightButton)
            this.rightOpen = false

        }, this)

        // 下落按钮
        this.clickDownButton.on(TOUCH_START, () => {
            Util.clickDownTween(this.clickDownButton)
        }, this)

        this.clickDownButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickDownButton)
            uiManager.onClickDownFood()
        }, this)
        
        this.clickDownButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.clickDownButton)
        }, this)
    }

    // 每一帧去传递
    update(dt: number) {
        this.leftOpen && this.uiManager && this.uiManager.onClickLeftFood(dt)
        this.rightOpen && this.uiManager && this.uiManager.onClickRightFood(dt)
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
