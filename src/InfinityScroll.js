import throttle from "./throttle";


class InfinityScroll {

  constructor() {
    this.nextPage = 2
// Если отправили запрос, но ещё не получили ответ,
// не нужно отправлять ещё один запрос:
    this.isLoading = false
// Если контент закончился, вообще больше не нужно
// отправлять никаких запросов:
    this.shouldLoad = true
    this.newNum = 0
  }

  cleanup () {
    this.newNum = 0
    this.nextPage = 2
    this.isLoading = false
    this.shouldLoad = true
    this.newNum = 0
  }

  calcSkip (num) {
    this.newNum += num
    return this.newNum
  }

  async loadNext(callback) {
    if (this.isLoading || !this.shouldLoad) return
    this.isLoading = true
    await callback(this.calcSkip(3))
    if (!this.nextPage) this.shouldLoad = false
    this.isLoading = false
  }
  async checkPosition(callback, screenSize = 4) {

    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight

// Записываем, сколько пикселей пользователь уже проскроллил:
    const scrolled = window.scrollY

// Обозначим порог, по приближении к которому
// будем вызывать какое-то действие.
// В нашем случае — четверть экрана до конца страницы:
    const threshold = height - screenHeight / screenSize

// Отслеживаем, где находится низ экрана относительно страницы:
    const position = scrolled + screenHeight
    console.log(position, this)
    if (position >= threshold) {
      // Если мы пересекли полосу-порог, вызываем нужное действие.
      await this.loadNext(callback)
    }
  }
}

export default new InfinityScroll
