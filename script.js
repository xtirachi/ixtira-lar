// script.js

const imageGallery = document.getElementById('image-gallery');
const 1xlUmCtxGCt0KrdUabaSwl7YXi38AyasP = '1xlUmCtxGCt0KrdUabaSwl7YXi38AyasP';
const https://script.google.com/macros/s/AKfycbxDdXQjIoDTCdmJFrLZ87ZDsXlYhTJTPPgLp_QHI8Ud0Da9Uxy8rPZ2ogpPnrn0jTEo/exec = 'https://script.google.com/macros/s/AKfycbxDdXQjIoDTCdmJFrLZ87ZDsXlYhTJTPPgLp_QHI8Ud0Da9Uxy8rPZ2ogpPnrn0jTEo/exec';

// Fetch images from Google Drive
async function fetchImages() {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${1xlUmCtxGCt0KrdUabaSwl7YXi38AyasP}'+in+parents&key=YOUR_API_KEY`);
    const data = await response.json();
    return data.files;
}

// Render images in the gallery
async function renderImages() {
    const images = await fetchImages();
    images.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = `https://drive.google.com/uc?export=view&id=${image.id}`;
        img.alt = image.name;

        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        const input = document.createElement('input');
        input.placeholder = 'İxtiraçı kodu';

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Bəyən';
        likeButton.addEventListener('click', () => handleLike(image.id, input.value));

        const likesCount = document.createElement('span');
        likesCount.textContent = `Likes: ${getLikes(image.id)}`;

        likeSection.appendChild(input);
        likeSection.appendChild(likeButton);
        likeSection.appendChild(likesCount);

        imageCard.appendChild(img);
        imageCard.appendChild(likeSection);

        imageGallery.appendChild(imageCard);
    });
}

// Handle like button click
async function handleLike(imageId, userId) {
    if (!userId) {
        alert('Zəhmət olmasa İxtiraçı kodunu daxil edin.');
        return;
    }

    const ip = await fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => data.ip);

    // Check if IP has already liked this image
    const hasLiked = await checkIpLike(imageId, ip);
    if (hasLiked) {
        alert('Bu şəkili artıq bəyənmisiniz.');
        return;
    }

    // Update likes in Google Sheets
    await updateLikes(imageId, userId, ip);
    alert('Bəyəndiniz!');

    // Update likes count on the UI
    const likesCount = document.querySelector(`.image-card[data-id='${imageId}'] .like-section span`);
    likesCount.textContent = `Likes: ${getLikes(imageId)}`;
}

// Check if IP has already liked this image
async function checkIpLike(imageId, ip) {
    const response = await fetch(`${https://script.google.com/macros/s/AKfycbxDdXQjIoDTCdmJFrLZ87ZDsXlYhTJTPPgLp_QHI8Ud0Da9Uxy8rPZ2ogpPnrn0jTEo/exec}/check?imageId=${imageId}&ip=${ip}`);
    const data = await response.json();
    return data.hasLiked;
}

// Update likes in Google Sheets
async function updateLikes(imageId, userId, ip) {
    await fetch(`${https://script.google.com/macros/s/AKfycbxDdXQjIoDTCdmJFrLZ87ZDsXlYhTJTPPgLp_QHI8Ud0Da9Uxy8rPZ2ogpPnrn0jTEo/exec}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageId, userId, ip })
    });
}

// Get likes count from Google Sheets
async function getLikes(imageId) {
    const response = await fetch(`${https://script.google.com/macros/s/AKfycbxDdXQjIoDTCdmJFrLZ87ZDsXlYhTJTPPgLp_QHI8Ud0Da9Uxy8rPZ2ogpPnrn0jTEo/exec}/likes?imageId=${imageId}`);
    const data = await response.json();
    return data.likes;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderImages);
