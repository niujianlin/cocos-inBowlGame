import { MusicResUrl } from "../Enum"
import { MusicManager } from "../MusicManager"

export class Util {

    static clickDownTween(node: cc.Node | undefined) {
        if(!node) {return}
        MusicManager.getInstance().playCLickEffect()
        cc.tween(node).to(0.1, {scale: 0.9}).start()
    }

    static clickUpTween(node:cc.Node | undefined, callback: () => void) {
        if(!node) {return}
        cc.tween(node).to(0.1, {scale: 1}).call(() => {
            callback && callback()
        }).start()
    }

    static loadMusic(url: MusicResUrl): Promise<cc.AudioClip | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.AudioClip, (err, AudioClip) => {
                if(err){ resolve(undefined) }
                resolve(AudioClip)
            })
        })
    }
}