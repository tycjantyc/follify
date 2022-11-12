import urllib from "urllib";
import log from "../logs";
import HTTP from "../HttpStatusCode"

function bearer(token: string) {
  return {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
}

export async function createPlaylist(userId: string, name: string, description: string, token: string) {
  log.info(`Creating playlist. user=${userId}, playlist name=${name}`);

  // token = token ? token : await getToken(userId);
  let result = await urllib.request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: bearer(token),
    data: {
      "name": name,
      "description": description,
      "public": false
    }
  });

  if (result.res.statusCode != HTTP.CREATED) {
    log.error(`Couldn't create playlist: ${result.res.statusCode}, ` +
      `user=${userId}, playlist name=${name}`)
    return;
  }

  var data = JSON.parse(result.data.toString());
  log.info(`${JSON.stringify(data)}`);
  return data.id;
}

export async function addTracksToPlaylist(playlist: string, tracks: string[], token: string) {
  let result = await urllib.request(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
    method: 'POST',
    headers: bearer(token),
    data: {
      'uris': tracks
    }
  });

  if (result.res.statusCode != HTTP.CREATED) {
    log.error(`Couldn't add to playlist: ${result.res.statusCode}: ${result.data.toString()} playlist=${playlist} tracks=${tracks}`);
    throw new Error("bruh");
  }
}