import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showNotification, showLoader, hideLoader, toggleLoadMoreButton } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;
let currentPage = 1;
let currentQuery = '';

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = document.getElementById('query').value.trim();
    if (currentQuery === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    currentPage = 1;
    clearGallery();
    toggleLoadMoreButton(false);
    await loadImages();
});

document.getElementById('load-more').addEventListener('click', async () => {
    currentPage += 1;
    await loadImages();
});

async function loadImages() {
    showLoader();
    try {
        const data = await fetchImages(currentQuery, currentPage);
        if (data.hits.length === 0 && currentPage === 1) {
            showNotification('Sorry, there are no images matching your search query. Please try again!', 'error');
        } else {
            renderGallery(data.hits);
            if (lightbox) {
                lightbox.destroy();
            }
            lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();

            toggleLoadMoreButton(currentPage * 15 < data.totalHits);

            if (currentPage * 15 >= data.totalHits) {
                showNotification("We're sorry, but you've reached the end of search results.", 'info');
            }

            smoothScroll();
        }
    } catch (error) {
        showNotification('An error occurred while fetching images', 'error');
    } finally {
        hideLoader();
    }
}

function smoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}