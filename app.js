// Music Player Application JavaScript

// Application data
const musicData = {
    "playlists": [
        {
            "id": 1,
            "name": "Synthwave Nights",
            "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            "tracks": [
                {
                    "id": 1,
                    "title": "Midnight Drive",
                    "artist": "Neon Pulse",
                    "album": "Electric Dreams",
                    "duration": "4:23",
                    "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                },
                {
                    "id": 2,
                    "title": "Cyber City",
                    "artist": "Digital Horizon",
                    "album": "Future Nights",
                    "duration": "3:47",
                    "cover": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop"
                },
                {
                    "id": 3,
                    "title": "Neon Glow",
                    "artist": "Synthwave Collective",
                    "album": "Retro Future",
                    "duration": "5:12",
                    "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                }
            ]
        },
        {
            "id": 2,
            "name": "Dark Ambient",
            "cover": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
            "tracks": [
                {
                    "id": 4,
                    "title": "Shadow Realm",
                    "artist": "Dark Matter",
                    "album": "Void",
                    "duration": "6:34",
                    "cover": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
                },
                {
                    "id": 5,
                    "title": "Deep Space",
                    "artist": "Cosmic Drift",
                    "album": "Interstellar",
                    "duration": "7:21",
                    "cover": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=300&fit=crop"
                }
            ]
        },
        {
            "id": 3,
            "name": "Electronic Vibes",
            "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
            "tracks": [
                {
                    "id": 6,
                    "title": "Digital Rain",
                    "artist": "Matrix Sound",
                    "album": "Code",
                    "duration": "4:15",
                    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
                },
                {
                    "id": 7,
                    "title": "Bass Drop",
                    "artist": "Heavy Electronics",
                    "album": "Low End",
                    "duration": "3:33",
                    "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                }
            ]
        }
    ],
    "recent_tracks": [
        {
            "id": 1,
            "title": "Midnight Drive",
            "artist": "Neon Pulse",
            "album": "Electric Dreams",
            "duration": "4:23",
            "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
        },
        {
            "id": 4,
            "title": "Shadow Realm",
            "artist": "Dark Matter",
            "album": "Void",
            "duration": "6:34",
            "cover": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
        }
    ],
    "featured_artists": [
        {
            "name": "Neon Pulse",
            "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
            "genre": "Synthwave"
        },
        {
            "name": "Dark Matter",
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
            "genre": "Dark Ambient"
        },
        {
            "name": "Digital Horizon",
            "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop",
            "genre": "Electronic"
        }
    ]
};

// Application state
const AppState = {
    isPlaying: false,
    currentTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    shuffleMode: false,
    repeatMode: false,
    visualizerMode: 'bars',
    searchQuery: '',
    searchFilter: 'all'
};

// DOM Elements
const elements = {
    // Player controls
    playBtn: document.getElementById('play-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    shuffleBtn: document.getElementById('shuffle-btn'),
    repeatBtn: document.getElementById('repeat-btn'),
    
    // Track info
    currentTitle: document.getElementById('current-title'),
    currentArtist: document.getElementById('current-artist'),
    currentAlbum: document.getElementById('current-album'),
    currentAlbumArt: document.getElementById('current-album-art'),
    currentTime: document.getElementById('current-time'),
    totalTime: document.getElementById('total-time'),
    
    // Progress bar
    progressBar: document.querySelector('.progress-bar'),
    progressFill: document.getElementById('progress-fill'),
    progressHandle: document.getElementById('progress-handle'),
    
    // Visualizer
    visualizerCanvas: document.getElementById('visualizer-canvas'),
    vizModeButtons: document.querySelectorAll('.viz-mode-btn'),
    
    // Library sections
    recentTracks: document.getElementById('recent-tracks'),
    playlists: document.getElementById('playlists'),
    featuredArtists: document.getElementById('featured-artists'),
    
    // Search
    searchInput: document.getElementById('search-input'),
    searchResults: document.getElementById('search-results'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    
    // Theme controls
    hue1Slider: document.getElementById('hue1'),
    hue2Slider: document.getElementById('hue2'),
    
    // Equalizer
    eqSliders: document.querySelectorAll('.eq-slider'),
    eqPresets: document.getElementById('eq-presets'),
    
    // Context menu
    contextMenu: document.getElementById('context-menu'),
    menuItems: document.querySelectorAll('.menu-item')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupContextMenu();
    setupVisualizer();
    loadLibraryContent();
    setupThemeControls();
    setupEqualizer();
});

function initializeApp() {
    // Set initial track
    if (musicData.recent_tracks.length > 0) {
        AppState.currentTrack = musicData.recent_tracks[0];
        updateCurrentTrackDisplay();
    }
    
    // Initialize random hue values
    const rand1 = 120 + Math.floor(Math.random() * 240);
    const rand2 = rand1 - 80 + (Math.floor(Math.random() * 60) - 30);
    elements.hue1Slider.value = rand1;
    elements.hue2Slider.value = rand2;
    updateThemeColors(rand1, rand2);
}

function setupEventListeners() {
    // Player controls
    elements.playBtn.addEventListener('click', togglePlay);
    elements.prevBtn.addEventListener('click', previousTrack);
    elements.nextBtn.addEventListener('click', nextTrack);
    elements.shuffleBtn.addEventListener('click', toggleShuffle);
    elements.repeatBtn.addEventListener('click', toggleRepeat);
    
    // Progress bar
    elements.progressBar.addEventListener('click', seekToPosition);
    
    // Visualizer mode buttons
    elements.vizModeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.vizModeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.visualizerMode = btn.dataset.mode;
        });
    });
    
    // Search functionality
    elements.searchInput.addEventListener('input', handleSearch);
    elements.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.searchFilter = btn.dataset.filter;
            handleSearch();
        });
    });
    
    // Theme controls
    elements.hue1Slider.addEventListener('input', updateTheme);
    elements.hue2Slider.addEventListener('input', updateTheme);
    
    // Equalizer
    elements.eqPresets.addEventListener('change', applyEQPreset);
    elements.eqSliders.forEach(slider => {
        slider.addEventListener('input', updateEqualizer);
    });
}

