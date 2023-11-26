import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getCurrUser() {
  return Cookies.get('currUser') || "{}"  //防止报错
}

export function setCurrUser(info) {
  return Cookies.set('currUser', info)
}

export function removeToken() {
  console.log('removeToken')
  return Cookies.remove(TokenKey)
}
