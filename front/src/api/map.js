import axios from 'axios';
import { instance } from './axios';

export const postMapRange = (size) => {
    return instance.post(`/api/map?size=${size}`)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    })
}