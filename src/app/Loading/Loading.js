'use client';
import React from 'react';


export default function Loading() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Loading...</h1>
            <img src='/IMG_5031.PNG' className='h-5 w-5'></img>
            {/* <p>Analyzing your inputs. Mapping your life path...</p> */}
        </div>
    );
}

