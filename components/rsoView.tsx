import React, { useState } from 'react';

const RSOView = (props: { rso: any }) => {
    const rso = props.rso;

    return (
        <div>
            <div className="h-[17rem] outline bg-stone-50p-7 rounded-lg">
                <div className="mb-1 text-lg font-bold">{rso.title}</div>
            </div>
        </div>
    );
};

export default RSOView;