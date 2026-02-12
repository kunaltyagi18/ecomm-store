import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import SalesChart from '@/components/admin/SalesChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import { mockOrders } from '@/data/mockOrders';
import { mockProducts } from '@/data/mockProducts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Calculate stats from mock data
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const pendingOrders = mockOrders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
        <Button asChild>
          <Link to="/admin/products">
            <Package className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          change="+8.2% from last month"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatsCard
          title="Products"
          value={totalProducts}
          change="3 low stock"
          changeType="neutral"
          icon={Package}
          iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
        <StatsCard
          title="Pending Orders"
          value={pendingOrders}
          change="Needs attention"
          changeType="negative"
          icon={TrendingUp}
          iconColor="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProducts.slice(0, 5).map((product, index) => (
              <div key={product._id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                  #{index + 1}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{product.title}</p>
                  <p className="text-xs text-muted-foreground">{product.numReviews} sales</p>
                </div>
                <p className="text-sm font-medium">${product.price}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <p className="text-sm text-muted-foreground">Latest customer orders</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/orders">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <RecentOrdersTable orders={mockOrders} />
      </div>
    </div>
  );
};

export default Dashboard;
