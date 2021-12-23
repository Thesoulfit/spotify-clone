const renderTopResult = (artist, targetDiv) => {
  const html = `<section class="top-result">
    <h3>
        Top result
    </h3>
    <div class="details">
        <img src="${artist.images[0].url}" alt="${artist.name}"
        width="32px"
        height="32px"
        >
        <a class="title" href="${artist.external_urls.spotify}">${artist.name}</a>
    </div>
</section>`;
  targetDiv.innerHTML = html;
};

const renderTracks = (tracks, targetDiv) => {
  const songsHTML = tracks
    .map((song) => {
      return `<a href="${song.external_urls.spotify}" data-id="${song.id}" class="song-item">
        <img src="${song.album.images[0].url}" alt=""
        width="40px"
        height="40px"
        >
        <div class="song-details">
            <p class="artist">${song.artists[0].name}</p>
        </div>
    </a>`;
    })
    .join(" ");
  targetDiv.innerHTML += `
    <section class ="songs">
    <h3>Songs</h3>
    <div class="song-list">${songsHTML}</div>
    </section>`;
};

const renderArtists = (artists, targetDiv) => {
  const artistsHTML = artists.items
    .map((artist) => {
      return `
          <a class="artist-item" data-id="${artist.id}"href="${artist.external_urls.spotify}">
            <img
              src="${artist.images[0]?.url}"
              width="128px"
              height="128px"
            />
            <div class="artist-details">
              <p class="name">${artist.name}</p>
              <p class="category">Artist </p>
            </div>
          </a>`;
    })
    .join(" ");

  targetDiv.innerHTML += `
        <section class="artists">
          <h3>Artists</h3>
           <div class="artist-list">${artistsHTML}</div>
        </section>`;
};

const renderResults = (result, targetDiv) => {
  renderTopResult(result.artists.items[0], targetDiv);
  renderTracks(result.tracks.items.splice(0, 5), targetDiv);
  renderArtists(result.artists, targetDiv);
};

const search = async () => {
  const searchValue = document.querySelector("#search").value;

  try {
    return spotifyApi
      .generateSpotifyToken(function (token) {
        return token.access_token;
      })
      .then((token) => {
        return spotifyApi
          .search(searchValue, token.access_token)
          .then((result) => {
            console.log("result>>>", result);
            const searchHome = document.querySelector("#searchHome");
            const resultsDIv = document.querySelector(".results");
            if (Object.keys(result).length > 0) {
              searchHome.innerHTML = "";
              renderResults(result, resultsDIv);
            }
          });
      });

    // const results = await spotifyApi.search(newToken, searchValue);
    // console.log(results);

    // console.log(newToken);
  } catch (e) {
    console.log(e);
  }
};
