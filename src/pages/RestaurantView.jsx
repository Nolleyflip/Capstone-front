import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBusiness,
  selectBusiness,
  selectBusinessStatus,
} from '@/redux/slices/businesSlice';
import {
  getReviews,
  selectReviews,
  selectReviewsStatus,
} from '@/redux/slices/reviewsSlice';
import { useParams } from 'react-router-dom';
import DetailBussinessCard from '../components/DetailBussinessCard';
import ReviewsCard from '@/components/ReviewsCard';
import { postReview } from '@/api/reviews';

export default function RestaurantView() {
  const { id } = useParams();
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let business = useSelector(selectBusiness);
  business = business.filter((business) => +id == business.business_id);
  const reviews = useSelector(selectReviews);
  console.log(reviews);
  console.log(business);
  const reviewStatus = useSelector(selectReviewsStatus);
  const status = useSelector(selectBusinessStatus);

  const addReviewButton = async () => {
    try {
      await postReview(id, {
        business_id: id,
        rating: newReview.rating,
        review_text: newReview.content.trim(),
      });
      setNewReview({ rating: 5, content: '' });
      dispatch(getReviews(id));
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBusiness());
    }
  }, [dispatch]);

  useEffect(() => {
    if (reviewStatus === 'idle') {
      dispatch(getReviews(id));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <DetailBussinessCard
        business={business[0]}
        reviewsNumber={reviews.length}
      />

      <Card className="mx-auto mt-8 max-w-4xl">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-bold text-amber-900">Comments</h2>
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium text-amber-900">
                Your rating:
              </span>
              <div className="flex">{renderStars(newReview.rating)}</div>
            </div>
            <Slider
              value={[newReview.rating]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) =>
                setNewReview({ ...newReview, rating: value[0] })
              }
              className="mb-4"
            />
            <Textarea
              placeholder="Write your review..."
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              className="min-h-[100px]"
            />
            <Button
              onClick={addReviewButton}
              className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
              Post Review
            </Button>
          </div>
          <Separator className="my-4" />
          <ReviewsCard
            id={id}
            reviews={reviews}
            business={business[0]}
            user={user}
          />
        </CardContent>
      </Card>
    </div>
  );
}

