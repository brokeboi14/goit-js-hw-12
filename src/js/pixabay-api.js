import axios from 'axios';
const API_KEY = '44599145-181f37b758d0f90a33e2c7ba6';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(query, page = 1) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page
    };
    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}