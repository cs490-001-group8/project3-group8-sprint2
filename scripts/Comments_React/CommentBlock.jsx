import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import CommentTitle from './CommentTitle';

export default function CommentBlock({
    currTab, myName, loggedIn,
}) {
    const [comments, updateComments] = useState(() => []);
    const [likedComments, changeLikes] = useState(() => []);

    function addToLikes(cid) {
        changeLikes((prev) => prev.concat(cid));
    }

    function removeFromLikes(cid) {
        likedComments.forEach((value, i) => {
            if (value === cid) {
                likedComments.splice(i, 1);
            }
        });
    }

    useEffect(() => {
        Socket.on('new comment', (data) => {
            updateComments((oldComments) => [
                {
                    text: data.text,
                    name: data.name,
                    time: data.time,
                    id: data.id,
                    likes: data.likes,
                }].concat(oldComments));
        });

        Socket.on('old comments', (data) => {
            updateComments(() => data.comments);
        });

        Socket.emit('get comments', { tab: currTab });
    }, []);

    useEffect(() => {
        Socket.emit('get comments', { tab: currTab });
    }, [currTab]);

    if (loggedIn) {
        return (
            <div className="Comment-Block">
                <CommentTitle />
                <CommentList
                  comments={comments}
                  loggedIn={loggedIn}
                  likedComments={likedComments}
                  addToLikes={addToLikes}
                  removeFromLikes={removeFromLikes}
                />
                <CommentInput currTab={currTab} myName={myName} />
            </div>
        );
    }

    return (
        <div className="Comment-Block">
            <CommentTitle />
            <CommentList
              comments={comments}
              loggedIn={loggedIn}
              likedComments={likedComments}
              addToLikes={addToLikes}
              removeFromLikes={removeFromLikes}
            />
        </div>
    );
}

CommentBlock.propTypes = {
    currTab: PropTypes.string.isRequired,
    myName: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
