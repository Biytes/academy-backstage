var storage = window.localStorage

// expiration 毫秒为单位
export const setStorageExpirable = (key, value, expireTimeMS) => {
  storage.setItem(key, value)
  storage.setItem(`${key}@set_date`, Date.now())
  storage.setItem(`${key}@expire`, expireTimeMS)
}

export const getStorageExpirable = key => {
  let value = storage.getItem(key)
  let now = Date.now()
  let date = storage.getItem(`${key}@set_date`)
  let expire = storage.getItem(`${key}@expire`)
  if (now - date < expire) {
    return value
  }
  storage.removeItem(key)
  return null
}

export const random = (max, min) => {
  if (typeof max !== 'number') {
    return Math.random()
  } else if (typeof min !== 'number') {
    min = 0
  }
  return Math.random() * (max - min) + min
}
export const randomColor = _ => {
  var r = this.random(256) | 0
  var g = this.random(256) | 0
  var b = this.random(256) | 0
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