// Player functionality
function togglePlay() {
    AppState.isPlaying = !AppState.isPlaying;
    
    if (AppState.isPlaying) {
        elements.playBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
            </svg>
        `;
        startPlaybackSimulation();
    } else {
        elements.playBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        `;
        stopPlaybackSimulation();
    }
}

function previousTrack() {
    // Find current track in all tracks
    const allTracks = getAllTracks();
    const currentIndex = allTracks.findIndex(track => track.id === AppState.currentTrack.id);
    
    if (currentIndex > 0) {
        AppState.currentTrack = allTracks[currentIndex - 1];
        updateCurrentTrackDisplay();
        resetProgress();
    }
}

function nextTrack() {
    const allTracks = getAllTracks();
    const currentIndex = allTracks.findIndex(track => track.id === AppState.currentTrack.id);
    
    if (currentIndex < allTracks.length - 1) {
        AppState.currentTrack = allTracks[currentIndex + 1];
        updateCurrentTrackDisplay();
        resetProgress();
    }
}

function toggleShuffle() {
    AppState.shuffleMode = !AppState.shuffleMode;
    elements.shuffleBtn.style.color = AppState.shuffleMode ? 'white' : '#a0a0a0';
}

function toggleRepeat() {
    AppState.repeatMode = !AppState.repeatMode;
    elements.repeatBtn.style.color = AppState.repeatMode ? 'white' : '#a0a0a0';
}

function updateCurrentTrackDisplay() {
    if (AppState.currentTrack) {
        elements.currentTitle.textContent = AppState.currentTrack.title;
        elements.currentArtist.textContent = AppState.currentTrack.artist;
        elements.currentAlbum.textContent = AppState.currentTrack.album;
        elements.currentAlbumArt.src = AppState.currentTrack.cover;
        elements.totalTime.textContent = AppState.currentTrack.duration;
    }
}

function seekToPosition(event) {
    const rect = elements.progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    
    AppState.currentTime = percentage * parseDuration(AppState.currentTrack.duration);
    updateProgress();
}

function startPlaybackSimulation() {
    if (AppState.playbackInterval) {
        clearInterval(AppState.playbackInterval);
    }
    
    AppState.playbackInterval = setInterval(() => {
        if (AppState.isPlaying) {
            AppState.currentTime += 1;
            const totalSeconds = parseDuration(AppState.currentTrack.duration);
            
            if (AppState.currentTime >= totalSeconds) {
                if (AppState.repeatMode) {
                    AppState.currentTime = 0;
                } else {
                    nextTrack();
                }
            }
            
            updateProgress();
        }
    }, 1000);
}

function stopPlaybackSimulation() {
    if (AppState.playbackInterval) {
        clearInterval(AppState.playbackInterval);
    }
}

function updateProgress() {
    const totalSeconds = parseDuration(AppState.currentTrack.duration);
    const percentage = (AppState.currentTime / totalSeconds) * 100;
    
    elements.progressFill.style.width = percentage + '%';
    elements.progressHandle.style.left = percentage + '%';
    elements.currentTime.textContent = formatTime(AppState.currentTime);
}

function resetProgress() {
    AppState.currentTime = 0;
    updateProgress();
}

