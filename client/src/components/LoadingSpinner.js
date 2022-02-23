import React from 'react';

const LoadingSpinner = ({isScreen, width}) => (
    <div className={`w-full h-[360px] flex items-center justify-center ${isScreen && ' h-screen '} ${width && 'w-[50vw]'} `}>
        <div className="inline-block relative">
            <div
                className="absolute left-[-60px] top-[-60px] w-[100px] h-[100px] m-4 border-[10px] rounded-full border-b-[transparent] animate-spin "></div>
        </div>
    </div>
);

export default LoadingSpinner;