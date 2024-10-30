import axios from 'axios'
axios.defaults.withCredentials = true

export async function fetchReviews(id) {
  return await axios.get(`https://capstone-2-bcw7.onrender.com/api/reviews/business/${id}`)}

  export async function postReview(id, review) {
    return await axios.post(`https://capstone-2-bcw7.onrender.com/api/reviews/business/${id}`, review)
  }
  
export async function updateReview(id, review) {
    console.log((id))
    return await axios.put(`https://capstone-2-bcw7.onrender.com/api/reviews/business/${id}`, review)
} 
export async function deleteReview(id) {
    console.log((id))
    return await axios.delete(`https://capstone-2-bcw7.onrender.com/api/reviews/business/${id}`)
  }

  export async function postResponse( response) {
    return await axios.post(`https://capstone-2-bcw7.onrender.com/api/reviews/response`, response)
  }

  export async function updateResponse(id, response) {
    return await axios.put(`https://capstone-2-bcw7.onrender.com/api/reviews/response/${id}`, response)
  }
  export async function deleteResponse(id) {
    return await axios.delete(`https://capstone-2-bcw7.onrender.com/api/reviews/response/${id}`)
  }
