import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-24 rounded-lg object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            to={`/products/${product._id}`}
            className="font-medium hover:text-primary line-clamp-2"
          >
            {product.title}
          </Link>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product._id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product._id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold">${(product.price * quantity).toFixed(2)}</p>
            {quantity > 1 && (
              <p className="text-sm text-muted-foreground">
                ${product.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={() => removeFromCart(product._id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
