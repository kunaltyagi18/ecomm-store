import { format } from 'date-fns';
import { 
  Package, Truck, CreditCard, MapPin, Calendar, 
  Clock, CheckCircle2, XCircle, Loader2, X 
} from 'lucide-react';
import { Order } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, open, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Loader2 className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'shipped': return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing': return <Loader2 className="h-5 w-5 text-yellow-600" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order #{order._id.slice(-8)}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getOrderStatusIcon(order.orderStatus)}
              <Badge className={getStatusColor(order.orderStatus)}>
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items ({order.items.length})
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-1">{item.product.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                        <span className="font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Shipping & Payment Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h3>
                <div className="p-4 rounded-lg bg-secondary/30 space-y-1 text-sm">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-muted-foreground">{order.shippingAddress.country}</p>
                  <p className="text-muted-foreground mt-2">📞 {order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Information
                </h3>
                <div className="p-4 rounded-lg bg-secondary/30 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1.5 font-medium capitalize">
                      {getPaymentStatusIcon(order.paymentStatus)}
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div>
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="p-4 rounded-lg bg-secondary/30 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Order Timeline
              </h3>
              <div className="space-y-3">
                <TimelineItem
                  icon={<Package className="h-4 w-4" />}
                  title="Order Placed"
                  date={format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                  active
                />
                {['processing', 'shipped', 'delivered'].includes(order.orderStatus) && (
                  <TimelineItem
                    icon={<Loader2 className="h-4 w-4" />}
                    title="Processing"
                    date="Order is being prepared"
                    active
                  />
                )}
                {(order.orderStatus === 'shipped' || order.orderStatus === 'delivered') && (
                  <TimelineItem
                    icon={<Truck className="h-4 w-4" />}
                    title="Shipped"
                    date="Package is on the way"
                    active
                  />
                )}
                {order.orderStatus === 'delivered' && (
                  <TimelineItem
                    icon={<CheckCircle2 className="h-4 w-4" />}
                    title="Delivered"
                    date={format(new Date(order.updatedAt), 'MMM d, yyyy h:mm a')}
                    active
                  />
                )}
                {order.orderStatus === 'cancelled' && (
                  <TimelineItem
                    icon={<XCircle className="h-4 w-4" />}
                    title="Cancelled"
                    date="Order was cancelled"
                    active
                    variant="destructive"
                  />
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  active?: boolean;
  variant?: 'default' | 'destructive';
}

const TimelineItem = ({ icon, title, date, active, variant = 'default' }: TimelineItemProps) => (
  <div className="flex gap-3">
    <div
      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        active
          ? variant === 'destructive'
            ? 'bg-destructive/10 text-destructive'
            : 'bg-primary/10 text-primary'
          : 'bg-muted text-muted-foreground'
      }`}
    >
      {icon}
    </div>
    <div>
      <p className={`font-medium ${!active && 'text-muted-foreground'}`}>{title}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  </div>
);

export default OrderDetailsModal;
