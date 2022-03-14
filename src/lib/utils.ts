// 定义 any 是由于两个属性为动态枚举
const loading: any = {}
const loaded: any = {}
/**
 * @method 加载js文件_
 * @param {String} requestURL
 * @param {Function} callback
 */
export const getScript = (requestURL: string, callback: callback) => {
  var el
  var url = requestURL
  var needToLoad = !loading[url]
  var q = (loading[url] = loading[url] || [])

  function doCallback(e?: any) {
    if (callback) {
      callback(e)
    }
  }
  if (loaded[url]) {
    doCallback()
    return
  }
  q.push(doCallback)

  function onLoad(e: any) {
    loaded[url] = 1
    while (q.length) {
      q.shift()(e)
    }
  }
  if (needToLoad) {
    el = document.createElement('script')
    el.type = 'text/javascript'
    el.charset = 'utf-8'
    if (el.addEventListener) {
      el.addEventListener('load', onLoad, false)
    }
    el.setAttribute('data-requested', requestURL)
    el.src = url
    document.getElementsByTagName('head')[0].appendChild(el)
  }
}
