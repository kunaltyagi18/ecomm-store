import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-20" />
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
