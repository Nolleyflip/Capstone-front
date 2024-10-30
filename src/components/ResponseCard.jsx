/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { updateResponse } from '@/api/reviews';
import { useDispatch } from 'react-redux';
import { getReviews } from '@/redux/slices/reviewsSlice';
import { deleteResponse } from '@/api/reviews';

function ResponseCard({ id, comment, business, userid }) {
  const dispatch = useDispatch();
  const [editContent, setEditContent] = useState('');

  const handleUpdateResponse = async (idResponse, editResponse) => {
    try {
      await updateResponse(idResponse, {
        response_text: editResponse.trim(),
      });
      setEditContent('');
      dispatch(getReviews(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteResponse = async (idResponse) => {
    try {
      await deleteResponse(idResponse);
      dispatch(getReviews(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {comment.responses.map((reply) => (
        <div key={reply.id} className="ml-12 mt-4 flex items-start gap-4">
          {editContent === '' ? (
            <>
              {' '}
              <Avatar>
                <AvatarFallback>{reply.responder_name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between ">
                  <div
                    className={
                      reply.responder_id === business.owner_id
                        ? 'flex items-center gap-2'
                        : ''
                    }>
                    <h4 className="font-semibold text-amber-900">
                      {reply.responder_name}
                    </h4>
                    {reply.responder_id === business.owner_id && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-amber-100 text-amber-800">
                        <span className="h-4 w-8">
                          {reply.responder_id === business.owner_id
                            ? 'owner'
                            : null}
                        </span>
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-amber-700">
                    {format(parseISO(reply.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="mt-1 text-amber-800">{reply.response_text}</p>
                  {reply.responder_id === userid && (
                    <span className="flex items-center gap-2">
                      <Button
                        variant="link"
                        onClick={() => setEditContent(reply.response_text)}
                        className="mt-2 p-0 text-amber-600">
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteResponse(reply.response_id)}
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
              <Textarea
                placeholder="Write a reply..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[80px]"
              />
              <Button
                onClick={() =>
                  handleUpdateResponse(reply.response_id, editContent)
                }
                className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
                Edit
              </Button>
              <Button
                onClick={() => setEditContent('')}
                className="mt-2 bg-amber-500 text-white hover:bg-amber-600">
                Dismiss Edit
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ResponseCard;

