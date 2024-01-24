const clientId = '5c739d587015458794be21922248706e';
const redirectUri = "http://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 

        //checks if the accessToken is already set
      let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expirationTimeMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expirationTimeMatch[1]);
            
            window.setTimeout(() =>  accessToken= '', expiresIn*1000);
            window.history.pushState('AccessToken', null, '/');

            return accessToken;

        } else {

            const accessUrl = 'https://accounts.spotify.com/authorize';
                url += '?response_type=token';
                url += '&client_id=' + encodeURIComponent(clientId);
                url += '&scope=' + encodeURIComponent(scope);
                url += '&redirect_uri=' + encodeURIComponent(redirectUri);
                url += '&state=' + encodeURIComponent(state);
                window.location = accessUrl;
        }

    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();

        try{
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {    
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });
            if(!response.ok) {
                throw new Error('Something whent wrong')
            };
            const jsonResponse = response.json();
            if(!jsonResponse.tracks) {
                return [];
            }
            const mappedJsonResponse = jsonResponse.tracks.map(track => ({
        
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri

            }));

            return mappedJsonResponse;
        }catch(error){
            console.log(error)
        }
    },

    savePlaylist(playlistName, trackUris){
        if(!playlistName || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();  
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
        })
        }).then(response => response.json()
        ).then(jsonResponse => {
            let playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uris: trackUris })
            })
        })

    }
};

export default Spotify;