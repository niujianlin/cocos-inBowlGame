import UIManager from "../UIManager";
import { Util } from "../utils/Util";
import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenu extends UIBase {

    @property(cc.Node) startButton: cc.Node = undefined
    @property(cc.Node) levelSelectButton: cc.Node = undefined

    onLoad() {
        super.onLoad()
    }

    show() {
        super.show()
        // 摇摆动画
        const node = this.startButton.children[0]
        // 防止重复调用
        node.stopAllActions()
        node.angle = 0
        cc.tween(node).repeatForever(
            cc.tween()
                .to(1, {angle: 10})
                .to(1, {angle: 0})
        ).start()

    }

    init(uiManager: UIManager) {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType
        // 开始游戏按钮
        this.startButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.startButton)
        }, this)

        this.startButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.startButton, ()=> {
                uiManager.gameStart(1) // 默认第一关开始
            })

        }, this)
        
        this.startButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.startButton)
        }, this)

        // 关卡选择
        this.levelSelectButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.levelSelectButton)
        }, this)

        this.levelSelectButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.levelSelectButton, () => {
                uiManager.toLevelSelect()
            })

        }, this)
        
        this.levelSelectButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.levelSelectButton)
        }, this)


    }


    
}
