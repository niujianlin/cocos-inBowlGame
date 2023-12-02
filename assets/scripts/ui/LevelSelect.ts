import UIManager from "../UIManager";
import { DataStorage } from "../utils/DataStorage";
import { Util } from "../utils/Util";
import UIBase from "./UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelSelect extends UIBase {

    @property(cc.Node) backStartButton: cc.Node = undefined
    @property(cc.Node) levelsRoot: cc.Node = undefined

    onLoad() {
        super.onLoad()

    }

    show() {
        super.show()
        const unLockLevel = DataStorage.getUnLockLevel()  // 本地存储放着解锁几关
        const maxLevel = DataStorage.getMaxLevel()       // 本地存储着一共几关，默认6
        this.levelsRoot.children.forEach((node, index) => {
            const labelNode = node.children[1]
            const labelComp = labelNode.getComponent(cc.Label)
            const level = index + 1
            // 假设解锁前三关
            labelComp.string = level <= unLockLevel ? '已解锁': '未解锁'
        })
    }

    init(uiManager: UIManager) {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = cc.Node.EventType
        // 开始游戏按钮
        this.backStartButton.on(TOUCH_START, () => {
            console.log('click down')
            Util.clickDownTween(this.backStartButton)
        }, this)

        this.backStartButton.on(TOUCH_END, () => {
            console.log('click up')
            Util.clickUpTween(this.backStartButton, ()=> {
                uiManager.toStartMenu()
            })

        }, this)
        
        this.backStartButton.on(TOUCH_CANCEL, () => {
            console.log('click cancel')
            // Util.clickUpTween(this.startButton)
        }, this)


        // 关卡列表
        this.levelsRoot.children.forEach((node, index) => {
            const button = node.children[0]

            button.on(TOUCH_START, ()=> {
                Util.clickDownTween(button)
            }, this)

            button.on(TOUCH_END, () => {
                Util.clickUpTween(button, () => {
                    const level = index + 1
                    const unLockLevel = DataStorage.getUnLockLevel()
                    if(level <= unLockLevel) {
                        uiManager.gameStart(level)
                    }
                    
                })
            }, this)

            button.on(TOUCH_CANCEL, () => {Util.clickUpTween(button)}, this)
        
        })

    }
}
