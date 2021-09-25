import fileExtList from '../config/iconfontlist'

// 阻止事件冒泡
export const stopEventBubble = e => {e.preventDefault();e.stopPropagation()}

export const renderSize = sizeRaw =>{
    let sizeUnit = ["B","KB","MB","GB","TB","PB","EB","ZB","YB"];
    let index = Math.floor(Math.log(sizeRaw)/Math.log(1024));

    let size = (sizeRaw/Math.pow(1024,index)).toFixed(2);

    size = isNaN(size) ? 0 : size;

    return `${size}${sizeUnit[index] ?? 'B'}`;
}

export const processFileExt = ext => {
    if (ext === '7z') {
        ext = 'a7z';
    }
    if (!fileExtList[ext]) {
        return 'unknown';
    }
    return ext;
}