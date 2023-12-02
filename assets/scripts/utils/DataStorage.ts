export class DataStorage {
    static getMaxLevel(): number {
        const value = cc.sys.localStorage.getItem('maxLevel')
        if(!value) {
            // 默认取6
            DataStorage.setMaxLevel(6)
            return 6
        }
        return JSON.parse(value)
    }

    static setMaxLevel(level: number) {
        cc.sys.localStorage.setItem('maxLevel', JSON.stringify(level))
    }

    static getUnLockLevel():number {
        const value = cc.sys.localStorage.getItem('unClockLevel')
        if(!value) {
            // 默认取1
            DataStorage.setUnLockLevel(1)
            return 1
        }
        return JSON.parse(value)
    }

    static setUnLockLevel(level: number) {
        cc.sys.localStorage.setItem('unClockLevel', JSON.stringify(level))
    }

}