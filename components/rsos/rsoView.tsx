import React, { useState } from 'react';

const RSOView = (props: { rso: any }) => {
    const rso = props.rso;

    return (
        <div>
            <div className="h-[17rem] outline bg-stone-50p-7 rounded-lg">
                <div className="flex justify-between">
                    <div>
                    <button className="p-2 rounded-full py-0.5 font-bold transition hover:bg-neutral-400hover:text-gray-800 text-Lg" onClick={() => console.log("yes")}>
                        Request to Join
                    </button>
                    </div>
                </div>
                <div className="mb-1 text-lg font-bold">{rso.title}</div>
            </div>
        </div>
    );
};

export default RSOView;