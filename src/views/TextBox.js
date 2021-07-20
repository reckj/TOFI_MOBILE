
class TextBox {
    constructor (p, text, x,y,w,h) {
        this.p = p
        this.text = text
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.size = 23
    }
    display (x,y) {
        if (x){
            this.x = x
        }
        if (y){
            this.y = y
        }
        this.p.fill(255);
        this.p.noStroke();
        this.p.textSize(this.size);
        this.p.rectMode(this.p.CENTER)
        this.p.text(this.text, this.x, this.y, this.w, this.h); // Text wraps within
    }
    setText(text) {
        this.text = text
    }
    settextSize(size) {
        this.size = size
    }
}
export default TextBox
