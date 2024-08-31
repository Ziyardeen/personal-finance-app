import './chart.scss'
import { Audio } from 'react-loader-spinner'

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlans()
      .then((fetchedPlans) => {
        setLoading(true)
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

  console.log(extract, "Extracted Data");
  console.log(plans, "Plans Data");

  return (
    <ResponsiveContainer width="100%" height="90%">
      
      <LineChart
        width={500}
        height={300}
        data={extract}
        margin={{
          right: 30,
          top:30,
        }}
        
      >
       
       <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="date" />
        <YAxis />
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
      // Ensure that payload[0] and payload[1] exist before accessing their properties
      console.log(payload,"ooooooooo");
      
      const revenueValue = payload[0]?.value;
      
  
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          {revenueValue !== undefined && (
            <p className="chart-tooltip-value">
              {payload[0].name.toUpperCase()}: 
              <span className="chart-tooltip-revenue"> £{revenueValue}</span>
            </p>
  )}
        </div>      

      );
    }
  
    return null;
  };
  
