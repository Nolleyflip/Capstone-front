/* eslint-disable react/prop-types */
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Utensils, Clock, DollarSign, ThumbsUp } from 'lucide-react';

function DetailBussinessCard({ business, reviewsNumber }) {
  return (
    <Card className="mx-auto max-w-4xl overflow-hidden">
      <img
        src={business?.business_image}
        alt="The Green Bistro"
        className="h-64 w-full object-cover"
      />
      <CardContent className="p-6">
        <h1 className="mb-4 text-3xl font-bold text-amber-900">
          {business.business_name}
        </h1>
        <div className="mb-4 flex items-center">
          <Star className="mr-1 h-6 w-6 fill-amber-400 text-amber-400" />
          <span className="text-xl font-medium text-amber-900">
            {business.rating.slice(0, 3)}
          </span>
          <span className="ml-2 text-sm text-amber-700">{`(${reviewsNumber} reviews)`}</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-amber-100 text-amber-800">
            <Utensils className="h-4 w-4" />
            {business.category}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-amber-100 text-amber-800">
            <Clock className="h-4 w-4" />
            Open Now
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-amber-100 text-amber-800">
            <DollarSign className="h-4 w-4" />
            $$
          </Badge>
        </div>
        <p className="mb-4 text-amber-800">{business.description}</p>
        <Badge className="bg-amber-200 text-amber-800">
          <ThumbsUp className="mr-1 h-4 w-4" />
        </Badge>
      </CardContent>
    </Card>
  );
}

export default DetailBussinessCard;

