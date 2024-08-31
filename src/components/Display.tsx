import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Nav from "./Nav";

import "./display.scss";
import { deletePlan } from "../../backend";

import{removePlan }from '../features/planSlice'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setPlans } from "../features/planSlice";
import { getPlans } from "../../backend";
import { Audio } from 'react-loader-spinner'



interface Plan {
  _id: string;
  amount: string | number;
  date?: string;
  title?: string;
  category?: string;
  description?: string;
  interest: number;
  duration: number;
}


const Display = () => {


  const planList = useSelector((state: RootState) => state.plans.plans);
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  
  const interestCalculation = (plan: Plan) => {
    const interest = plan.interest * 0.01 * +plan.amount;
    const totalAmountToPay = interest + +plan.amount;
    const repaymentsAmounts = totalAmountToPay / +plan.duration;
    

    return repaymentsAmounts;
  };
  useEffect(() => {
       
    getPlans()
        .then((data) => {
           
            dispatch(setPlans(data))
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

  const handleExpand = (index: number) => {
    setExpandIndex(expandIndex === index ? null : index);
  };

  const handleEdit = (plan:Plan)=>{
    navigate('/',{state:{editablePlan: plan }})
  }
  const handleDelete = (plan:Plan)=>{
    deletePlan(plan).then(() => {
      dispatch(removePlan(plan._id))
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    
loading? <Audio
height="80"
width="80"
radius="9"
color="green"
ariaLabel="loading"
wrapperStyle
wrapperClass
/> :
    <div className="plan-list">
      <Nav />
      <h1 >Expense List</h1>
      <button className="enter-task" onClick={()=> navigate('/')}>Enter Task</button>
     
     
    <div className="scroll">

     
      {planList.map((plan, index) => (
        <div
          key={index}
          className="plan-item"
          onClick={() => handleExpand(index)}
        >
          <div className="actions">
            <button onClick={()=>handleEdit(plan)}>Edit</button>
            <button onClick={()=>handleDelete(plan)}>Delete</button>
          </div>

          <div>
            <h3>
              Title: <span>{plan.title}</span>
            </h3>
          </div>

          <div>
            <h3>
              Amount: <span>£ {plan.amount}</span>
            </h3>
          </div>

          <div>
            <h3>
              {" "}
              Category: <span>{plan.category}</span>
            </h3>
          </div>
          {expandIndex === index && (
            <>
              <div>
                <h3>
                  {" "}
                  Date: <span> {plan.date}</span>
                </h3>
              </div>

              {plan.category === "borrow" && (
                <>
                  <div>
                    <h3>
                      {" "}
                      Duration: <span> {plan.duration}</span>
                    </h3>
                  </div>
                  <div>
                    <h3>
                      {" "}
                      Interest Rate: <span> {plan.interest}</span>
                    </h3>
                  </div>
                  <div className="borrow-category">
                    <h3>Repayment Schedule:</h3>

                    
                    <ul>
                      {Array.from({ length: plan.duration }).map((_, i) => (
                        <li key={i}>
                          Month {i + 1}: £{interestCalculation(plan).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <div>
                <h3>Description </h3>
                <p> {plan.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Display;
