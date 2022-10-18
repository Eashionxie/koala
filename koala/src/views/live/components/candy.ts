// import lottie from 'lottie-web'
const H = window.screen.height
const W = window.screen.width
class Candy {
    id
    finishCb
    left
    top
    drop_speed
    rotate
    rotate_base
    rotate_speed
    el: HTMLElement
    animaId: any
    constructor (id: any, parent: any, finishCb: any, type: number = 8) {
        this.id = id
        this.finishCb = finishCb
        this.left = Math.round(Math.random() * (W - 140) + 20)
        this.top = -80
        this.drop_speed = 10
        this.rotate = (Math.round(Math.random() * 20) + 10) * (Math.random() > 0.5 ? -1 : 1)
        this.rotate_base = this.rotate
        this.rotate_speed = (Math.random() + .5) / 2  * (Math.random() > 0.5 ? -1 : 1)
        this.el = document.createElement('img')
        this.el.id = id
        this.el.className = 'candy'
        this.el.setAttribute('src', type === 7 ?
            `https://cdn1.didiapp.com/wedding/candy/${Math.round((Math.random() * 1000) % 5) + 1}.png` :
            'https://cdn1.didiapp.com/wedding/redbag.png')
        parent.appendChild(this.el)
        this.move()
    }
    move () {
        this.el.style.left = '0'
        this.el.style.top = '0'
        this.el.style.transform = `translate(${this.left}px, ${this.top}px) rotate(${this.rotate}deg)`
        this.top += this.drop_speed
        this.rotate = this.rotate + this.rotate_speed
        if (this.top >= H - 200) {
            this.el && this.destroy()
        } else {
            if (this.animaId) return
            this.animaId = setInterval(() => { // 使用requestAnimationFrame会有bug，暂时未解决，待优化。
                this.move()
            }, 26);
            // this.animaId = requestAnimationFrame(this.move)
        }
    }
    destroy () {
        clearInterval(this.animaId)
        this.animaId = null
        this.el.className = 'candy candy-destroy2'
        setTimeout(() => {
            let parentNode = this.el.parentNode
            parentNode && parentNode.removeChild(this.el)
            ;(!parentNode || !parentNode.hasChildNodes()) && this.closeRain()
        }, 280)
    }
    userDestroy () {
        clearInterval(this.animaId)
        this.animaId = null
        this.el.className = 'candy candy-destroy'
        setTimeout(() => {
            let parentNode = this.el.parentNode
            parentNode && parentNode.removeChild(this.el)
            ;(!parentNode || !parentNode.hasChildNodes()) && this.closeRain()
        }, 280)
    }
    closeRain () {
        this.finishCb()
    }
}

export default Candy