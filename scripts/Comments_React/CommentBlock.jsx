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
    const [addOnes, changeAddOnes] = useState(() => []);
    const [addZeros, changeAddZeros] = useState(() => []);
    const [subOnes, changeSubOnes] = useState(() => []);

    function addToLikes(cid) {
        changeLikes((prev) => prev.concat(cid));
        if(addZeros.includes(cid))
        {
            addZeros.forEach((value, i) => {
                if (value === cid) {
                    addZeros.splice(i, 1);
                }
            });
            changeAddOnes((prev) => prev.concat(cid));
        }
        else if(subOnes.includes(cid))
        {
            subOnes.forEach((value, i) => {
                if (value === cid) {
                    subOnes.splice(i, 1);
                }
            });
            changeAddZeros((prev) => prev.concat(cid));
        }
        else if(!addOnes.includes(cid))
        {
            changeAddOnes((prev) => prev.concat(cid));
        }
    }

    function removeFromLikes(cid) {
        likedComments.forEach((value, i) => {
            if (value === cid) {
                likedComments.splice(i, 1);
            }
        });
        if(addOnes.includes(cid))
        {
            addOnes.forEach((value, i) => {
                if (value === cid) {
                    addOnes.splice(i, 1);
                }
            });
            changeAddZeros((prev) => prev.concat(cid));
        }
        else if(addZeros.includes(cid))
        {
            addZeros.forEach((value, i) => {
                if (value === cid) {
                    addZeros.splice(i, 1);
                }
            });
            changeSubOnes((prev) => prev.concat(cid));
        }
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

        Socket.on('liked comments', (data) => {
            changeLikes(() => data.comments);
            data.comments.forEach(function(comment_id) {
                changeAddZeros((prev) => prev.concat(comment_id));
            });
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
                  plusOnes={addOnes}
                  plusZeros={addZeros}
                  minusOnes={subOnes}
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
              plusOnes={addOnes}
              plusZeros={addZeros}
              minusOnes={subOnes}
            />
        </div>
    );
}

CommentBlock.propTypes = {
    currTab: PropTypes.string.isRequired,
    myName: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
