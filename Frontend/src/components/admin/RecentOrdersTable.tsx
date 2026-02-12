import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

interface RecentOrdersTableProps {
  orders: Order[];
}

const getStatusBadge = (status: Order['orderStatus']) => {
  const variants: Record<Order['orderStatus'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
    pending: { variant: 'secondary', label: 'Pending' },
    processing: { variant: 'outline', label: 'Processing' },
    shipped: { variant: 'default', label: 'Shipped' },
    delivered: { variant: 'default', label: 'Delivered' },
    cancelled: { variant: 'destructive', label: 'Cancelled' },
  };
  
  const { variant, label } = variants[status];
  return <Badge variant={variant}>{label}</Badge>;
};

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">#{order._id.slice(-6).toUpperCase()}</TableCell>
              <TableCell>{order.shippingAddress.fullName}</TableCell>
              <TableCell>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
              <TableCell className="text-right font-medium">
                ${order.totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentOrdersTable;
