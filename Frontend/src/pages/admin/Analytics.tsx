import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 4500, expenses: 2400 },
  { month: 'Feb', revenue: 5200, expenses: 2800 },
  { month: 'Mar', revenue: 4800, expenses: 2600 },
  { month: 'Apr', revenue: 6100, expenses: 3200 },
  { month: 'May', revenue: 5500, expenses: 2900 },
  { month: 'Jun', revenue: 7200, expenses: 3800 },
  { month: 'Jul', revenue: 6800, expenses: 3500 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Clothing', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Home', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Sports', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 8, color: 'hsl(var(--chart-5))' },
];

const trafficData = [
  { day: 'Mon', visitors: 1200, orders: 45 },
  { day: 'Tue', visitors: 1400, orders: 52 },
  { day: 'Wed', visitors: 1100, orders: 38 },
  { day: 'Thu', visitors: 1600, orders: 61 },
  { day: 'Fri', visitors: 1800, orders: 72 },
  { day: 'Sat', visitors: 2200, orders: 89 },
  { day: 'Sun', visitors: 1900, orders: 68 },
];

const revenueConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--primary))' },
  expenses: { label: 'Expenses', color: 'hsl(var(--muted-foreground))' },
};

const trafficConfig: ChartConfig = {
  visitors: { label: 'Visitors', color: 'hsl(var(--primary))' },
  orders: { label: 'Orders', color: 'hsl(var(--chart-2))' },
};

const Analytics = () => {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0);
  const profit = totalRevenue - totalExpenses;
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +12.5%
                </div>
              </div>
              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">1,247</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +8.2%
                </div>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visitors</p>
                <p className="text-2xl font-bold">11,200</p>
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  -3.1%
                </div>
              </div>
              <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">{profitMargin}%</p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +2.4%
                </div>
              </div>
              <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/30">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for this year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="h-[300px] w-full">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--muted-foreground))"
                  fillOpacity={0.1}
                  fill="hsl(var(--muted))"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="ml-auto text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Traffic & Orders</CardTitle>
          <CardDescription>Visitors and conversion performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trafficConfig} className="h-[300px] w-full">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
