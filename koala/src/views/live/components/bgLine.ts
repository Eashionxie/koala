const H = window.screen.height
const W = window.screen.width
const bgs = [
    'linear-gradient(to bottom, rgba(255, 172, 172, 0), rgba(255, 172, 172, .3))',
    'linear-gradient(to bottom, rgba(255, 221, 172, 0), rgba(255, 221, 172, .3))',
    'linear-gradient(to bottom, rgba(195, 255, 172, 0), rgba(195, 255, 172, .3))'
]

class bgLine {
    left
    top
    drop_speed
    rotate
    el: HTMLElement
    animaId: any
    constructor (parent: any) {
        this.left = Math.round(Math.random() * (W - 4) + 2)
        this.top =  -100
        this.drop_speed = 4
        this.rotate = (Math.round(Math.random() * 20) + 10) * (Math.random() > 0.5 ? -1 : 1)
        this.el = document.createElement('div')
        let type_random = Math.random()
        if (type_random > .8) {
            this.el.className = 'star'
            this.el.style.backgroundImage = `url(https://cdn1.didiapp.com/wedding/starts/start${Math.round(Math.random() * 100) % 4}.png)`
        } else {
            this.el.className = 'line'
            this.el.style.background = bgs[Math.round(Math.random() * 100) % 3]
        }
        parent.appendChild(this.el)
        this.move()
    }
    move () {
        this.el.style.left = '0'
        this.el.style.top = '0'
        this.el.style.transform = `translate(${this.left}px, ${this.top}px)`
        this.top += this.drop_speed
        if (this.top >= H) {
            this.el && this.destroy()
        } else {
            if (this.animaId) return
            this.animaId = setInterval(() => { // 使用requestAnimationFrame会有bug，暂时未解决，待优化。
                this.move()
            }, 26);
        }
    }
    destroy () {
        clearInterval(this.animaId)
        this.animaId = null
        setTimeout(() => {
            let parentNode = this.el.parentNode
            parentNode && parentNode.removeChild(this.el)
        }, 500)
    }
}

export default bgLine