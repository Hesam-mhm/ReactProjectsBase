/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthModel} from './_models'
import { FrappeUserType } from './Auth'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const FRAPPE_USER_KEY = 'FRAPPE_USER'

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const getFrappeUser = (): FrappeUserType | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(FRAPPE_USER_KEY)
  if (!lsValue) {
    return
  }

  try {
    const user: FrappeUserType = JSON.parse(lsValue) as FrappeUserType
    if (user) {
      return user
    }
  } catch (error) {
    console.error('خطا در خواندن اطلاعات کاربر از localStorage', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const setFrappeUser = (user: FrappeUserType) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(user)
    localStorage.setItem(FRAPPE_USER_KEY, lsValue)
  } catch (error) {
    console.error('خطا در ذخیره اطلاعات کاربر در localStorage', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const removeFrappeUser = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(FRAPPE_USER_KEY)
  } catch (error) {
    console.error('خطا در حذف اطلاعات کاربر از localStorage', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
}

export {getAuth, setAuth, removeAuth, getFrappeUser, setFrappeUser, removeFrappeUser, AUTH_LOCAL_STORAGE_KEY, FRAPPE_USER_KEY}
