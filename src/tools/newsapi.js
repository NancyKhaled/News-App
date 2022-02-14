const request = require('request')

const newsapi = (callback) => {
    const newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=425978158efc4887837f6096bb68781e'
    request({
        url: newsUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('unable to connect location service', undefined)
        } else if (response.body.status == 'error') {
            callback(response.body.message, undefined)
        } else if (response.body.articles.length == 0) {
            callback('unable to find location .. try again', undefined)
        } else {
            callback(undefined, response.body.articles)
        }
    })
}

module.exports = newsapi

