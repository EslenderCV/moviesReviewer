export interface movies{
    id: {
        timestamp: string,
        date: string
    },
    imdbId: string,
    title: string,
    releaseDate: string,
    poster: string,
    genres: string[],
    trailerLink: string,
    backdrops: string[],
    reviewIds: {
        id: {
            timestamp: string,
            date: string
        }, 
        body: string
    }[]
}

export interface moviesProps{
    moviesInfo: movies[] | null | void
}