// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryCards = document.querySelector('div.gallery');
const cards = createGalleryCards(galleryItems);

galleryCards.insertAdjacentHTML('beforeend', cards);

function createGalleryCards() {
return galleryItems.map(({preview, original, description}) => {
    return`
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image"
        src="${preview}" 
        title="${description}"
    />
  </a>
</div>`
})
.join('');
};

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox');
