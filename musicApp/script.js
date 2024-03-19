// let term = '';
// const updateTerm = () => {
//     term = document.getElementById('searchTerm').value;
//     // check term exist
//     if (!term || term === '') {
//         alert('Please enter a seach term');
//     } else {
//         const url = `https://itunes.apple.com/search?term=${term}`;
//         const songContainer = document.getElementById('songs');
//         while (songContainer.firstChild) {
//             songContainer.removeChild(songContainer.firstChild);
//         }
//         fetch(url)
//             .then((Response) => Response.json())
//             .then((data) => {
//                 // console.log(data.results);
//                 const artists = data.results;
//                 return artists.map(result => {
//                     // Now create Html Element 

//                     const article = document.createElement('article'),
//                         artists = document.createElement('p'),
//                         song = document.createElement('h4'),
//                         img = document.createElement('img'),
//                         audio = document.createElement('audio'),
//                         audioSource = document.createElement('source')

//                     // Now put content 

//                     artists.innerHTML = result.artistName;
//                     song.innerHTML = result.trackName;
//                     img.src = result.artworkUrl100;
//                     audioSource.src = result.previewUrl;
//                     audio.controls = true;

//                     article.appendChild(img);
//                     article.appendChild(artists);
//                     article.appendChild(song);
//                     article.appendChild(audio);
//                     audio.appendChild(audioSource);

//                     songContainer.appendChild(article);
//                 })
//             })
//             .catch(error => console.log('Request failed:', error))
//     }
// }

// const searchBtn = document.getElementById('searchTermBtn');
// searchBtn.addEventListener('click', updateTerm)

// document.addEventListener('play', event => {
//     const audio = document.getElementsByTagName('audio');
//     for (let i = 0; i < audio.length; i++) {
//         if (audio[i] != event.target) {
//             audio[i].pause();
//         }
//     }
// }, true)








let term = ''; // Initialize a variable to store the search term

// Function to update the search term and fetch songs
const updateTerm = () => {
    term = document.getElementById('searchTerm').value; // Get the value of the search term from the input field

    // Check if the search term is empty
    if (!term || term === '') {
        alert('Please enter a search term');
    } else {
        fetchSongs(term);
    }
}

// Function to fetch songs based on the search term
const fetchSongs = (term) => {
    const url = `https://itunes.apple.com/search?term=${term}&entity=song`; // Construct the API URL with the search term

    const songContainer = document.getElementById('songs'); // Get the container where songs will be displayed

    while (songContainer.firstChild) {
        songContainer.removeChild(songContainer.firstChild); // Clear the song container before fetching new songs
    }
    fetch(url) // Fetch data from the API
        .then((response) => response.json()) // it takes the raw data from the response and converts it into a JavaScript object, allowing us to easily access and manipulate the data in your code.
        .then((data) => { // this 'data' is the converted json data recieved from the server
            const songs = data.results; // it assumes that the API response contains a results property that holds an array of songs.
            if (songs.length === 0) {
                songContainer.textContent = 'No songs found';
                return;
            }

            // loop that iterates over each song in the songs array retrieved from the API response. For each song, the code inside the loop is executed.
            songs.forEach(song => {
                const article = document.createElement('article'); // Creates a new <article> element for each song.
                const artist = document.createElement('p');
                const songTitle = document.createElement('h4');
                const img = document.createElement('img');
                const audio = document.createElement('audio');
                const audioSource = document.createElement('source'); 

                artist.textContent = song.artistName;
                songTitle.textContent = song.trackName;
                img.src = song.artworkUrl100;
                audioSource.src = song.previewUrl;
                audio.controls = true; // enabling playback controls for the audio player.


                //The appendChild() method is a JavaScript method used to append a node as the last child of a specified parent node
                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(songTitle);
                article.appendChild(audio);
                audio.appendChild(audioSource);

                songContainer.appendChild(article);
            });
        })
        .catch(error => console.log('Request failed:', error));
}    


const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', updateTerm);

// Event listener to pause other audio when one audio is played
document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) { // if the current audio has not been triggered by the play event then pause the audio. This prevents multiple audio elements from playing simultaneously.
            audio[i].pause();
        }
    }
}, true);

    

// // Event listener for when the DOM content is loaded

document.addEventListener('DOMContentLoaded', function () {
    const artistContainers = document.querySelectorAll('.artist');

    // Iterate through each artist container
    artistContainers.forEach(artist => {
        artist.addEventListener('click', function () {
            const artistName = this.querySelector('h3').textContent; // Get artist name from the <h3> element inside the artist container
            document.getElementById('searchTerm').value = artistName; // Set search term to the clicked artist's name
            document.getElementById('searchTermBtn').click(); // Trigger click event on the search button
        });
    });

    
});
