# FilterPixel Assignment


# CodePen Vanilla JS Assignment [100 POINTS]

### Machine Coding Assignment: Infinite Scroll Image Gallery

### Objective:

Create an infinite scrollable image gallery app using the Pixabay API. The gallery should support navigation using the up, down, left and right arrow keys as well as mouse scroll. Users should be able to resize the gallery to fit between 3 to 6 images per row using a slider.

API Link: https://pixabay.com/api/docs/

### Requirements:

1. **Image Fetching [35 POINTS]:**
    - Use the [Pixabay API](https://pixabay.com/api/docs/) to fetch images
    - Implement infinite scrolling to continuously load new images as the user scrolls down, do not fetch all images at once as this can overload the network layer and backend API, instead use infinite scrolling to fetch new images as user reaches the end of the list.
    - Optimize the app to ensure smooth scrolling and image loading.
    - Handle large volumes of data efficiently.
2. **Gallery Layout [35 POINTS]:**
    - Allow users to dynamically resize the gallery grid to display between 3 and 6 images per row according to user preference.
    - Provide a dropdown or slider to let users choose the number of images per row
    - Display images in a responsive grid layout that adjusts according to the user's selection.
3. **Navigation [30 POINTS]:**
    - Enable navigation through the gallery using the up, down, left and right arrow keys.
    - Support scrolling with the mouse or touchpad.

### Technical Details:

1. **Frontend:**
    - Use HTML, CSS, and JavaScript/Typescript to achieve this on codepen. A link to this pen will be submitted for review.
    - Implement a responsive design that adjusts to different screen sizes.
    - Obtain an API key from Pixabay.
    - Fetch images using the Pixabay API and handle the response appropriately.
    - Ensure that images are loaded in batches as the user scrolls.
2. **Infinite Scrolling:**
    - Implement an infinite scroll mechanism to load more images when the user reaches the bottom of the page.
    - Manage the state to keep track of loaded images and ensure seamless scrolling.
3. **Keyboard Navigation:**
    - Capture keyboard events to allow users to navigate through the gallery using the up and down arrow keys.
    - Scroll the gallery appropriately based on the user's keypresses.
4. **Gallery Resizing:**
    - Provide a user interface element (dropdown or slider) to adjust the number of images per row.
    - Dynamically update the gallery layout based on the user's selection.

### Bonus Points:

- Implement lazy loading of images to improve performance.
- Add a loading spinner or placeholder images while new images are being fetched.
- Ensure the app is accessible and works well with screen readers.

### Example Mockup:

- The gallery initially shows 3 images per row.
- Users can change the number of images per row to 4, 5, or 6 using a dropdown.
- As the user scrolls down, new images are fetched and displayed automatically.
- Users can navigate up and down through the images using the arrow keys.

### Getting Started:

Create the basic structure with a container for the images and a slider for resizing the gallery.

Style the container and images to ensure a responsive grid layout.

- Integrate with the Pixabay API to fetch images.
- Implement infinite scrolling, dynamic grid resizing, and keyboard navigation.

**Pixabay API:**

- Sign up on Pixabay to get an API key.
- Read the Pixabay API documentation to understand the query parameters and response format.

**Implementation:**

- Fetch images from the Pixabay API and display them in a grid layout.
- Implement infinite scrolling to load more images as the user scrolls.
- Add keyboard event listeners to handle up and down arrow key navigation.
- Provide a control to adjust the number of images per row and update the gallery layout accordingly.

Submission:

- Submit the link to your CodePen project in this  [Google Form](https://forms.gle/).