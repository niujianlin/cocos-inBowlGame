import { StaticInstance } from "./StaticInstance";
import { PhyManager } from "./utils/PhyManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node) 
    bowl: cc.Node | undefined = undefined

    @property({
        type: cc.SpriteFrame
    }) 
    openEyeBowl: cc.SpriteFrame | undefined = undefined

    @property({
        type: cc.SpriteFrame
    }) 
    closeEyeBowl: cc.SpriteFrame | undefined = undefined


    onLoad () {
        StaticInstance.setGameManager(this)
        PhyManager.openPhysicsSystem()

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

    gameStart() {
        // 测试的汉堡节点
        // PhyManager.setRigidBodyDynamic(this.node.children[0].children[0])
        this.showBowl()

    }

    onRotateFood(angle: number) {
        // 测试的汉堡节点

        // console.log("进来没")
        // console.log('[GameManager] angle: ' + angle)
        this.node.children[0].children[0].angle = angle
    }

    onClickLeftFood(dt: number) {
        // 测试的汉堡节点

        const speed = 100
        this.node.children[0].children[0].x -= speed * dt
    }

    onClickRightFood(dt: number) {
        // 测试的汉堡节点

        const speed = 100
        this.node.children[0].children[0].x += speed * dt
        
    }

    onClickDownFood(dt: number) {
        // 测试的汉堡节点
        const n = this.node.children[0].children[0]
        PhyManager.setRigidBodyDynamic(n)
        // 向下有5的一个初速度，方便后续判断是否静止
        PhyManager.setRigidBodyLinearVelocity(n, cc.v2(0, -5)) 


    }
}
