
import { Select } from 'antd';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetDashboardChartQuery } from '../../redux/api/dashboardApi';

const IncomeOverview = () => {
    const [year, setYear] =  useState('2024')
    const {data : getDashboardOverview , isLoading} =  useGetDashboardChartQuery(year);
    const items = [
        {
            label: 2023,
            key:"2023",
            value:"2023"
        },
        {
            label: 2024,
            key:"2024",
            value:'2024'
        },
        {
            label:2025,
            key:"2025",
            value :'2025'
        },
        {
            label:2026,
            key:"2026",
            value:'2026'
        },
    ];
    const chartDataFormat = getDashboardOverview?.data?.chartData?.map((chart, i)=>{
        return {
            name : chart?.month,
            uv :  chart?.totalIncome

        }
    })
    

    const handleChange = (value) => {
        setYear(value)
    };
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='ml-6'>
                    <p className='text-2xl font-semibold  '>Income Overview</p>
                    <div className='flex items-center gap-5 my-2'>
                        <div>
                            <p>Yearly Growth</p>
                            <p className='font-medium'>{getDashboardOverview?.data?.yearlyGrowth}</p>
                        </div>
                        <div>
                            <p>Monthly</p>
                            <p className='font-medium'>{getDashboardOverview?.data?.monthlyGrowth}</p>
                        </div>
                        <div>
                            <p>Daily</p>
                            <p className='font-medium'>{getDashboardOverview?.data?.dailyGrowth}</p>
                        </div>
                    </div>
                </div>
                <Select
                    defaultValue={year}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={400}
                        height={400}
                        data={chartDataFormat}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#f4a61a" opacity={1} fillOpacity={1} fill="#f4a61a" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default IncomeOverview