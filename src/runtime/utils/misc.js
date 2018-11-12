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
