import { UIType } from "./Enum";
import { StaticInstance } from "./StaticInstance";
import ControlPanel from "./ui/ControlPanel";
import LevelSelect from "./ui/LevelSelect";
import StartMenu from "./ui/StartMenu";
import UIBase from "./ui/UIBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Prefab) startMenuPrefab: cc.Prefab = undefined
    @property(cc.Prefab) levelSelectPrefab: cc.Prefab = undefined
    @property(cc.Prefab) controlPanelPrefab: cc.Prefab = undefined

    private uiMap = new Map<UIType, UIBase>()

    onLoad () {
        StaticInstance.setUIManager(this)

        this.initStartMenu()
        this.initLevelSelect()
        this.initControlPanel()
    }

    gameStart() {
        this.showUI([UIType.ControlPanel])
        console.log("gamestart")
    }

    toLevelSelect() {
        console.log("tolevelselect")
        this.showUI([UIType.LevelSelect])
    }

    toStartMenu() {
        this.showUI([UIType.StartMenu])
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

    // update (dt) {}
}
