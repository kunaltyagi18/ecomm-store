import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Package, ChevronRight } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

const getStatusColor = (status: Order['orderStatus']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return '';
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order #{order._id}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(order.orderStatus)} variant="outline">
            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Order Items Preview */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {order.items.slice(0, 4).map((item, index) => (
            <img
              key={index}
              src={item.product.image}
              alt={item.product.title}
              className="h-16 w-16 rounded-lg object-cover shrink-0"
            />
          ))}
          {order.items.length > 4 && (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted shrink-0">
              <span className="text-sm text-muted-foreground">
                +{order.items.length - 4}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {order.items.length} item{order.items.length > 1 ? 's' : ''}
            </p>
            <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/orders/${order._id}`}>
              View Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
