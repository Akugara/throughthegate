// Artist photo mapping
const artistPhotos = {
    herachoi: 'Photos/herachoi/herachoi.jpg',
    alejandroramirez: 'Photos/alejandroramirez/alejandroramirezmain.jpg',
    robertopuentes: 'Photos/robertopuentes/robertopuentesmain.jpg',
    agustingaragorry: 'Photos/agustingaragorry/agustingaragorrymain.jpg',
    hieuvo: 'Photos/hieuvo/hieumain.jpg',
    verttiluoma: 'Photos/verttilouma/verttiloumamain.jpg'
};

// Artist stories
const artistStories = {
    herachoi: {
        name: 'Hera Choi',
        story: 'Hera Choi is a photographer originally from Seoul, South Korea, and currently based in Helsinki, Finland. Her work revolves around human presence, an ongoing exploration of what it means to be human and how we connect with one another.\n\nShe uses photography as a way to navigate her own presence in the world, creating images that feel close, intimate, and deeply human. Her upbringing and professional experience have shaped a strong sensitivity to timing, atmosphere, and subtle gesture. Drawn to the vulnerability of being human, she focuses on fleeting expressions and quiet encounters that reveal the emotional movement beneath everyday life.'
    },
    alejandroramirez: {
        name: 'Alejandro Ramirez',
        story: 'Alejandro Ramirez Perez (he/him) (b. 1996 Mexico) is a photographer living and working in Helsinki, Finland since 2019. \n Ramirez explores the spaces we occupy with and how they relate to the emotions they evoke. Often using symmetrical compositions and ample negative space, the works of Ramirez invite the viewer to be transported to the scene and fill in the missing pieces, not with pictures or ideas, but by listening to one’s feelings and embracing them as a fundamental part of the experience.\n\nIn his work, he tries to document life in a way in which it allows the viewer to immerse themselves in the moment and feel the subtlety of what’s happening in the picture, even in the most seemingly ordinary of settings.\n\nAs a photographer, Ramirez has also worked with numerous artists and festivals in Finland helping them create a strong visual identity and document the events with an artistic perspective.'
    },
    robertopuentes: {
        name: 'Roberto Puentes',
        story: 'Roberto Puentes (b. 3 April 1991, Nayarit, Mexico) is a Mexican-born and Helsinki-based creative working across still and moving picture.\n\nHis practice explores space, human connection, color, and the subtle narratives that shape everyday life. Although his work is entirely digital, Roberto\'s visual language is strongly influenced by a sense of nostalgia and a deep appreciation for film aesthetics, which shape his creative process and artistic choices. He continues to develop, work on, and collaborate on projects that bridge his cultural background with his experiences in the Nordic region, bringing together two worlds through a distinctly intimate, documentary approach.'
    },
    agustingaragorry: {
        name: 'Agustín Garagorry',
        story: 'Born on April 8, 1994, in Montevideo, Uruguay, Agustín is a photographer and visual storyteller currently based in Finland. His work is rooted in documentary practice, blending narrative depth with a spontaneous, human-centered approach shaped by real-life experience.\n\nWith over a decade of experience behind the camera, he is the founder of Abstrakti.eu, a creative studio dedicated to elevating the visual communication of local businesses through thoughtful and engaging storytelling.\n\nAgustín approaches each project without a fixed formula. He believes every story demands its own language, and he invests time in building genuine connections with his subjects. This immersive process allows him to uncover nuanced perspectives and create work that feels both authentic and deeply personal.'
    },
    hieuvo: {
        name: 'Hieu Vo',
        story: 'Hieu Vo (they/them) is a fine art and portrait photographer based in Helsinki.\n\nTheir works explore the temporality of life and its multiple facets, reflecting through human connections, in relation to one another as well as to the collective nature. With an emphasis on repeating of subject elements and movements, using different in-camera techniques, Hieu discovers the unseen world of longings and understanding. Much like how one see the world and how the camera sees it, realities and meanings can vastly differ from one person to another.\n\nHieu Vo also works in ceramics. Functional forms and unique patterns that reflect the beauties of nature are their main inspiration.'
    },
    verttiluoma: {
        name: 'Vertti Luoma',
        story: 'Vertti Luoma is a Helsinki-based visual photographer and cinematographer whose practice explores perception, presence, and the subtle emotional weight of everyday moments. Driven by curiosity toward the constantly evolving visual environment, he approaches photography as a tool for exploration — a way of observing how meaning emerges through light, movement, subject, and detail.\n\nHis work is grounded in careful observation of atmosphere and visual rhythm. Rather than documenting events, Luoma is interested in the moments that exist in between: fleeting gestures, transitional states, and situations where stillness and motion coexist simultaneously. Through a meticulous and detail-oriented process, he creates images that invite the viewer to linger and interpret. Luoma\'s artistic practice reflects an ongoing pursuit of visual significance — creating images that feel both personal and shared. Through a balance of intuition and deliberate visual control, he strives to create balanced works that are simultaneously technically demanding, interpretatively open, and visually considered.'
    }
};

