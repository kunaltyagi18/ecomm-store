import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Button asChild className="btn-gradient">
            <Link to="/products">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <Button variant="outline" onClick={clearWishlist} className="text-destructive hover:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const inCart = isInCart(product._id);
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <Card key={product._id} className="group overflow-hidden card-hover border-0 shadow-md">
              <Link to={`/products/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-destructive text-destructive-foreground font-bold px-2.5 py-1 text-xs rounded-full">
                        -{discount}%
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge className="bg-destructive text-destructive-foreground font-medium px-2.5 py-1 text-xs rounded-full">
                        Sold Out
                      </Badge>
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-3 h-9 w-9 rounded-full shadow-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product._id);
                    }}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </Link>

              <CardContent className="p-4 space-y-3">
                {/* Category */}
                <p className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</p>
                
                {/* Title */}
                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold line-clamp-2 text-foreground hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  className={cn(
                    "w-full",
                    inCart ? "bg-secondary text-secondary-foreground" : "btn-gradient"
                  )}
                  disabled={product.stock === 0 || inCart}
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {inCart ? 'Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Continue Shopping */}
      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link to="/products">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Wishlist;
