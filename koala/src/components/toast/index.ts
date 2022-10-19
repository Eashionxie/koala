import { createVNode, render, VNodeProps } from 'vue'
import  toast from './index.vue'


// const Toast = (options: any) => {
//     let ToastEls = document.getElementById('lovenote-toast')
//     const container = document.createElement('div')
//     const toastVNode = createVNode(toast, options)
//     if (ToastEls) {
//         document.body.removeChild(ToastEls)
//     }
//     render(toastVNode, container)
//     container.id = 'lovenote-toast'
//     document.body.appendChild(container)
// }

// export default Toast
interface Options {
    txt?: string,
    mask?: boolean,
    loading?: boolean,
    time?: number
}

const useToast = (options: Options) => {
    let ToastEls = document.getElementById('lovenote-toast')
    const container = document.createElement('div')
    const toastVNode = createVNode(toast, options as VNodeProps)
    if (ToastEls) {
        document.body.removeChild(ToastEls)
    }
    render(toastVNode, container)
    container.id = 'lovenote-toast'
    document.body.appendChild(container)
    const hide = () => {
        if(document.getElementById('lovenote-toast')) {          // 淡入淡出效果之后删除dom节点
            render(null, container)
            document.body.removeChild(container)
        } 
    }
    return { hide }
}

export default useToast