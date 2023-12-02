import { UIType } from "./Enum";
import { StaticInstance } from "./StaticInstance";
import ControlPanel from "./ui/ControlPanel";
import LevelInfo from "./ui/LevelInfo";
import LevelSelect from "./ui/LevelSelect";
import StartMenu from "./ui/StartMenu";
import UIBase from "./ui/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Prefab) startMenuPrefab: cc.Prefab = undefined
    @property(cc.Prefab) levelSelectPrefab: cc.Prefab = undefined
    @property(cc.Prefab) controlPanelPrefab: cc.Prefab = undefined
    @property(cc.Prefab) levelInfoPrefab: cc.Prefab = undefined

    private uiMap = new Map<UIType, UIBase>()

    onLoad () {
        StaticInstance.setUIManager(this)

        this.initStartMenu()
        this.initLevelSelect()
        this.initControlPanel()
        this.initLevelInfoPanel()
    }

    /**
     * 点击开始游戏跳转到这里
     */
    gameStart(level: number) {
        // 跳转到游戏页面显示的东西，一个是控制面板，一个是得分
        this.showUI([UIType.ControlPanel, UIType.LevelInfo])
        StaticInstance.gameManager.gameStart(level)
        console.log("gamestart")
    }

    toLevelSelect() {
        console.log("tolevelselect")
        this.showUI([UIType.LevelSelect])
    }

    toStartMenu() {
        this.showUI([UIType.StartMenu])
    }

    setLevelInfo(level: number, nowItem: number, allNum: number) {
        const levelInfo = this.uiMap.get(UIType.LevelInfo) as LevelInfo
        levelInfo.setLevelLabel(level)
        levelInfo.setItemsLabel(nowItem, allNum)
        
    }

    showUI(showTypes: UIType[]) {
        this.uiMap.forEach((ui, type) => {
            if(showTypes.includes(type)) {
                ui.show()
            }else {
                ui.hide()
            }
        })
    }

    onRotateFood(angle: number) {
        StaticInstance.gameManager.onRotateFood(angle)
    }

    onClickLeftFood(dt: number) {
        StaticInstance.gameManager.onClickLeftFood(dt)
    }

    onClickRightFood(dt: number) {
        StaticInstance.gameManager.onClickRightFood(dt)
        
    }

    onClickDownFood(dt: number) {
        StaticInstance.gameManager.onClickDownFood(dt)
        
    }

    private initStartMenu() {
        const node = cc.instantiate(this.startMenuPrefab)
        this.node.addChild(node)
        node.setPosition(0, 0)
        const comp = node.getComponent(StartMenu)
        comp.init(this)
        this.uiMap.set(UIType.StartMenu, comp)

    }

    private initLevelSelect() {
        const node = cc.instantiate(this.levelSelectPrefab)
        this.node.addChild(node)
        node.setPosition(0, 0)
        const comp = node.getComponent(LevelSelect)
        comp.init(this)
        this.uiMap.set(UIType.LevelSelect, comp)

    }

    private initControlPanel() {
        const node = cc.instantiate(this.controlPanelPrefab)
        this.node.addChild(node)
        node.setPosition(0, 0)
        const comp = node.getComponent(ControlPanel)
        comp.init(this)
        this.uiMap.set(UIType.ControlPanel, comp)

    }

    private initLevelInfoPanel() {
        const node = cc.instantiate(this.levelInfoPrefab)
        this.node.addChild(node)
        node.setPosition(0, 0)
        const comp = node.getComponent(LevelInfo)
        this.uiMap.set(UIType.LevelInfo, comp)

    }

    // update (dt) {}
}
