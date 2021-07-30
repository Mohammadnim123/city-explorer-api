const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY;

function yelpHandler(req,res){
    let {searchQuery,page} = req.query;
    const searchRequest = {
        
        location: searchQuery,
        limit: 3,
        offset: ((page - 1) * 4 + 1)

      };
      
      const client = yelp.client(apiKey);
      
      client.search(searchRequest).then(result => {

        let yelpData = result.jsonBody.businesses.map(elem =>{
          return new Yelp(elem)
        })

        res.send(yelpData);
      }).catch((error) => {
        res.send([])
      });
}

class Yelp {
    constructor(business) {
      
      this.name = business.name;
      this.image_url = business.image_url;
      this.price = business.price;
      this.rating = business.rating;
      this.url = business.url;
      
    }
  }

  module.exports = yelpHandler