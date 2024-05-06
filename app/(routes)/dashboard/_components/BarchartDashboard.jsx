import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarchartDashboard = ({budgetList}) => {
  return (
    <div>
        <BarChart
            width={600}
            height={300}
            data={budgetList}
            margin={{
                top:5,
                right:5,
                left:5,
                bottom:5
            }}
        >
            <XAxis dataKey='name'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey='totalSpend' stackId='a' fill='#4845d2'/>
            <Bar dataKey='amount' stackId='a' fill='#C3C2FF'/>
        </BarChart>
    </div>
  )
}

export default BarchartDashboard