function parseDuration(duration) {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getAllTracks() {
    const allTracks = [];
    musicData.playlists.forEach(playlist => {
        allTracks.push(...playlist.tracks);
    });
    return allTracks;
}

// Visualizer functionality
function setupVisualizer() {
    const canvas = elements.visualizerCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (AppState.isPlaying) {
            drawVisualizer(ctx, canvas.width, canvas.height);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function drawVisualizer(ctx, width, height) {
    const hue1 = parseInt(elements.hue1Slider.value);
    const hue2 = parseInt(elements.hue2Slider.value);
    
    switch (AppState.visualizerMode) {
        case 'bars':
            drawBars(ctx, width, height, hue1, hue2);
            break;
        case 'circular':
            drawCircular(ctx, width, height, hue1, hue2);
            break;
        case 'wave':
            drawWave(ctx, width, height, hue1, hue2);
            break;
    }
}

function drawBars(ctx, width, height, hue1, hue2) {
    const barCount = 32;
    const barWidth = width / barCount;
    
    for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * height * 0.8 + height * 0.1;
        const x = i * barWidth;
        const y = height - barHeight;
        
        const hue = hue1 + (hue2 - hue1) * (i / barCount);
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        
        // Add glow effect
        ctx.shadowColor = `hsl(${hue}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;
    }
}

function drawCircular(ctx, width, height, hue1, hue2) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const barCount = 64;
    
    for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        const barLength = Math.random() * radius * 0.5 + radius * 0.3;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barLength);
        const y2 = centerY + Math.sin(angle) * (radius + barLength);
        
        const hue = hue1 + (hue2 - hue1) * (i / barCount);
        ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawWave(ctx, width, height, hue1, hue2) {
    const points = 100;
    const amplitude = height * 0.3;
    const frequency = 0.02;
    const time = Date.now() * 0.001;
    
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
        const x = (i / points) * width;
        const y = height / 2 + Math.sin(i * frequency + time) * amplitude * (Math.random() * 0.5 + 0.5);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 70%, 60%)`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Library content loading
function loadLibraryContent() {
    loadRecentTracks();
    loadPlaylists();
    loadFeaturedArtists();
}

function loadRecentTracks() {
    const container = elements.recentTracks;
    container.innerHTML = '';
    
    musicData.recent_tracks.forEach(track => {
        const trackCard = createTrackCard(track);
        container.appendChild(trackCard);
    });
}

function loadPlaylists() {
    const container = elements.playlists;
    container.innerHTML = '';
    
    musicData.playlists.forEach(playlist => {
        const playlistCard = createPlaylistCard(playlist);
        container.appendChild(playlistCard);
    });
}

function loadFeaturedArtists() {
    const container = elements.featuredArtists;
    container.innerHTML = '';
    
    musicData.featured_artists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        container.appendChild(artistCard);
    });
}

function createTrackCard(track) {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `
        <img src="${track.cover}" alt="${track.title}">
        <h4>${track.title}</h4>
        <p>${track.artist}</p>
        <p>${track.duration}</p>
    `;
    
    card.addEventListener('click', () => {
        AppState.currentTrack = track;
        updateCurrentTrackDisplay();
        resetProgress();
    });
    
    return card;
}

function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.innerHTML = `
        <img src="${playlist.cover}" alt="${playlist.name}">
        <h4>${playlist.name}</h4>
        <p>${playlist.tracks.length} tracks</p>
    `;
    
    card.addEventListener('click', () => {
        // Could implement playlist view here
        console.log('Playlist clicked:', playlist.name);
    });
    
    return card;
}

function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.innerHTML = `
        <img src="${artist.image}" alt="${artist.name}">
        <h4>${artist.name}</h4>
        <p>${artist.genre}</p>
    `;
    
    card.addEventListener('click', () => {
        // Could implement artist view here
        console.log('Artist clicked:', artist.name);
    });
    
    return card;
}

// Search functionality
function handleSearch() {
    const query = elements.searchInput.value.toLowerCase();
    const filter = AppState.searchFilter;
    
    if (query.length < 2) {
        elements.searchResults.innerHTML = '';
        return;
    }
    
    const results = performSearch(query, filter);
    displaySearchResults(results);
}

function performSearch(query, filter) {
    const results = [];
    const allTracks = getAllTracks();
    
    if (filter === 'all' || filter === 'tracks') {
        allTracks.forEach(track => {
            if (track.title.toLowerCase().includes(query) ||
                track.artist.toLowerCase().includes(query) ||
                track.album.toLowerCase().includes(query)) {
                results.push({type: 'track', data: track});
            }
        });
    }
    
    if (filter === 'all' || filter === 'artists') {
        musicData.featured_artists.forEach(artist => {
            if (artist.name.toLowerCase().includes(query)) {
                results.push({type: 'artist', data: artist});
            }
        });
    }
    
    if (filter === 'all' || filter === 'albums') {
        musicData.playlists.forEach(playlist => {
            if (playlist.name.toLowerCase().includes(query)) {
                results.push({type: 'playlist', data: playlist});
            }
        });
    }
    
    return results;
}

