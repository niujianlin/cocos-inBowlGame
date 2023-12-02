import UIBase from "./UIBase";
import { Util } from "../utils/Util";
import UIManager from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LosePanel extends UIBase {

    @property(cc.Node) playAgainButton: cc.Node = undefined;
    @property(cc.Node) backToMenuButton: cc.Node = undefined;


    onLoad () {
        super.onLoad()
    }

    init(uiManager: UIManager) {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType
        // 重新玩这一关按钮
        this.playAgainButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.playAgainButton)
        }, this)

        this.playAgainButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.playAgainButton, ()=> {
                // 重新玩逻辑
                uiManager.onClickPlayAgain()
            })

        }, this)
        
        this.playAgainButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.playAgainButton)
        }, this)

        // 返回按钮
        this.backToMenuButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.backToMenuButton)
        }, this)

        this.backToMenuButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.backToMenuButton, () => {
                // 返回逻辑
                uiManager.onClickBackToStartMenu()
            })

        }, this)
        
        this.backToMenuButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.backToMenuButton)
        }, this)

    }

    // update (dt) {}
}
