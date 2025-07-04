// Musicster - Advanced Music Streaming Application
class Musicster {
    constructor() {
        this.currentView = 'home';
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.totalTime = 200; // 3:20 in seconds
        this.volume = 0.7;
        this.queue = [];
        this.shuffle = false;
        this.repeat = 'none'; // none, one, all
        this.eqBands = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.visualizerMode = 'spectrum';
        this.searchQuery = '';
        this.searchFilter = 'all';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMusicData();
        this.setupEqualizer();
        this.setupVisualizer();
        this.startVisualizerAnimation();
        this.updatePlayerDisplay();
        this.showView('home');
    }

    // Music Data
    getMusicData() {
        return {
            featured_songs: [
                {
                    id: 1,
                    title: "Anti-Hero",
                    artist: "Taylor Swift",
                    album: "Midnights",
                    duration: "3:20",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                    trending: true
                },
                {
                    id: 2,
                    title: "Shape of You",
                    artist: "Ed Sheeran",
                    album: "÷ (Divide)",
                    duration: "3:53",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
                    trending: true
                },
                {
                    id: 3,
                    title: "Flowers",
                    artist: "Miley Cyrus",
                    album: "Endless Summer Vacation",
                    duration: "3:21",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
                    trending: true
                },
                {
                    id: 4,
                    title: "Blinding Lights",
                    artist: "The Weeknd",
                    album: "After Hours",
                    duration: "3:20",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
                    trending: false
                },
                {
                    id: 5,
                    title: "Bad Guy",
                    artist: "Billie Eilish",
                    album: "When We All Fall Asleep, Where Do We Go?",
                    duration: "3:14",
                    genre: "Alternative",
                    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                    trending: false
                },
                {
                    id: 6,
                    title: "Levitating",
                    artist: "Dua Lipa",
                    album: "Future Nostalgia",
                    duration: "3:23",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
                    trending: false
                },
                {
                    id: 7,
                    title: "Watermelon Sugar",
                    artist: "Harry Styles",
                    album: "Fine Line",
                    duration: "2:54",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
                    trending: false
                },
                {
                    id: 8,
                    title: "Don't Start Now",
                    artist: "Dua Lipa",
                    album: "Future Nostalgia",
                    duration: "3:03",
                    genre: "Pop",
                    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
                    trending: false
                }
            ],
            featured_artists: [
                {
                    id: 1,
                    name: "Taylor Swift",
                    genre: "Pop",
                    followers: "95M",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
                },
                {
                    id: 2,
                    name: "Ed Sheeran",
                    genre: "Pop",
                    followers: "85M",
                    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop"
                },
                {
                    id: 3,
                    name: "The Weeknd",
                    genre: "R&B",
                    followers: "78M",
                    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&h=150&fit=crop"
                },
                {
                    id: 4,
                    name: "Billie Eilish",
                    genre: "Alternative",
                    followers: "72M",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
                },
                {
                    id: 5,
                    name: "Dua Lipa",
                    genre: "Pop",
                    followers: "68M",
                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop"
                },
                {
                    id: 6,
                    name: "Harry Styles",
                    genre: "Pop",
                    followers: "65M",
                    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop"
                }
            ],
            playlists: [
                {
                    id: 1,
                    name: "Today's Top Hits",
                    description: "The biggest songs right now",
                    tracks: 50,
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
                },
                {
                    id: 2,
                    name: "Chill Vibes",
                    description: "Relax and unwind with these chill tracks",
                    tracks: 35,
                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
                },
                {
                    id: 3,
                    name: "Workout Beats",
                    description: "High-energy music for your workout",
                    tracks: 42,
                    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop"
                },
                {
                    id: 4,
                    name: "Pop Hits 2024",
                    description: "The best pop songs of this year",
                    tracks: 38,
                    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop"
                },
                {
                    id: 5,
                    name: "Late Night Vibes",
                    description: "Perfect for those midnight moments",
                    tracks: 28,
                    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
                },
                {
                    id: 6,
                    name: "Road Trip Mix",
                    description: "Songs for your next adventure",
                    tracks: 45,
                    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop"
                }
            ],
            trending_charts: [
                {position: 1, title: "Anti-Hero", artist: "Taylor Swift", change: "↑"},
                {position: 2, title: "Flowers", artist: "Miley Cyrus", change: "↑"},
                {position: 3, title: "Shape of You", artist: "Ed Sheeran", change: "→"},
                {position: 4, title: "Blinding Lights", artist: "The Weeknd", change: "↓"},
                {position: 5, title: "Bad Guy", artist: "Billie Eilish", change: "↑"},
                {position: 6, title: "Levitating", artist: "Dua Lipa", change: "↑"},
                {position: 7, title: "Watermelon Sugar", artist: "Harry Styles", change: "→"},
                {position: 8, title: "Don't Start Now", artist: "Dua Lipa", change: "↓"}
            ],
            eq_presets: {
                flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                rock: [3, 2, -1, -2, -1, 2, 4, 5, 5, 4],
                pop: [1, 2, 3, 2, 0, -1, -1, 1, 2, 3],
                jazz: [2, 1, 0, 1, 2, 2, 1, 0, 1, 2],
                electronic: [4, 3, 1, 0, -2, 0, 1, 3, 4, 5],
                classical: [2, 1, 0, 0, 0, 0, -1, -1, 0, 1],
                'hip-hop': [4, 3, 1, 2, -1, -1, 1, 2, 3, 4],
                acoustic: [3, 2, 1, 0, 1, 2, 3, 2, 1, 0],
                'bass-boost': [6, 4, 2, 1, 0, 0, 0, 0, 0, 0]
            }
        };
    }

