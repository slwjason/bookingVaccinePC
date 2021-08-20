export function MP() {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=ko0i5v3wblYYwuvQivW0tX61mWl2IOQ4&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
