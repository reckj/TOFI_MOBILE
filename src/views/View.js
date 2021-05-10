
class View {
  constructor (p, Tone, Timer, params, GUItoView) {
    this.p = p
    this.params = params
    this.Tone = Tone
    this.Timer = Timer // timeout object for game timing
    this.GUItoView = GUItoView
    this.randomID = p.random()
  }
  draw () {
  }
}
export default View
