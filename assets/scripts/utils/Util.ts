export class Util {

    static clickDownTween(node: cc.Node | undefined) {
        if(!node) {return}
        cc.tween(node).to(0.1, {scale: 0.9}).start()
    }

    static clickUpTween(node:cc.Node | undefined, callback: () => void) {
        if(!node) {return}
        cc.tween(node).to(0.1, {scale: 1}).call(() => {
            callback && callback()
        }).start()
    }
}