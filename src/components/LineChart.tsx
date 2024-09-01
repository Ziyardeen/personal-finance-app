import './chart.scss'


import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getPlans } from '../../backend';

interface Plans {
  _id: string;
  amount: string | number;
  date?: string;
  title?: string;
  category?: string;
  description?: string;
  interest: number;
  duration: number;
}

interface ExtractedData {
  savings?: string | number;
  income?: string | number;
  investment?: string | number;
  expense?: string | number;
  borrow?: string | number;
  other?: string | number;
  date?: string;
}

const LineChartComponent = () => {
  const [plans, setPlans] = useState<Plans[]>([]);


  useEffect(() => {
    getPlans()
      .then((fetchedPlans) => {
       
        console.log(fetchedPlans,"ppppppp");
        
        setPlans(fetchedPlans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

  const extract: ExtractedData[] = plans.map((plan) => {
    switch (plan.category) {
      case 'savings':
        return { savings: plan.amount, date: plan.date };
      case 'income':
        return { income: plan.amount, date: plan.date };
      case 'investment':
        return { investment: plan.amount, date: plan.date };
      case 'expense':
        return { expense: plan.amount, date: plan.date };
      case 'borrow':
        return { borrow: plan.amount, date: plan.date };
      case 'other':
        return { other: plan.amount, date: plan.date };
      default:
        return {};
    }
  });

  interface DateEntry {
    date: string;
    [key: string]: any; 
  }

  const extractedDates = extract.map((plan) => {
    return plan.date
  })
  const uniquesExtractedDates:(string | undefined)[] =  [...new Set(extractedDates)]

  const arr:DateEntry[] = []

  uniquesExtractedDates.forEach((date) => {
    arr.push({date:date})
  })

  extract.map((plan) => {
    for(let i of arr){
      if(i.date === plan.date){
        for(let key in plan){
          if(key !== 'date'){
            i[key] = plan[key]
          }
          // console.log(key,'KEY');
          
        }
      }
    }
  })

  const finalFormat = arr.map((entry) => {
    ['expense', 'savings', 'income', 'investment', 'borrow', 'other'].forEach((category) => {
      if(entry[category] === undefined){
        console.log("hell0");
        
        entry[category] = 0
      }
    })
    return entry
  })

  // console.log(extract, "extract");
  // console.log(extractedDates, "extracted dates");
  // console.log(uniquesExtractedDates, "Unique extracted dates");
  // console.log(arr, "arr");
  // console.log(finalFormat, "FInal arr");

  

  

  return (
    <ResponsiveContainer width="100%" height="80%">
      
      <LineChart
        width={500}
        height={300}
        data={finalFormat}
        margin={{
          right: 30,
          top:30,
        }}
        
      >
       
       <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="date" />
        <YAxis domain={[0, 'auto']}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Line type="monotone" dataKey="expense" stroke="#3b82f6" strokeWidth={4}/>
        <Line type="monotone" dataKey="savings" stroke="#fa2504" strokeWidth={4} />
        <Line type="monotone" dataKey="income" stroke="#0d47f5" strokeWidth={4}/>
        <Line type="monotone" dataKey="investment" stroke="#f5dd09" strokeWidth={4}/>
        <Line type="monotone" dataKey="borrow" stroke="#1cf92b" strokeWidth={4}/>
        <Line type="monotone" dataKey="other" stroke="#8b5cf6" strokeWidth={4}/>
       
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="chart-tooltip-value">
              {item.name.toUpperCase()}: 
              <span className="chart-tooltip-revenue"> £{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  
     
      
      
  
 
