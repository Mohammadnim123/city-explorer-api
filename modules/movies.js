const axios = require('axios');
const moviesStorage = {};
function moviesHandler(req, res) {
    let { searchQuery } = req.query

    if (moviesStorage[searchQuery] !== undefined) {
        console.log("cached movies")
        res.send(moviesStorage[searchQuery])
    }
    else {
        console.log('not cached movies');
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
        axios.get(url)
            .then(result => {
                let newMovie = result.data.results.map(elem => {
                    return new Movies(elem)
                })

                moviesStorage[searchQuery] = newMovie

                res.send(newMovie)
            }).catch(err => {
                console.log(err);
                res.send(err)
            }

            )
    }
}

function Movies(obj) {
    this.title = obj.title,
        this.overview = obj.overview,
        this.average_votes = obj.vote_average,
        this.total_votes = obj.vote_average,
        this.image_url = obj.poster_path || `https://st3.depositphotos.com/1322515/35964/v/1600/depositphotos_359648638-stock-illustration-image-available-icon.jpg`,
        this.popularity = obj.popularity,
        this.released_on = obj.release_date
}

module.exports = moviesHandler