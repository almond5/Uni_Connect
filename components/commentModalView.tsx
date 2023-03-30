import React, { useState } from 'react';

const CommentModalView = (props: { setCommentModalView: any; }) => {
    
    const handleClose = () => {
        props.setCommentModalView(false);
    }


    return (
        <div className="h-[20rem] outline bg-stone-50
        p-7 rounded-lg">
            <div className="flex justify-between">
                <div>
                    <button className="p-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg"
                            onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
            <div>
                comments go here
            </div>
        </div>
    )
}

export default CommentModalView;