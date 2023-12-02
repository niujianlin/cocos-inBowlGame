import { StaticInstance } from "./StaticInstance";
import { PhyManager } from "./utils/PhyManager";
import GameConfig from "./config/GameConfig";
import { DataStorage } from "./utils/DataStorage";
import { MusicManager } from "./MusicManager";

const {ccclass, property} = cc._decorator;

interface IMidConfig{
    level: number,
    count: number,
    node: cc.Node
}

@ccclass
export default class GameManager extends cc.Component {

    @property({
        type: [cc.Prefab],
        displayName: '食物预制体'
    })
    foodPrefabs: cc.Prefab[] = []

    @property({
        type: cc.Node
    })
    foods: cc.Node = undefined 

    @property(cc.Node) 
    bowl: cc.Node = undefined 

    @property({
        type: cc.SpriteFrame
    }) 
    openEyeBowl: cc.SpriteFrame | undefined = undefined

    @property({
        type: cc.SpriteFrame
    }) 
    closeEyeBowl: cc.SpriteFrame | undefined = undefined

    // 记录当前的数据，举例：count = 0（第一个食物）, level 当前关卡
    midConfig: IMidConfig = {
        level: 0,
        count: 0,
        node: null
    }

    // 检测食物停止
    time: number = 0
    checkCD: number = 0.2

    // 是否在游戏中
    isPlaying:boolean = false

    get allBodyStop(): boolean {
        for(let i=0; i<this.foods.childrenCount; i++) {
            const node = this.foods.children[i]
            const body = node.getComponent(cc.RigidBody)
            if(!body.linearVelocity.fuzzyEquals(cc.v2(0, 0), 0.1)) {
                return false
            }
        }
        return true
    }

    get someBodyStatic():boolean {
        for(let i=0; i<this.foods.childrenCount; i++) {
            const node = this.foods.children[i]
            const body = node.getComponent(cc.RigidBody)
            if(body.type === cc.RigidBodyType.Static) {
                return true
            }
        }
        return false
    }

    get canAddFood():boolean {
        const len = GameConfig[this.midConfig.level].length
        if(this.midConfig.count >= len) {
            return false
        }
        return true
    }

    get nowFoodType(): number {
        return GameConfig[this.midConfig.level][this.midConfig.count]
    }


    onLoad () {
        StaticInstance.setGameManager(this)
        PhyManager.openPhysicsSystem()
        // 打印下GameConfig
        console.log("关卡信息：", GameConfig)
        MusicManager.getInstance().playBGM()
    }

    hideBowl() {
        this.bowl.active = false
    }

    showBowl() {
        this.bowl.active = true
        this.bowl.stopAllActions()
        // 眨眼动作
        cc.tween(this.bowl).repeatForever(
            cc.tween()
                .delay(0.3)
                .call(() => this.bowl.getComponent(cc.Sprite).spriteFrame = this.openEyeBowl)
                .delay(2)
                .call(() => this.bowl.getComponent(cc.Sprite).spriteFrame = this.closeEyeBowl)
        ).start()
    }

    gameStart(level: number) {
        // 测试的汉堡节点
        // PhyManager.setRigidBodyDynamic(this.node.children[0].children[0])
        console.log(`游戏开始，level = 第${level}关`)
        this.showBowl()

        // 生成第一个食物
        this.midConfig.level = level
        this.midConfig.count = 0
        this.midConfig.node = this.addFood(this.nowFoodType)

        // 游戏开始，可以进行失误速度为零的检测
        this.isPlaying = true

    }

    onClickNextLevel() {
        // 先都销毁掉食物
        this.clearAllFood()

        // 到下一关
        this.midConfig.level += 1
        StaticInstance.uimanager.gameStart(this.midConfig.level)
    }

    onClickPlayAgain() {
        // 先都销毁掉食物
        this.clearAllFood()

        // 重新开始
        StaticInstance.uimanager.gameStart(this.midConfig.level)
    }

    clearAllFood() {
        this.foods.removeAllChildren()
    }

    addFood(index: number) {
        const pos = cc.v2(0, 450)
        const food = cc.instantiate(this.foodPrefabs[index])
        this.foods.addChild(food)
        food.setPosition(pos)
        // 保证是静态
        PhyManager.setRigidBodyStatic(food)
        // 食物增加
        this.midConfig.count += 1
        // 刷新ui
        this.updateLevelInfo()

        // 为什么要返回食物，因为要记录这一关的第几个食物
        return food
    }


    updateLevelInfo() {
        const level = this.midConfig.level
        const nowItem = this.midConfig.count
        const allNum = GameConfig[level].length

        StaticInstance.uimanager.setLevelInfo(level, nowItem, allNum)
    }


    onRotateFood(angle: number) {

        // console.log("进来没")
        // console.log('[GameManager] angle: ' + angle)

        if(!this.midConfig.node) { return }

        this.midConfig.node.angle = angle
    }

    onClickLeftFood(dt: number) {

        if(!this.midConfig.node) { return }
        const speed = 100
        this.midConfig.node.x -= speed * dt
    }

    onClickRightFood(dt: number) {

        if(!this.midConfig.node) { return }

        const speed = 100
        this.midConfig.node.x += speed * dt
        
    }

    onClickDownFood(dt: number) {

        if(!this.midConfig.node) { return }

        const n = this.midConfig.node
        PhyManager.setRigidBodyDynamic(n)
        // 向下有5的一个初速度，方便后续判断是否静止
        PhyManager.setRigidBodyLinearVelocity(n, cc.v2(0, -5)) 

        // 取消指定
        this.midConfig.node = null

    }

    checkAllBody() {
        // 判断是否在游戏中 || 有食物静态的 || 有食物没有停下来的时候
        if(!this.isPlaying || this.someBodyStatic || !this.allBodyStop) { return }
        // 食物刚体是否都倒下了
        console.log(this.allBodyStop)

        // 能否添加食物
        if(!this.canAddFood) {
            this.isPlaying = false
            // 胜利面板
            StaticInstance.uimanager.showWinPanel()
            if( DataStorage.getUnLockLevel() < this.midConfig.level + 1 ) {
                DataStorage.setUnLockLevel(this.midConfig.level + 1)
            }
            console.log(`游戏胜利`)
            MusicManager.getInstance().playWinEffect()
            return 
        }
        // 都停下就新建食物
        this.midConfig.node = this.addFood(this.nowFoodType)
    }

    checkFall() {
        let hasFall: boolean = false
        for(let i=0; i<this.foods.childrenCount; i++) {
            const node = this.foods.children[i]
            if(node.y < -800) {
                node.destroy()
                hasFall = true
                break
            }
        }
        // 如果有落下去的，游戏失败
        if(hasFall) {
            this.isPlaying = false
            // 失败面板
            StaticInstance.uimanager.showLosePanel()

            console.log(`gamelose!`)
            MusicManager.getInstance().playLoseEffect()
            return
        }
    }

    update(dt: number) {
        this.time += dt
        if(this.time > this.checkCD) {
            this.time = 0
            // 检测所有食物刚体是否都停下了
            // console.log(0.2)
            this.checkAllBody()
            // 失败检测
            this.checkFall()
        }
    }

}
