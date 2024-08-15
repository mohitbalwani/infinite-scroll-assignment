const apiKey = '44294725-5647d237cd87ca3498ec2ee31'; // Replace with your Pixabay API key
let page = 1;
let imagesPerRow = 3;
const gallery = document.getElementById('gallery');
const imagesPerRowInput = document.getElementById('images-per-row');
const spinner = document.querySelector('.spinner');
let fetching = false; // To prevent multiple simultaneous fetches
const imageCache = new Set(); // Cache to store fetched images

// Fetch images from Pixabay API
const fetchImages = async () => {
  if (fetching) return; // Exit if already fetching
  fetching = true;
  spinner.style.display = 'block';
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&page=${page}&per_page=20`);
    const data = await response.json();
    const newImages = data.hits.filter(image => !imageCache.has(image.id));
    newImages.forEach(image => imageCache.add(image.id));
    displayImages(newImages);
    page++;
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    fetching = false;
    spinner.style.display = 'none';
  }
};

// Display images in the gallery
const displayImages = (images) => {
  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.dataset.src = image.webformatURL; // Store URL in data attribute for lazy loading
    img.classList.add('image-item');
    img.loading = 'lazy'; // Lazy loading
    img.setAttribute('tabindex', '0'); // Make image focusable
    img.setAttribute('role', 'img'); // Define role for screen readers
    img.setAttribute('aria-label', image.tags); // Provide descriptive label for screen readers
    img.setAttribute('alt', image.tags); // Add meaningful alt text

    // Add keydown event listener for navigation
    img.addEventListener('keydown', async (event) => {
      const allImages = document.querySelectorAll('.image-item');
      const columns = Math.ceil(allImages.length / imagesPerRow);
      const columnIndex = index % imagesPerRow; // Get the column index of the current image
      let newIndex;

      switch (event.key) {
        case 'ArrowUp':
          newIndex = index - imagesPerRow;
          if (newIndex < 0) {
            window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom
            await fetchImages(); // Fetch new images when reaching the top
            newIndex = allImages.length - (imagesPerRow - columnIndex) - (columns - Math.ceil(allImages.length / imagesPerRow)) * imagesPerRow;
          }
          break;
        case 'ArrowDown':
          newIndex = index + imagesPerRow;
          newIndex = index + imagesPerRow;
          const lastRowIndex = Math.ceil(allImages.length / imagesPerRow) - 1;
          const isAtLastRow = Math.floor(index / imagesPerRow) === lastRowIndex;

          if (isAtLastRow && newIndex >= allImages.length) {
            await fetchImages(); // Fetch new images when reaching the last row and beyond
            allImages = document.querySelectorAll('.image-item'); // Recalculate allImages after fetching
            newIndex = index + imagesPerRow; // Update newIndex after fetching
          }

          if (newIndex >= 0 && newIndex < allImages.length) {
            allImages[newIndex].focus(); // Set focus to the newly generated image
          }
          break;
        case 'ArrowLeft':
          newIndex = index - 1;
          if (columnIndex === 0) {
            newIndex = index - imagesPerRow + 1; // Move to the last image of the previous column
            if (newIndex < 0) {
              newIndex = 0; // Ensure newIndex doesn't go below 0
            }
          }
          break;
        case 'ArrowRight':
          newIndex = index + 1;
          if ((newIndex % imagesPerRow) === 0 || newIndex >= allImages.length) {
            await fetchImages(); // Fetch new images when reaching the end of row or last image
            newIndex = index + 1; // Update newIndex after fetching
          }
          break;
        default:
          return;
      }

      if (newIndex >= 0 && newIndex < allImages.length) {
        allImages[newIndex].focus();
      }
    });

    gallery.appendChild(img);
  });

  // Use Intersection Observer to lazy load images
  lazyLoadImages();
};

// Update gallery layout based on the selected number of images per row
const updateGalleryLayout = () => {
  gallery.style.gridTemplateColumns = `repeat(${imagesPerRow}, 1fr)`;
};

// Debounce function to limit the rate of function execution
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Throttle function to limit the rate of function execution
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Handle scroll event to fetch more images when reaching the bottom
const handleScroll = debounce(() => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchImages();
  }
}, 200);

// Attach scroll event listener with throttling
window.addEventListener('scroll', throttle(handleScroll, 200));

// Update images per row based on user input
imagesPerRowInput.addEventListener('input', (event) => {
  imagesPerRow = Math.max(3, Math.min(6, event.target.value));
  updateGalleryLayout();
});

// Set initial layout and fetch initial batch of images
updateGalleryLayout();
fetchImages();

// Lazy loading using Intersection Observer
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('.image-item').forEach(img => {
    imageObserver.observe(img);
  });
};
