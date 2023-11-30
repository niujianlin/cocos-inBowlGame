export class PhyManager {
    static openPhysicsSystem() {
        cc.director.getPhysicsManager().enabled = true
    }

    static closePhysicsSystem() {
        cc.director.getPhysicsManager().enabled = false
    }

    static setRigidBodyStatic(node: cc.Node) {
        const body = node.getComponent(cc.RigidBody)
        body.type = cc.RigidBodyType.Static
    }
    static setRigidBodyDynamic(node: cc.Node) {
        const body = node.getComponent(cc.RigidBody)
        body.type = cc.RigidBodyType.Dynamic
    }
    static setRigidBodyLinearVelocity(node: cc.Node, v: cc.Vec2) {
        const body = node.getComponent(cc.RigidBody)
        body.linearVelocity = v
    }

 
}
