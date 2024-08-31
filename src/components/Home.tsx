import { useEffect, } from 'react'
import './Home.scss'
import { useLocation, useNavigate } from 'react-router-dom'

import {  postPlans, updatePlan } from '../../backend.ts'

import {
    setPlans,
    setTitle,
    setAmount,
    setCategory,
    setDate,
    setDescription,
    setInterest,
    setDuration
} from '../features/planSlice.ts';
import { useSelector,useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store.ts';



const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        title, amount, category, date, description, interest, duration, plans
    } = useSelector((state: RootState) => state.plans);
    
    const navigate = useNavigate()
    const location = useLocation()
    const editablePlan = location.state?.editablePlan
   
  
    
    useEffect(() => {
      if(editablePlan){
        dispatch(setAmount(editablePlan.amount))
        dispatch(setTitle(editablePlan.title));
        dispatch(setCategory(editablePlan.category));
        dispatch(setDate(editablePlan.date));
        dispatch(setDescription(editablePlan.description));
        dispatch(setInterest(editablePlan.interest));
        dispatch(setDuration(editablePlan.duration));
      }
    },[editablePlan])

    

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(e.target.value))
    }

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCategory(e.target.value))
    }
    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAmount(e.target.value))
    }
    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDescription(e.target.value))
    }
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDate(e.target.value))
    }
    const handleInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInterest(+e.target.value))
    }
    const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDuration(+e.target.value))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(editablePlan){
            updatePlan({
                title: title,
                amount: amount,
                date: date,
                category: category,
                description: description,
                interest: interest,
                duration: duration,
            }).then((plan) => {
                
              dispatch(dispatch(setPlans([...plans,plan])))
            }).catch((err) => {
              console.log(err);
            })
        }
        else{

            postPlans({
                _id:title,
                title: title,
                amount: amount,
                date: date,
                category: category,
                description: description,
                interest: interest,
                duration: duration,
            }).then((plan) => {
              dispatch(dispatch(setPlans([...plans,plan])))
            }).catch((err) => {
              console.log(err);
            })
        }

        dispatch(setAmount(''))
        dispatch(setTitle(''));
        dispatch(setCategory(''));
        dispatch(setDate(''));
        dispatch(setDescription(''));
        dispatch(setInterest(0));
        dispatch(setDuration(0));
        
    }

    
    const handleExpense = () => {
        navigate('/display')
    }

    return (
        <div className="home-div">
            <h2>Welcome to The Personal Finance Planner</h2>
            <form className="add-expenses" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        disabled={editablePlan}
                        onChange={handleTitle}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount </label>

                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>

                <div>
                    <label htmlFor="date">Date </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={handleDate}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleDescription}
                    />
                </div>

                <div>
                    <label htmlFor="category">Category </label>
                    <select
                        name=""
                        id="category"
                        value={category}
                        onChange={handleCategory}
                    >
                        <option value="">Select a category</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="savings">Savings</option>
                        <option value="investment">Investment</option>
                        <option value="borrow">Borrow</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {category === 'borrow' && (
                    <div>
                        <label htmlFor="interest">Interest Rate % </label>
                        <input
                            type="number"
                            id="interest"
                            value={interest}
                            onChange={handleInterest}
                        />

                        <label htmlFor="duration">Duration in months </label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={handleDuration}
                        />
                    </div>
                )}
                <button className="submit" type="submit">
                    {editablePlan? "Update": "Submit"}
                </button>
            </form>

            <button className='plans-btn' onClick={handleExpense}> See Tasks </button>
            
        </div>
    )
}

export default Home
