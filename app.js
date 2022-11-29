const APIController = (function() {
    
    const clientId = '8ca75027bc4b4c4ebc66f558315aef3d';
    const clientSecret = 'f96c345009814c01bf71b8700ce22cc3';

    //Fetch data from spotify api; private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const spot = await result.json();
        return spot.access_token;
    }
    
    const _getGenres = async (token) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?country=CA&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const spot = await result.json();
        return spot.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const spot = await result.json();
        return spot.playlists.items;
    }

    const _getTracks = async (token, tracklist) => {

        const limit = 30;

        const result = await fetch(`${tracklist}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const spot = await result.json();
        return spot.items;
    }

    const _getTrack = async (token, trackdetail) => {

        const result = await fetch(`${trackdetail}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const spot = await result.json();
        return spot;
    }

   

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracklist) {
            return _getTracks(token, tracklist);
        },
        getTrack(token, trackdetail) {
            return _getTrack(token, trackdetail);
        }
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}"onclick="player()">${name} </a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class="songimg">
                <img src="${img}" alt=""width="100px" height="100px">        
            </div>
            <div class="songname"><span>
                <label for="Genre" style="font-size:20px; color:black" class="form-label col-sm-12">${title}</label>
                </span>
            </div>
            <div class="artistname"><span>
                <label for="artist" style="color:blue" class="form-label col-sm-12">${artist}</label>
            </span></div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },
        //method to reset fields
        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';

        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
            const spotpreview=document.getElementById("spotify").classList;
            spotpreview.remove("showme");
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
            
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;       
        // get the genre id associated with the selected genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });
     

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        // clear tracks
        UICtrl.resetTracks();
        //get the token
        const token = UICtrl.getStoredToken().token;        
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get track endpoint based on the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the list of tracks
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // create a track list item
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))
        
    });

    // create song selection click event listener
    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track endpoint
        const trackEndpoint = e.target.id;
        //get the track object
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });
    

    

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();

