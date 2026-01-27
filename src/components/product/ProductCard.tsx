import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product._id);
  const inCart = isInCart(product._id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Card className="group overflow-hidden card-hover border-0 shadow-md bg-card">
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
            {product.isDigital && (
              <Badge variant="secondary" className="font-medium px-2.5 py-1 text-xs rounded-full">
                Digital
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="outline" className="bg-background font-medium px-2.5 py-1 text-xs rounded-full">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="bg-destructive text-destructive-foreground font-medium px-2.5 py-1 text-xs rounded-full">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute right-3 top-3 h-9 w-9 rounded-full shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100",
              inWishlist && "opacity-100 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button
              className="w-full rounded-none h-12 btn-gradient font-semibold"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || inCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inCart ? 'Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</p>
          
          {/* Title */}
          <h3 className="font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.numReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
