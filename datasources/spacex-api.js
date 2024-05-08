import { RESTDataSource } from "@apollo/datasource-rest";

class spaceXAPI extends RESTDataSource {
  baseURL = 'https://api.spacexdata.com/v4/';
  
  async searchLaunchesByKeyword(limit = "30", keyword = "", sort = "asc", offset = "0", page = "1") {

    console.log("Keyword:" + keyword);

    const searchOptions = {
      query: {
        //$text: {
          //$search: keyword
        //}
      },
      options: {
          limit: limit,
          offset: offset,
          page: page,
          pagination: true,
          sort: {
            date_unix: sort
          }
      }
    };

    if (keyword) {
      searchOptions.query.$text = {
        $search: keyword
     };
    }

    /*if (upcoming) {
      searchOptions.query.upcoming = true;
    }

    if (past) {
      searchOptions.query.upcoming = true;
    }*/

    const launchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchOptions)
    };

      

      const fetchPromise = this.post('launches/query', launchOptions);
      console.log(launchOptions);

      const fetchResult = await fetchPromise.then((response) => { 
        //console.log(response);
        return response.docs;
      }, (error) => {
        return 'foobar';
      }
      );

      return fetchResult;
    }
    
    async getLaunch(id) {
      return this.get(`launches/${id}`);
    }

    async getPayloads() {
      return this.get('payloads/');
    }

    async getPayload(id) {
      return this.get(`payloads/${id}`);
    }

    async getLaunchpad(id) {
      return this.get(`launchpads/${id}`);
    }

    async getLaunchpads() {
      return this.get('launchpads/');
    }

    async getRocket(id) {
      return this.get(`rockets/${id}`);
    }
  }

  export { spaceXAPI };