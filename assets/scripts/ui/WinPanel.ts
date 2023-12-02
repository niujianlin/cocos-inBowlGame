import UIBase from "./UIBase";
import { Util } from "../utils/Util";
import UIManager from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinPanel extends UIBase {

    @property(cc.Node) nextLevelButton: cc.Node = undefined;
    @property(cc.Node) backToMenuButton: cc.Node = undefined;


    onLoad () {
        super.onLoad()
    }

    init(uiManager: UIManager) {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType
        // 下一关按钮
        this.nextLevelButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.nextLevelButton)
        }, this)

        this.nextLevelButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.nextLevelButton, ()=> {
                // 下一关逻辑
                uiManager.onClickNextLevel()
            })

        }, this)
        
        this.nextLevelButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.nextLevelButton)
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
            // Util.clickUpTween(this.levelSelectButton)
        }, this)

    }

    // update (dt) {}
}
