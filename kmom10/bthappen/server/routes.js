module.exports = (() => {
  
  // var rooms = [];
  
  let getFile = name => {
    return require(`../${name}.json`)
    // const FS = require("fs");
    // return JSON.parse(FS.readFileSync(`../${name}.json`));
  };

  /**
   * Wrapper function for sending a response
   *
   * @param  Object        resObj  The response
   * @param  Object/String content What should be written to the response
   * @param  Integer       code    HTTP status code
   * @param  String        type    Content-Type of the response
   */
  let sendResponse = (resObj, content, code = 200, type = "json") => {
    var contentType;

    switch (type) {
      case "plain":
        contentType = {
          "Content-Type": "text/plain"
        };
        break;

      case "html":
        contentType = {
          "Content-Type": "text/html"
        };
        break;

      case "zip":
        contentType = {
          "Content-Type": "application/octet-stream"
        };
        break;

      case "csv":
        contentType = {
          "Content-Type": "text/csv"
        };
        break;

      case "json":
      /* falls through */
      default:
        contentType = {
          "Content-Type": "application/json"
        };
        content = JSON.stringify(content);
        break;
    }

    resObj.writeHead(code, contentType);
    resObj.write(content);
    resObj.end();
    if (process.env.NODE_ENV === 'development') {
      console.log('RESOBJ: ', resObj)
      console.log('content: ', content)
      console.log('contentType: ', contentType)
      console.log('code: ', code)
    }
  };

  let getSalar = (req, res) => {
    let rooms = getFile("salar");
    let type = req.query.type;
    let query = req.query;
    sendResponse(res, rooms.salar.slice(0, query.max), 200, type);
  };

  let getRoot = (req, res) => {
    let type = req.query.type;
    let content = {
      "/": "Print this menu.",
      "/room/list": "List all rooms.",
      "/room/view/id/:number": "View the room with the selected id.",
      "/room/view/house/:house": "View the names of all rooms in this building (house).",
      "/room/search/:search": "View the details of all matching rooms (one per row).",
      "/room/searchp/:search": "Priority search, viewing best matches."
    };

    sendResponse(res, content, 200, type);
  };

  let getRoom = (req, res) => {
    let rooms = getFile("salar");
    let number = req.params.number;
    let type = req.query.type;
    
    let theRoom = rooms.salar.find(room => room.Salsnr === number);

    sendResponse(res, theRoom, 200, type);
  };

  let getHouse = (req, res) => {
    let rooms = getFile("salar");
    let house = req.params.house;
    let type = req.query.type;
    let query = req.query;
    try {
      house = decodeURI(house);
    } catch (e) {
      console.error(e);
    }

    let theRooms = rooms.salar.filter(name => name.Hus === house);

    sendResponse(res, theRooms.slice(0, query.max), 200, type);
  };

  let getSearch = (req, res) => {
    let rooms = getFile("salar");
    let searchString = req.params.search;
    let type = req.query.type;
    let query = req.query;
    try {
      searchString = decodeURI(searchString);
    } catch (e) {
      console.error(e);
    }
    let theRooms = rooms.salar.filter(room => {
      return Object.values(room).some(value => {
        try {
          if (
            value !== null &&
            value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
          ) {
            return true;
          }

        } catch (e) {
          console.error(e);
        }
      });
    });
    sendResponse(res, theRooms.slice(0, query.max), 200, type);
  };
 
  let getSearchP = (req, res) => {
    let rooms = getFile("salar");
    let searchString = req.params.search;
    let type = req.query.type;
    let query = req.query;
    try {
      searchString = decodeURI(searchString);
    } catch (e) {
      console.error(e);
    }
    let theRooms = rooms.salar.filter(room => {
      
      return Object.values(room).some((value, index) => {
        
        if (typeof value === 'string' && value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
          let valOf = value.toLowerCase().indexOf(searchString.toLowerCase());
          room.priority = (((10 / (10 + index)) + (0.9 / (valOf + 1)) + (searchString.length / value.length)) / 3).toString(); //make the priority calc.
          
          if (value.toLowerCase() == searchString.toLowerCase()) {
            room.priority = '1';
          }
          return true;
        }
      });

    });
    theRooms.sort((a, b) => {
        return b.priority - a.priority;
    })
    sendResponse(res, theRooms.slice(0, query.max), 200, type);
  };

  return {
    getSalar: getSalar,
    getRoot: getRoot,
    getRoom: getRoom,
    getHouse: getHouse,
    getSearch: getSearch,
    getSearchP: getSearchP
  };
})();