    loadMusicData() {
        this.musicData = this.getMusicData();
        this.currentTrack = this.musicData.featured_songs[0];
        this.queue = [...this.musicData.featured_songs];
        this.populateContent();
    }

    populateContent() {
        this.populateTrending();
        this.populateArtists();
        this.populatePlaylists();
        this.populateCharts();
        this.populateLibrary();
    }

    populateTrending() {
        const grid = document.getElementById('trending-grid');
        if (!grid) return;

        grid.innerHTML = this.musicData.featured_songs
            .filter(song => song.trending)
            .map(song => `
                <div class="song-card" data-song-id="${song.id}">
                    <img src="${song.artwork}" alt="${song.title}">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                    <div class="song-duration">${song.duration}</div>
                </div>
            `).join('');
    }

    populateArtists() {
        const grid = document.getElementById('artists-grid');
        if (!grid) return;

        grid.innerHTML = this.musicData.featured_artists.map(artist => `
            <div class="artist-card" data-artist-id="${artist.id}">
                <img src="${artist.image}" alt="${artist.name}">
                <div class="artist-name">${artist.name}</div>
                <div class="artist-genre">${artist.genre} • ${artist.followers} followers</div>
            </div>
        `).join('');
    }

    populatePlaylists() {
        const grid = document.getElementById('playlists-grid');
        if (!grid) return;

        grid.innerHTML = this.musicData.playlists.map(playlist => `
            <div class="playlist-card" data-playlist-id="${playlist.id}">
                <img src="${playlist.image}" alt="${playlist.name}">
                <div class="playlist-name">${playlist.name}</div>
                <div class="playlist-description">${playlist.description}</div>
                <div class="playlist-tracks">${playlist.tracks} tracks</div>
            </div>
        `).join('');
    }

    populateCharts() {
        const container = document.getElementById('charts-container');
        if (!container) return;

        container.innerHTML = this.musicData.trending_charts.map(item => `
            <div class="chart-item">
                <div class="chart-position">${item.position}</div>
                <div class="chart-info">
                    <div class="chart-title">${item.title}</div>
                    <div class="chart-artist">${item.artist}</div>
                </div>
                <div class="chart-change">${item.change}</div>
            </div>
        `).join('');
    }

