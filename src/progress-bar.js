const setProgress = (width) => {
  document.getElementById('progress').style['width'] = width;
}

setTimeout(() => setProgress("25%"), 100)
setTimeout(() => setProgress("50%"), 300)
setTimeout(() => setProgress("75%"), 500)
setTimeout(() => setProgress("100%"), 700)
