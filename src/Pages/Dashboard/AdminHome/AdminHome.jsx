import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiWallet } from 'react-icons/gi';
import { FaShippingFast, FaUsers } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend} from 'recharts';

const AdminHome = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data: stats = {}} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () =>{
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })


 // Chat 1
const {data: chartData = []} = useQuery({
    queryKey: ['chart-data'],
    queryFn: async()=>{
        const res = await axiosSecure('/order-stats');
        return res.data;
    }
})

 const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

 const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // chart 2

  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

    return (
        <div className="w-full min-h-full p-6">
            <h3 className="text-3xl font-bold">Hi, <span className="text-orange-600">{user.displayName}</span></h3>

            <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <GiWallet className="text-4xl"></GiWallet>
    </div>
    <div className="stat-title">Revenue</div>
    <div className="stat-value">${stats.revenue}</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaUsers className="text-4xl"></FaUsers>
    </div>
    <div className="stat-title">New Users</div>
    <div className="stat-value">{stats.users}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <BiFoodMenu className="text-4xl"></BiFoodMenu>
    </div>
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{stats.products}</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaShippingFast className="text-4xl"></FaShippingFast>
    </div>
    <div className="stat-title">Orders</div>
    <div className="stat-value">{stats.orders}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>

{/* Chat  */}
<div className="flex">
    <div className="w-1/2">
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
    <div className="w-1/2">
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
            <Legend></Legend>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {chartData.map((entry, index) => (
              <Cell name={entry.category} key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

</div>
        </div>
    );
};

export default AdminHome;