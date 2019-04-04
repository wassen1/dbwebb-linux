// Import the http server as base
var http = require("http");

/**
 * Class for Client.
 *
 */
class Client {
    /**
     * Constructor.
     *
     */
    constructor() {
        // this.gameBoard = new GomokuBoard();
    }

    /**
     * Set the url of the server to connect to.
     *
     * @param  String url to use to connect to the server.
     *
     */
    setServer(url) {
        this.server = url;
    }

    /**
     * Make a HTTP GET request, wrapped in a Promise.
     *
     * @param  String url to connect to.
     *
     * @return Promise
     *
     */
    httpGet(url) {
        if (process.env.NODE_ENV === 'development') {
            console.log('URL sent to server: ', this.server + url)
        }
        return new Promise((resolve, reject) => {
            http.get(this.server + url, (res) => {
                var data = "";

                res.on('data', (chunk) => {
                    data += chunk;
                }).on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }).on('error', (e) => {
                    reject("Got error: " + e.message);
                });
            });
        });
    }

    list(max) {
        if (max !== undefined && !isNaN(max)) {
            return this.httpGet(`/room/list?max=${max}`);
        } else {
            return this.httpGet(`/room/list`);
        }
    }

    /**
     * View the content of the room.
     *
     * @param  id Id number of room.
     *
     * @return Promise
     *
     */
    view(id) {
        return this.httpGet(`/room/view/id/${id}`);
    }

    /**
     * View the rooms of the house.
     *
     * @param  id Id number of house.
     *
     * @return Promise
     *
     */
    house(id, max) {
        if (max !== undefined && !isNaN(max)) {
            return this.httpGet(`/room/view/house/${id}?max=${max}`);
        } else {
            return this.httpGet(`/room/view/house/${id}`);
        }
    }

    /**
     * View search results.
     *
     * @param  searchStr The search string.
     *
     * @return Promise
     *
     */
    search(searchStr, max) {
        if (max !== undefined && !isNaN(max)) {
            console.log('MAX', max)
            return this.httpGet(`/room/search/${searchStr}?max=${max}`);
        } else {
            return this.httpGet(`/room/search/${searchStr}`);
        }
    }

    searchp(searchStr, max) {
        if (max !== undefined && !isNaN(max)) {
            return this.httpGet(`/room/searchp/${searchStr}?max=${max}`);
        } else {
            return this.httpGet(`/room/searchp/${searchStr}`);
        }
    }

}


module.exports = Client;
