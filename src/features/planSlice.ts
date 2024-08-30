import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Plan {
    _id: string;
    amount: string | number;
    date: string;
    title: string;
    category: string;
    description: string;
    interest: number;
    duration: number;
}

interface PlanState {
    plans: Plan[];
    title: string;
    amount: string | number;
    category: string;
    date: string;
    description: string;
    interest: number;
    duration: number;
}

const initialState: PlanState = {
    plans: [],
    title: '',
    amount: '',
    category: '',
    date: "",
    description: "",
    interest: 0,
    duration: 0,
};

const planSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        setPlans(state, action: PayloadAction<Plan[]>) {
            state.plans = action.payload;
        },
        removePlan(state, action: PayloadAction<string>) {
            state.plans = state.plans.filter(plan => plan._id !== action.payload)
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setAmount(state, action: PayloadAction<string | number>) {
            state.amount = action.payload;
        },
        setCategory(state, action: PayloadAction<string >) {
            state.category = action.payload;
        },
        setDate(state, action: PayloadAction<string >) {
            state.date = action.payload;
        },
        setDescription(state, action: PayloadAction<string >) {
            state.description = action.payload;
        },
        setInterest(state, action: PayloadAction<number >) {
            state.interest = action.payload;
        },
        setDuration(state, action: PayloadAction<number >) {
            state.duration = action.payload;
        },
    },
});

export const {
    setPlans,
    removePlan,
    setTitle,
    setAmount,
    setCategory,
    setDate,
    setDescription,
    setInterest,
    setDuration,
} = planSlice.actions;

export default planSlice.reducer;