    populateLibrary() {
        const grid = document.getElementById('library-grid');
        if (!grid) return;

        grid.innerHTML = this.musicData.featured_songs.map(song => `
            <div class="song-card" data-song-id="${song.id}">
                <img src="${song.artwork}" alt="${song.title}">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-duration">${song.duration}</div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn, .sidebar-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.dataset.view;
                if (view) {
                    this.showView(view);
                }
            });
        });

        // Search
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.performSearch();
            });
        }

        // Search filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.searchFilter = btn.dataset.filter;
                this.performSearch();
            });
        });

        // Player controls
        document.getElementById('play-btn')?.addEventListener('click', () => this.togglePlay());
        document.getElementById('prev-btn')?.addEventListener('click', () => this.previousTrack());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextTrack());
        document.getElementById('shuffle-btn')?.addEventListener('click', () => this.toggleShuffle());
        document.getElementById('repeat-btn')?.addEventListener('click', () => this.toggleRepeat());

        // Volume control
        document.getElementById('volume-input')?.addEventListener('input', (e) => {
            this.volume = e.target.value / 100;
            this.updateVolumeDisplay();
        });

        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const progress = clickX / rect.width;
                this.currentTime = progress * this.totalTime;
                this.updateProgressBar();
            });
        }

        // Song cards
        document.addEventListener('click', (e) => {
            const songCard = e.target.closest('.song-card');
            if (songCard) {
                const songId = parseInt(songCard.dataset.songId);
                this.playSong(songId);
            }
        });

        // Modals
        document.getElementById('lyrics-btn')?.addEventListener('click', () => this.showModal('lyrics-modal'));
        document.getElementById('queue-btn')?.addEventListener('click', () => this.showModal('queue-modal'));
        
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.hideModals());
        });

        // Modal backdrop
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModals();
                }
            });
        });

        // Visualizer controls
        document.querySelectorAll('.viz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.viz-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.visualizerMode = btn.dataset.mode;
            });
        });

        // EQ preset selection
        document.querySelector('.eq-preset-select')?.addEventListener('change', (e) => {
            this.loadEQPreset(e.target.value);
        });

        // EQ reset
        document.getElementById('reset-eq')?.addEventListener('click', () => {
            this.resetEqualizer();
        });

        // Fullscreen
        document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    showView(viewName) {
        // Update navigation states
        document.querySelectorAll('.nav-btn, .sidebar-link').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll(`[data-view="${viewName}"]`).forEach(btn => {
            btn.classList.add('active');
        });

        // Show/hide views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        this.currentView = viewName;

        // Special handling for certain views
        if (viewName === 'equalizer') {
            this.setupEqualizer();
        } else if (viewName === 'visualizer') {
            this.setupVisualizer();
        }
    }

    playSong(songId) {
        const song = this.musicData.featured_songs.find(s => s.id === songId);
        if (song) {
            this.currentTrack = song;
            this.isPlaying = true;
            this.currentTime = 0;
            this.updatePlayerDisplay();
            this.updatePlayButton();
            this.updateQueue();
        }
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        
        if (this.isPlaying) {
            this.startPlaybackTimer();
        } else {
            this.stopPlaybackTimer();
        }
    }

    updatePlayButton() {
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
    }

    startPlaybackTimer() {
        if (this.playbackTimer) {
            clearInterval(this.playbackTimer);
        }
        
        this.playbackTimer = setInterval(() => {
            if (this.isPlaying) {
                this.currentTime += 1;
                if (this.currentTime >= this.totalTime) {
                    this.nextTrack();
                } else {
                    this.updateProgressBar();
                }
            }
        }, 1000);
    }

    stopPlaybackTimer() {
        if (this.playbackTimer) {
            clearInterval(this.playbackTimer);
            this.playbackTimer = null;
        }
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const progressHandle = document.getElementById('progress-handle');
        const currentTimeDisplay = document.getElementById('current-time');
        
        if (progressFill && progressHandle) {
            const progress = (this.currentTime / this.totalTime) * 100;
            progressFill.style.width = `${progress}%`;
            progressHandle.style.left = `${progress}%`;
        }
        
        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = this.formatTime(this.currentTime);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updatePlayerDisplay() {
        if (!this.currentTrack) return;

        const trackArt = document.getElementById('current-track-art');
        const trackTitle = document.getElementById('current-track-title');
        const trackArtist = document.getElementById('current-track-artist');
        const totalTime = document.getElementById('total-time');

        if (trackArt) {
            trackArt.innerHTML = `<img src="${this.currentTrack.artwork}" alt="${this.currentTrack.title}">`;
        }
        
        if (trackTitle) {
            trackTitle.textContent = this.currentTrack.title;
        }
        
        if (trackArtist) {
            trackArtist.textContent = this.currentTrack.artist;
        }
        
        if (totalTime) {
            totalTime.textContent = this.currentTrack.duration;
        }

        // Update total time for progress calculation
        const [mins, secs] = this.currentTrack.duration.split(':');
        this.totalTime = parseInt(mins) * 60 + parseInt(secs);
    }

    previousTrack() {
        const currentIndex = this.queue.findIndex(song => song.id === this.currentTrack.id);
        let prevIndex = currentIndex - 1;
        
        if (prevIndex < 0) {
            prevIndex = this.queue.length - 1;
        }
        
        this.playSong(this.queue[prevIndex].id);
    }

    nextTrack() {
        const currentIndex = this.queue.findIndex(song => song.id === this.currentTrack.id);
        let nextIndex = currentIndex + 1;
        
        if (this.shuffle) {
            nextIndex = Math.floor(Math.random() * this.queue.length);
        } else if (nextIndex >= this.queue.length) {
            if (this.repeat === 'all') {
                nextIndex = 0;
            } else if (this.repeat === 'one') {
                nextIndex = currentIndex;
            } else {
                this.isPlaying = false;
                this.updatePlayButton();
                return;
            }
        }
        
        this.playSong(this.queue[nextIndex].id);
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        const shuffleBtn = document.getElementById('shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.style.color = this.shuffle ? '#00d9ff' : '';
        }
    }

    toggleRepeat() {
        const modes = ['none', 'all', 'one'];
        const currentIndex = modes.indexOf(this.repeat);
        this.repeat = modes[(currentIndex + 1) % modes.length];
        
        const repeatBtn = document.getElementById('repeat-btn');
        if (repeatBtn) {
            switch (this.repeat) {
                case 'none':
                    repeatBtn.style.color = '';
                    repeatBtn.textContent = '🔁';
                    break;
                case 'all':
                    repeatBtn.style.color = '#00d9ff';
                    repeatBtn.textContent = '🔁';
                    break;
                case 'one':
                    repeatBtn.style.color = '#00d9ff';
                    repeatBtn.textContent = '🔂';
                    break;
            }
        }
    }

    updateVolumeDisplay() {
        const volumeBtn = document.getElementById('volume-btn');
        if (volumeBtn) {
            if (this.volume === 0) {
                volumeBtn.textContent = '🔇';
            } else if (this.volume < 0.5) {
                volumeBtn.textContent = '🔉';
            } else {
                volumeBtn.textContent = '🔊';
            }
        }
    }

    updateQueue() {
        const queueList = document.getElementById('queue-list');
        if (!queueList) return;

        const currentIndex = this.queue.findIndex(song => song.id === this.currentTrack.id);
        const upcomingSongs = this.queue.slice(currentIndex + 1);

        queueList.innerHTML = upcomingSongs.map(song => `
            <div class="queue-item" data-song-id="${song.id}">
                <div class="queue-track-art">
                    <img src="${song.artwork}" alt="${song.title}">
                </div>
                <div class="queue-track-info">
                    <div class="queue-track-title">${song.title}</div>
                    <div class="queue-track-artist">${song.artist}</div>
                </div>
                <div class="queue-track-duration">${song.duration}</div>
            </div>
        `).join('');
    }

    performSearch() {
        const searchResults = document.getElementById('search-results');
        if (!searchResults || !this.searchQuery) {
            if (searchResults) {
                searchResults.innerHTML = `
                    <div class="search-placeholder">
                        <div class="search-icon">🔍</div>
                        <h3>Search for music</h3>
                        <p>Find your favorite songs, artists, and albums</p>
                    </div>
                `;
            }
            return;
        }

        const query = this.searchQuery.toLowerCase();
        let results = [];

        // Search songs
        if (this.searchFilter === 'all' || this.searchFilter === 'songs') {
            const songs = this.musicData.featured_songs.filter(song => 
                song.title.toLowerCase().includes(query) || 
                song.artist.toLowerCase().includes(query) ||
                song.album.toLowerCase().includes(query)
            );
            results.push(...songs.map(song => ({...song, type: 'song'})));
        }

        // Search artists
        if (this.searchFilter === 'all' || this.searchFilter === 'artists') {
            const artists = this.musicData.featured_artists.filter(artist => 
                artist.name.toLowerCase().includes(query) ||
                artist.genre.toLowerCase().includes(query)
            );
            results.push(...artists.map(artist => ({...artist, type: 'artist'})));
        }

        // Search playlists
        if (this.searchFilter === 'all' || this.searchFilter === 'playlists') {
            const playlists = this.musicData.playlists.filter(playlist => 
                playlist.name.toLowerCase().includes(query) ||
                playlist.description.toLowerCase().includes(query)
            );
            results.push(...playlists.map(playlist => ({...playlist, type: 'playlist'})));
        }

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-placeholder">
                    <div class="search-icon">😔</div>
                    <h3>No results found</h3>
                    <p>Try searching for something else</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = `
            <div class="search-results-grid">
                ${results.map(result => {
                    switch (result.type) {
                        case 'song':
                            return `
                                <div class="song-card" data-song-id="${result.id}">
                                    <img src="${result.artwork}" alt="${result.title}">
                                    <div class="song-title">${result.title}</div>
                                    <div class="song-artist">${result.artist}</div>
                                    <div class="song-duration">${result.duration}</div>
                                </div>
                            `;
                        case 'artist':
                            return `
                                <div class="artist-card" data-artist-id="${result.id}">
                                    <img src="${result.image}" alt="${result.name}">
                                    <div class="artist-name">${result.name}</div>
                                    <div class="artist-genre">${result.genre} • ${result.followers} followers</div>
                                </div>
                            `;
                        case 'playlist':
                            return `
                                <div class="playlist-card" data-playlist-id="${result.id}">
                                    <img src="${result.image}" alt="${result.name}">
                                    <div class="playlist-name">${result.name}</div>
                                    <div class="playlist-description">${result.description}</div>
                                    <div class="playlist-tracks">${result.tracks} tracks</div>
                                </div>
                            `;
                        default:
                            return '';
                    }
                }).join('')}
            </div>
        `;
    }

    setupEqualizer() {
        const eqBands = document.getElementById('eq-bands');
        if (!eqBands) return;

        const frequencies = ['31Hz', '62Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz'];
        
        eqBands.innerHTML = frequencies.map((freq, index) => `
            <div class="eq-band">
                <div class="eq-value" id="eq-value-${index}">0dB</div>
                <input type="range" class="eq-slider" id="eq-slider-${index}" 
                       min="-12" max="12" value="0" step="0.5" orient="vertical">
                <div class="eq-label">${freq}</div>
            </div>
        `).join('');

        // Add event listeners to sliders
        frequencies.forEach((freq, index) => {
            const slider = document.getElementById(`eq-slider-${index}`);
            const valueDisplay = document.getElementById(`eq-value-${index}`);
            
            if (slider && valueDisplay) {
                slider.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.eqBands[index] = value;
                    valueDisplay.textContent = `${value > 0 ? '+' : ''}${value}dB`;
                });
            }
        });
    }

    loadEQPreset(presetName) {
        const preset = this.musicData.eq_presets[presetName];
        if (!preset) return;

        this.eqBands = [...preset];
        
        preset.forEach((value, index) => {
            const slider = document.getElementById(`eq-slider-${index}`);
            const valueDisplay = document.getElementById(`eq-value-${index}`);
            
            if (slider && valueDisplay) {
                slider.value = value;
                valueDisplay.textContent = `${value > 0 ? '+' : ''}${value}dB`;
            }
        });
    }

    resetEqualizer() {
        this.loadEQPreset('flat');
        const presetSelect = document.querySelector('.eq-preset-select');
        if (presetSelect) {
            presetSelect.value = 'flat';
        }
    }

    setupVisualizer() {
        const canvas = document.getElementById('visualizer-canvas');
        if (!canvas) return;

        this.visualizerCanvas = canvas;
        this.visualizerCtx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize visualizer data
        this.visualizerData = Array(64).fill(0);
    }

    startVisualizerAnimation() {
        const animate = () => {
            this.updateVisualizerData();
            this.drawVisualizer();
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateVisualizerData() {
        // Simulate audio data based on whether music is playing
        const intensity = this.isPlaying ? 1 : 0.1;
        
        for (let i = 0; i < this.visualizerData.length; i++) {
            const target = Math.random() * intensity * 255;
            this.visualizerData[i] += (target - this.visualizerData[i]) * 0.1;
        }
    }

    drawVisualizer() {
        if (!this.visualizerCanvas || !this.visualizerCtx) return;

        const canvas = this.visualizerCanvas;
        const ctx = this.visualizerCtx;
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#00d9ff');
        gradient.addColorStop(0.5, '#ff006e');
        gradient.addColorStop(1, '#8338ec');

        ctx.fillStyle = gradient;
        ctx.strokeStyle = gradient;

        switch (this.visualizerMode) {
            case 'spectrum':
                this.drawSpectrum(ctx, width, height);
                break;
            case 'waveform':
                this.drawWaveform(ctx, width, height);
                break;
            case 'circular':
                this.drawCircular(ctx, width, height);
                break;
        }
    }

    drawSpectrum(ctx, width, height) {
        const barWidth = width / this.visualizerData.length;
        
        for (let i = 0; i < this.visualizerData.length; i++) {
            const barHeight = (this.visualizerData[i] / 255) * height * 0.8;
            const x = i * barWidth;
            const y = height - barHeight;
            
            ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
    }

    drawWaveform(ctx, width, height) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        
        const centerY = height / 2;
        const step = width / this.visualizerData.length;
        
        for (let i = 0; i < this.visualizerData.length; i++) {
            const x = i * step;
            const y = centerY + ((this.visualizerData[i] / 255) - 0.5) * height * 0.8;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }

    drawCircular(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 4;
        
        const angleStep = (Math.PI * 2) / this.visualizerData.length;
        
        for (let i = 0; i < this.visualizerData.length; i++) {
            const angle = i * angleStep;
            const barHeight = (this.visualizerData[i] / 255) * 100;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
            // Update modal content based on current track
            if (modalId === 'queue-modal') {
                this.updateQueue();
            }
        }
    }

    hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new Musicster();
});

// Add some fun animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards on hover
    const cards = document.querySelectorAll('.song-card, .artist-card, .playlist-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add glow effect to active elements
    const glowElements = document.querySelectorAll('.btn--primary, .play-btn, .control-btn');
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
        });
    });
});

// Voice commands simulation
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        // Simulate voice command
        const musicster = window.musicster;
        if (musicster) {
            musicster.togglePlay();
        }
    }
});

// Add window reference for global access
window.addEventListener('DOMContentLoaded', () => {
    window.musicster = new Musicster();
});
