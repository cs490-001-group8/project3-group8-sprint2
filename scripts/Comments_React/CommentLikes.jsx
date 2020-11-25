import React, { useState } from 'react';
import { Socket } from '../Socket';
import PropTypes from 'prop-types';

export default function CommentLikes({ commentId, commentLikes }) {
    const [selected, changeSelected] = useState(() => false);
    const [likes, changeLikes] = useState(() => commentLikes);

    function likeComment() {
        changeSelected((last) => !last);
        console.log("ADFASFASDFASDAF");
        Socket.emit('like comment', {
            comment_id: commentId,
            like: !selected,
        });
        if(!selected)
        {
            changeLikes((last) => last+1);
        }
        else
        {
            changeLikes((last) => last-1);
        }
    }
    
    return (
        <div className="comment-foot">
            {likes}
            <input type="checkbox" onClick={likeComment} />
            <span className="comment-like"></span>
        </div>
    );
}

CommentLikes.propTypes = {
    commentId: PropTypes.number.isRequired,
    commentLikes: PropTypes.number.isRequired,
};