// Default photo to show on page load
const defaultArtist = 'herachoi';

const artistClaim ='Through The Gate takes the viewer on a journey exploring life through four moments: Dawn, Movement, Contemplation, and Dream. Each of these moments mirror an aspect of our lives, reminiscing of the different moments of the day, and invites the viewer to experience the intimate emotions of remembering, of life as it lingers within us. \n\nThe exhibition shows the work of six different photographers who, through their own perspective, open the gate that vulnerability represents and invite the viewer to look inwards. We don’t tend to think that contradicting emotions can coexist simultaneously. On Through The Gate, the artists present fragments of life that blur the line between joy and sorrow, motion and stillness, presence and awayness.\n\nThe works presented explore the depth of memory and the delicate line between being present and becoming something that slowly fades. How does one stay present when memories linger and dreams of the future pull us forward?';
const artistList =['Agustin Garagorry','Alejandro Ramirez','Hera Choi', 'Hieu Vo', 'Roberto Puentes','Vertti Louma']
const artistCollaborators = 'Audio fragments by Anna Brear & Illari Heinilä'

// Get elements
const backgroundElement = document.getElementById('background');
const artistButtons = document.querySelectorAll('.artist-name');
const artistStoryElement = document.getElementById('artistStory');
const artistTitleElement = document.getElementById('artistTitle');
const storyTextElement = document.getElementById('storyText');
const closeStoryButton = document.getElementById('closeStory');

// Current active artist
let currentArtist = null;
let imageCache = {};

// Function to preload an image
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        if (imageCache[url]) {
            resolve(imageCache[url]);
            return;
        }

        const img = new Image();
        img.onload = () => {
            imageCache[url] = img;
            resolve(img);
        };
        img.onerror = reject;
        img.src = url;
    });
}

// Function to change background with smooth fade transition
function changeBackground(artistId) {
    const photoPath = artistPhotos[artistId];

    // Only change if photo exists and is different from current
    if (photoPath && photoPath !== currentArtist) {
        // Preload the image first
        preloadImage(photoPath).then(() => {
            // Fade out current image smoothly
            backgroundElement.style.opacity = '0';

            // Wait for fade out to complete, then change image
            setTimeout(() => {
                // Change the background image
                backgroundElement.style.backgroundImage = `url('${photoPath}')`;
                currentArtist = photoPath;

                // Update active state
                updateActiveState(artistId);

                // Fade in new image after a brief moment
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        backgroundElement.style.opacity = '1';
                    });
                });
            }, 850); // Wait for fade out to complete (0.8s transition + buffer)
        }).catch((error) => {
            console.error('Error loading image:', error);
            // Fallback: change anyway
            backgroundElement.style.backgroundImage = `url('${photoPath}')`;
            backgroundElement.style.opacity = '1';
        });
    }
}

