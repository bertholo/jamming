let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 

        //checks if the accessToken is already set
        accessToken = window.location.href.match(/access_token=([^&]*)/);
        expirationTime = window.location.href.match(/expires_in=([^&]*)/);
    }
};

export default Spotify;