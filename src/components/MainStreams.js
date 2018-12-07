import React from 'react';
import streams from './api/Streams.js'

let values ={
    id:1,
    name:Liviu
}
export const createStreams  = values => async (dispatch) =>{
    streams.post('/streams', values)
};