function displaySearchResults(results) {
    const container = elements.searchResults;
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }
    
    results.forEach(result => {
        let resultElement;
        
        switch (result.type) {
            case 'track':
                resultElement = createTrackCard(result.data);
                break;
            case 'artist':
                resultElement = createArtistCard(result.data);
                break;
            case 'playlist':
                resultElement = createPlaylistCard(result.data);
                break;
        }
        
        if (resultElement) {
            container.appendChild(resultElement);
        }
    });
}

// Theme controls
function setupThemeControls() {
    // Initialize with random values
    const rand1 = parseInt(elements.hue1Slider.value);
    const rand2 = parseInt(elements.hue2Slider.value);
    updateThemeColors(rand1, rand2);
}

function updateTheme(event) {
    const hue1 = parseInt(elements.hue1Slider.value);
    const hue2 = parseInt(elements.hue2Slider.value);
    updateThemeColors(hue1, hue2);
}

function updateThemeColors(hue1, hue2) {
    requestAnimationFrame(() => {
        document.body.style.setProperty('--hue1', hue1);
        document.body.style.setProperty('--hue2', hue2);
    });
}

// Equalizer functionality
function setupEqualizer() {
    // Initialize with flat EQ
    elements.eqSliders.forEach(slider => {
        slider.value = 0;
    });
}

function updateEqualizer(event) {
    const freq = event.target.parentElement.dataset.freq;
    const value = event.target.value;
    console.log(`EQ ${freq}: ${value}dB`);
}

function applyEQPreset(event) {
    const preset = event.target.value;
    const presets = {
        flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        rock: [3, 2, -1, -2, 1, 2, 4, 3, 2, 1],
        pop: [1, 2, 3, 2, 0, -1, -2, -1, 1, 2],
        electronic: [4, 3, 1, 0, -1, 2, 3, 4, 3, 2],
        classical: [2, 1, 0, 0, 0, 0, -1, -2, -2, -3],
        jazz: [2, 1, 0, 1, 2, 1, 0, -1, 1, 2]
    };
    
    const values = presets[preset] || presets.flat;
    elements.eqSliders.forEach((slider, index) => {
        slider.value = values[index] || 0;
    });
}

// Context Menu (from original code)
function setupContextMenu() {
    const contextMenu = elements.contextMenu;
    const menuItems = elements.menuItems;
    
    // Right-click to show context menu
    document.addEventListener("contextmenu", (event) => {
        const menuBox = contextMenu.getBoundingClientRect();
        const bodyBox = { width: window.innerWidth, height: window.innerHeight };
        const target = { x: event.clientX, y: event.clientY };
        const padding = { x: 30, y: 20 };
        
        const hitX = target.x + menuBox.width >= bodyBox.width - padding.x;
        const hitY = target.y + menuBox.height >= bodyBox.height - padding.y;
        
        if (hitX) {
            target.x = bodyBox.width - menuBox.width - padding.x;
        }
        
        if (hitY) {
            target.y = bodyBox.height - menuBox.height - padding.y;
        }
        
        const targetElement = event.target;
        const isMenu = contextMenu.contains(targetElement);
        event.preventDefault();
        
        if (!isMenu) {
            contextMenu.style.left = target.x + 'px';
            contextMenu.style.top = target.y + 'px';
            contextMenu.classList.remove('menu-hidden');
            contextMenu.classList.add('menu-open');
            
            menuItems.forEach(item => {
                item.classList.remove('selected');
            });
        }
    });
    
    // Click outside to hide context menu
    document.addEventListener('pointerdown', (event) => {
        const targetElement = event.target;
        const isMenu = contextMenu.contains(targetElement);
        const isSlider = targetElement.matches('input[type="range"]');
        
        if (!isMenu && !isSlider) {
            contextMenu.classList.remove('menu-open');
            contextMenu.classList.add('menu-hidden');
        } else if (isMenu) {
            menuItems.forEach(item => {
                item.classList.remove('selected');
            });
            
            if (targetElement.classList.contains('menu-item')) {
                targetElement.classList.add('selected');
                
                // Handle menu item actions
                const action = targetElement.dataset.action;
                handleMenuAction(action);
            }
        }
    });
}

function handleMenuAction(action) {
    switch (action) {
        case 'play':
            togglePlay();
            break;
        case 'add-playlist':
            console.log('Add to playlist');
            break;
        case 'share':
            console.log('Share track');
            break;
        case 'settings':
            console.log('Open settings');
            break;
        case 'about':
            console.log('Show about');
            break;
    }
}