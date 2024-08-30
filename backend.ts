import axios from 'axios'

const request = axios.create({
    baseURL: 'https://personal-finance-planner-backend-1.onrender.com/api',
})
interface Plan {
    _id?:string
    amount?: string | number
    date?: string
    title?: string
    category?: string
    description?: string
    interest?: number
    duration?: number
}
export function getPlans() {
    return request
        .get('/expenses')
        .then((response) => {
            console.log(response.data)
            return response.data // Return the data if needed
        })
        .catch((error) => {
            throw error
        })
}
export function postPlans(plan: Plan) {
    return request
        .post(`/expenses`,plan)
        .then((response) => {
            console.log(response.data)
            return response.data 
        })
        .catch((error) => {
            throw error
        })
}
export function updatePlan(plan:Plan){
  console.log(plan,"???????");
  
  return request
    .patch(`/expenses/${plan.title}`,plan)
    .then((response) => {
      console.log(response);
      return response.data
    }).catch((error) => {
      
      throw error
    })
}
export function deletePlan(plan:Plan){
  return request
    .delete(`/expenses/${plan.title}`)
    .then((response) => {
      console.log(response);
      return response.data
    }).catch((error) => {
      throw error
    })
}
