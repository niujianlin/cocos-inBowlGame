import { MusicResUrl } from "./Enum"
import { Util } from "./utils/Util"

export class MusicManager {
    private static instance: MusicManager

    private constructor() {

    }

    static getInstance(): MusicManager {
        if(!this.instance) {
            this.instance = new MusicManager()
        }
        return this.instance
    }

    async playBGM() {
        const audio = await Util.loadMusic(MusicResUrl.Bgm)
        audio && cc.audioEngine.playMusic(audio, true)
    }

    async playCLickEffect() {
        const audio = await Util.loadMusic(MusicResUrl.Click)
        audio && cc.audioEngine.playMusic(audio, false)
    }

    async playWinEffect() {
        const audio = await Util.loadMusic(MusicResUrl.Win)
        audio && cc.audioEngine.playMusic(audio, false)
    }

    async playLoseEffect() {
        const audio = await Util.loadMusic(MusicResUrl.Lose)
        audio && cc.audioEngine.playMusic(audio, false)
    }

}