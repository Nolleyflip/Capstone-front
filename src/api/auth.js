import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'https://capstone-2-bcw7.onrender.com/api/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post('https://capstone-2-bcw7.onrender.com/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('https://capstone-2-bcw7.onrender.com/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('https://capstone-2-bcw7.onrender.com/api/protected')
}
