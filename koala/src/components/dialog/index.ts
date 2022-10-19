import { createVNode, render } from 'vue'
import  dialog from './index.vue'


const Dialog = (options: any) => {
    let dialogEls = document.getElementById('lovenote-dialog')
    const container = document.createElement('div')
    const dialogVDode = createVNode(dialog, options)
    if (dialogEls) { // 多个弹窗叠加，只会有一个mask层
        options.showMask = false
    }
    render(dialogVDode, container)
    container.id = 'lovenote-dialog'
    container.className = 'lovenote-dialog-c' // 后面关闭弹窗会从DOM结构最下面依次选取该类名移除节点
    document.body.appendChild(container)
}

export default Dialog