// Function to update active state on buttons
function updateActiveState(artistId) {
    artistButtons.forEach(button => {
        if (button.dataset.artist === artistId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Get story elements
const heroElement = document.getElementById('hero');
const storyContainerElement = document.getElementById('storyContainer');
const artistNameDisplayElement = document.getElementById('artistNameDisplay');
const artistsNavElement = document.getElementById('artistsNav');
const mainTitleElement = document.getElementById('mainTitle');
const contentElement = document.querySelector('.content');

// Story state
let isStoryMode = false;

// Function to display story text with fade-in
function displayStoryText(text, element) {
    // First, ensure element is hidden
    element.classList.remove('fade-in');
    element.style.visibility = 'hidden';
    element.style.opacity = '0';

    // Split text into paragraphs
    const paragraphs = text.split('\n\n');

    element.innerHTML = '';

    // Create all paragraph spans at once
    paragraphs.forEach((paragraph, index) => {
        if (index > 0) {
            element.appendChild(document.createElement('br'));
            element.appendChild(document.createElement('br'));
        }
        const span = document.createElement('span');
        span.className = 'paragraph-line';
        span.textContent = paragraph;
        element.appendChild(span);
    });

    // Trigger fade-in animation after content is ready
    requestAnimationFrame(() => {
        element.style.visibility = 'visible';
        element.classList.add('fade-in');
    });
}

// Function to show artist story with animations
function showStory(artistId) {
    const artist = artistStories[artistId];
    if (artist) {
        if (!isStoryMode) {
            // First time entering story mode
            isStoryMode = true;

            // Remove centered class from content
            contentElement.classList.remove('centered');

            // Minimize hero
            heroElement.classList.add('minimized');

            // Dim artist navigation
            artistsNavElement.classList.add('reading-mode');

            // Wait for hero animation, then show story
            setTimeout(() => {
                storyContainerElement.classList.add('active');
                artistNameDisplayElement.textContent = artist.name;

                // Display story text with fade-in
                setTimeout(() => {
                    displayStoryText(artist.story, storyTextElement);
                }, 600);
            }, 400);
        } else {
            // Already in story mode - need to fade out old text first
            // Fade out current text
            storyTextElement.classList.remove('fade-in');
            storyTextElement.style.opacity = '0';

            // Wait for fade out, then change content
            setTimeout(() => {
                // Update artist name
                artistNameDisplayElement.textContent = artist.name;

                // Display new story text with fade-in
                displayStoryText(artist.story, storyTextElement);
            }, 600); // Wait for fade out to complete
        }
    }
}

// Function to reset to initial state
function resetView() {
    if (isStoryMode) {
        isStoryMode = false;

        // Hide story container
        storyContainerElement.classList.remove('active');

        // Restore hero
        heroElement.classList.remove('minimized');

        // Re-enable artist navigation
        artistsNavElement.classList.remove('reading-mode');

        // Add centered class back
        contentElement.classList.add('centered');

        // Clear story text
        setTimeout(() => {
            storyTextElement.innerHTML = '';
            storyTextElement.classList.remove('fade-in');
            artistNameDisplayElement.textContent = '';
        }, 800);
    }
}

// Click on title to reset
mainTitleElement.addEventListener('click', resetView);

// Escape key to reset
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetView();
    }
});

// Add event listeners to artist buttons
artistButtons.forEach(button => {
    const artistId = button.dataset.artist;

    // Click event - show story (works in any mode)
    button.addEventListener('click', () => {
        changeBackground(artistId);
        showStory(artistId);
    });

    // Hover event for desktop - change background only when not in story mode
    button.addEventListener('mouseenter', () => {
        if (!isStoryMode) {
            changeBackground(artistId);
        }
    });

    // Optional: If photo doesn't exist, style button differently
    if (!artistPhotos[artistId]) {
        button.style.opacity = '0.5';
    }
});

// Set default background on page load
window.addEventListener('load', () => {
    changeBackground(defaultArtist);
    // Start with centered layout
    contentElement.classList.add('centered');

    // Trigger entrance animations
    setTimeout(() => {
        backgroundElement.classList.add('animate-in');
        mainTitleElement.classList.add('animate-in');
        document.getElementById('subtitleInfo').classList.add('animate-in');
        artistsNavElement.classList.add('animate-in');
    }, 100);
});

// Aggressive preload all images in background
function preloadAllImages() {
    const photoPaths = Object.values(artistPhotos).filter(path => path !== null);

    // Preload default image first (priority)
    if (artistPhotos[defaultArtist]) {
        preloadImage(artistPhotos[defaultArtist]).then(() => {
            console.log('Default image loaded');
        });
    }

    // Preload remaining images with slight delay to not block initial load
    setTimeout(() => {
        photoPaths.forEach(photoPath => {
            if (photoPath !== artistPhotos[defaultArtist]) {
                preloadImage(photoPath);
            }
        });
    }, 1000);
}

// Start preloading
preloadAllImages();
