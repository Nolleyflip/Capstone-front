import axios from 'axios'
axios.defaults.withCredentials = true

export async function fetchBusiness() {
  return await axios.get('https://capstone-2-bcw7.onrender.com/api/businesses')}

// export async function onLogin(loginData) {
//   return await axios.post('http://localhost:8000/api/login', loginData)
// }
