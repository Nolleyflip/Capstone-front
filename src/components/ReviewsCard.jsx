/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ResponseCard from './ResponseCard';
import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import { postResponse, updateReview } from '@/api/reviews';
import { useDispatch } from 'react-redux';
import { getReviews } from '@/redux/slices/reviewsSlice';
import { Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { deleteReview } from '@/api/reviews';

function ReviewsCard({ id, reviews, business, user }) {
  const dispatch = useDispatch();
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [editReplyContent, setEditReplyContent] = useState({
    rating: 5,
    content: '',
  });

  const addReply = async (reviewId) => {
    if (!replyContent.trim()) return;

    try {
      await postResponse({
        review_id: reviewId,
        business_id: id,
        response_text: replyContent.trim(),
      });
      setReplyContent('');
      setReplyingTo(null);
      dispatch(getReviews(id));
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleUpdateReply = async (reviewId, rating, editReplyContent) => {
    try {
      await updateReview(reviewId, {
        rating,
        review_text: editReplyContent.trim(),
      });
      setEditReplyContent({
        rating: 5,
        content: '',
      });
      dispatch(getReviews(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
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

  return (
    <div>
      {reviews &&
        reviews.map((comment) => (
          <div key={comment.review_id} className="mb-6">
            <div className="flex items-start gap-4">
              {editReplyContent.content !== comment.review_text ? (
                <>
                  <Avatar>
                    <AvatarFallback>{comment.reviewer_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-amber-900">
                        {comment.reviewer_name}
                      </h3>
                      <span className="text-sm text-amber-700">
                        {format(
                          parseISO(comment.review_created),
                          'MMM d, yyyy'
                        )}
                      </span>
                    </div>
                    <div className="mb-2 flex">
                      {renderStars(comment.rating)}
                    </div>
                    <p className="mt-1 text-amber-800">{comment.review_text}</p>
                    <div className="flex items-center justify-between ">
                      <Button
                        variant="link"
                        onClick={() =>
                          replyingTo === comment.review_id
                            ? setReplyingTo(null)
                            : setReplyingTo(comment.review_id)
                        }
                        className="mt-2 p-0 text-amber-600">
                        Reply
                      </Button>
                      {comment.reviewer_name === user.username && (
                        <span className="flex items-center gap-2">
                          <Button
                            variant="link"
                            onClick={() =>
                              setEditReplyContent({
                                ...editReplyContent,
                                content: comment.review_text,
                              })
                            }
                            className="mt-2 p-0 text-amber-600">
                            Edit
                          </Button>
                          <Button
                            variant="link"
                            onClick={() =>
                              handleDeleteReview(comment.review_id)
                            }
                            className="mt-2 p-0 text-amber-600">
                            Delete
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="ml-12 mt-2 min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-amber-900">
                      Your rating:
                    </span>
                    <div className="flex">
                      {renderStars(editReplyContent.rating)}
                    </div>
                  </div>
                  <Slider
                    value={[editReplyContent.rating]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) =>
                      setEditReplyContent({
                        ...editReplyContent,
                        rating: value[0],
                      })
                    }
                    className="mb-4"
                  />
                  <Textarea
                    placeholder="Write a reply..."
                    value={editReplyContent.content}
                    onChange={(e) =>
                      setEditReplyContent({
                        ...editReplyContent,
                        content: e.target.value,
                      })
                    }
                    className="min-h-[80px]"
                  />
                  <Button
                    onClick={() =>
                      handleUpdateReply(
                        comment.review_id,
                        editReplyContent.rating,
                        editReplyContent.content
                      )
                    }
                    className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      setEditReplyContent({ ...editReplyContent, content: '' })
                    }
                    className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
                    Dissmis Edit
                  </Button>
                </div>
              )}
            </div>
            {replyingTo === comment.review_id && (
              <div className="ml-12 mt-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button
                  onClick={() => addReply(comment.review_id)}
                  className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
                  Post Reply
                </Button>
              </div>
            )}
            <ResponseCard
              id={id}
              comment={comment}
              userid={user.id}
              business={business}
            />
            <Separator className="my-4" />
          </div>
        ))}
    </div>
  );
}

export default ReviewsCard;

