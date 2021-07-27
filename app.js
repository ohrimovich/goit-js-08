const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryBox = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const originalSizeImg = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');
let targetEl;
let index;

galleryBox.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', onBackdropClick)

function createGallery(array) {
  const galleryItems = array.map(({ preview, original, description } = item) => galleryBox.insertAdjacentHTML('beforeend', `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`)
  )
}

createGallery(galleryItems);

function openModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onLeftArrowKeyPress);
  window.addEventListener('keydown', onRightArrowKeyPress);
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.add('is-open');
  addImgIntoModal(event);
}


function addImgIntoModal(e) {
  targetEl = e.target.dataset.source;
  originalSizeImg.src = e.target.dataset.source;
  originalSizeImg.alt = e.target.alt;

}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onLeftArrowKeyPress);
  window.removeEventListener('keydown', onRightArrowKeyPress);
  index = undefined;
  modal.classList.remove('is-open');
  originalSizeImg.src = '';
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }

}

function onLeftArrowKeyPress(event) {
  const arrayOfOriginLinks = galleryItems.map(item => item.original);
  if (index === undefined) {
    index = arrayOfOriginLinks.indexOf(targetEl);
  }
  
  if (event.code === 'ArrowLeft') {

    if (index === 0) {
      index = arrayOfOriginLinks.length;
 }
    index -= 1;
    originalSizeImg.src = arrayOfOriginLinks[index];
    
  }

}

function onRightArrowKeyPress(event) {
  const arrayOfOriginLinks = galleryItems.map(item => item.original);
  if (index === undefined) {
    index = arrayOfOriginLinks.indexOf(targetEl);
  }

  if (event.code === 'ArrowRight') {

       if (index === arrayOfOriginLinks.length - 1) {
      index = -1;
    }
    index += 1;
    originalSizeImg.src = arrayOfOriginLinks[index];
    

 



  }

}




