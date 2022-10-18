import { createVNode, render } from 'vue'

/* @ts-ignore */
import * as TWEEN from 'tween.js';
/* @ts-ignore */
import banner from './giftBanner.vue'

/* eslint-disable */
class GiftBanner {
    gift: any
    parent: any
    showTime: 5000
    number
    timer: any
    container: any
    bannerVDode: any
    list: any
    waitCb: any
    constructor (gift: any, list: any, waitCb: any, parent: any) {
        this.gift = gift
        this.parent = parent
        this.showTime = 5000
        this.number = gift.number ? gift.number : 1
        this.timer = null
        this.list = list
        this.waitCb = waitCb
        const bannerVDode = createVNode(banner, {item: gift, showScale: false})
        const container = document.createElement('div') as HTMLElement
        render(bannerVDode, container)

        container.style.zIndex = '99'
        container.style.backgroundImage = `url(https://cdn1.didiapp.com/wedding/theme/green-giftBanner.png)`
        container.style.backgroundSize = `100% 100%`
        parent && parent.appendChild(container)
        this.container = container
        this.bannerVDode = bannerVDode
        this.setTimer()
    }
    setTimer () {
        if (this.timer) return
        this.destroy()
    }
    reset () {
        clearTimeout(this.timer)
        this.timer = null
        this.number += 1
        this.bannerVDode.props.item.number = this.number
        this.bannerVDode.props.showScale = true
        setTimeout(() => {
            this.bannerVDode.props.showScale = false
        }, 10)
        this.destroy()
    }
    destroy () {
        this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.timer = null
            if (this.list.value) {
                let i = this.list.value.findIndex((g: any) => this.gift.name === g.gift.name && this.gift.gift_number === g.gift.gift_number)
                this.list.value.splice(i, 1)
            } else {
                let i = this.list.findIndex((g: any) => this.gift.name === g.gift.name && this.gift.gift_number === g.gift.gift_number)
                this.list.splice(i, 1)
            }
            this.waitCb()
            this.destroyAnima(this.container)
        }, this.showTime);
    }
    destroyAnima (el: any) {
        new TWEEN.Tween({ y: 0, opacity: 1 })
        .to({ y: -30, opacity: 0 }, 300)
        .onUpdate(function(object: any) {
            /* @ts-ignore */
            el.style.opacity = this.opacity
            /* @ts-ignore */
            el.style.transform = `translateY(${this.y}px)`
            // el.style.transform = `translate(-50%, -50%) scale(${object.scale})`
        })
        .onComplete(() => {
            this.parent && this.parent.removeChild(this.container)
        })
        .start()
        function animate() {
            if (TWEEN.update()) {
                requestAnimationFrame(animate)
            }
        }
        animate()
    }
}

export default GiftBanner