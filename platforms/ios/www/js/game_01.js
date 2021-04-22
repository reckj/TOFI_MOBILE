const game01 = (p) => {

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.colorMode(p.HSB)
        p.blendMode(p.SCREEN)
    }

    p.draw = function () {
        p.clear()
        p.background(120, 120, 30)
        let size = p.sin(p.radians(p.frameCount))* p.width/2
        p.fill(40, 255, 120)
        p.ellipse(p.width / 2, p.height / 2, size,size)
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
}
