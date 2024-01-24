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

    }
};

export default Spotify;