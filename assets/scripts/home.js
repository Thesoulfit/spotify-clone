const newCard = (album, artist) => {
  return `
            <div class="col-md-2">
            <div class="card text-truncate">
                <img src="${album.img.url}" class="card-img-top" alt="${album.name}">
                <div class="card-body">
                    <a href= "${album.href}"><h5 class="card-title">${album.name}</h5></a>
                    <a href= "${artist.href}"><h6 class="card-subtitle mb-2 text-muted">${artist.name}</h6></a>

                </div>
            </div>
            </div>
    `;
};

const categoryCard = (catagory) => {
  return `
  <div class="col-md-2">
  <div class="card text-truncate">
      <img src="${catagory.img.url}" class="card-img-top" alt="${catagory.name}">
      <div class="card-body">
          <a href= "${catagory.href}"><h5 class="card-title">${catagory.name}</h5></a>

      </div>
  </div>
  </div>
`;
};

const playlistsCard = (playlist) => {
  return `
  <div class="col-md-2">
  <div class="card text-truncate">
      <img src="${playlist.img.url}" class="card-img-top" alt="${playlist.name}">
      <div class="card-body">
          <a href= "${playlist.href}"><h5 class="card-title">${playlist.name}</h5></a>

      </div>
  </div>
  </div>
`;
};

const fetchNewReleases = () => {
  return spotifyApi
    .generateSpotifyToken(function (token) {
      return token;
    })
    .then(function (token) {
      var actualToken = token.access_token;
      spotifyApi.browseNewReleases(actualToken).then((data) => {
        const albums = data?.albums?.items
          .map((item) => {
            const img = item.images.filter(
              (image) => image.height === 300 && image.width === 300
            )[0];
            // console.log("img", img);
            const album = {
              name: item.name,
              href: item.external_urls.spotify,
              img: img,
            };

            const artist = {
              name: item.artists[0].name,
              href: item.artists[0].external_urls.spotify,
            };

            return newCard(album, artist);
          })
          .join(" ");
        const targetDiv = document.querySelector(".browse");
        targetDiv.innerHTML += albums;
      });
    })

    .catch((e) => {
      `Not Found`;
      console.log(e);
    });
};

const fetchCatagories = () => {
  return spotifyApi
    .generateSpotifyToken(function (token) {
      return token;
    })
    .then(function (token) {
      var actualToken = token.access_token;
      spotifyApi.browseCatagories(actualToken).then((data) => {
        // console.log("data", data);
        const catagories = data?.categories?.items
          .map((item) => {
            // const img = item.icons[0].url;
            // console.log("img", img);
            const catagory = {
              name: item.name,
              href: item.href,
              img: item.icons[0],
            };

            return categoryCard(catagory);
          })
          .join(" ");
        const targetDiv = document.querySelector(".category-card");
        targetDiv.innerHTML += catagories;
      });
    })
    .catch((e) => {
      `Not Found`;
      console.log(e);
    });
};

const fetchFeaturedPlaylists = () => {
  return spotifyApi
    .generateSpotifyToken(function (token) {
      return token;
    })
    .then(function (token) {
      var actualToken = token.access_token;
      spotifyApi.browseFeaturedPlaylists(actualToken).then((data) => {
        console.log("data", data);
        const playlists = data?.playlists?.items
          .map((item) => {
            // const img = item.images[0].url;
            // console.log("img", img);
            const playlist = {
              name: item.name,
              href: item.external_urls.spotify,
              img: item.images[0],
            };

            return playlistsCard(playlist);
          })
          .join(" ");
        const targetDiv = document.querySelector(".playlists-card");
        targetDiv.innerHTML += playlists;
      });
    })
    .catch((e) => {
      `Not Found`;
      console.log(e);
    });
};

window.onload = () => {
  fetchNewReleases();
  fetchCatagories();
  fetchFeaturedPlaylists();
};
