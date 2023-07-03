const setProgress = (width) => {
  document.getElementById('progress').style['width'] = width;
}

setTimeout(() => setProgress("25%"), 200)
setTimeout(() => setProgress("50%"), 500)
setTimeout(() => setProgress("75%"), 1000)
setTimeout(() => setProgress("100%"), 1400)
