import { RESTDataSource } from "@apollo/datasource-rest";

class spaceXAPI extends RESTDataSource {
  baseURL = 'https://api.spacexdata.com/v4/';
  
  async searchLaunchesByKeyword(limit = "10", keyword = "", sort = "asc", offset = "0") {
      const launchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "query": {
            "$text": {
              "$search": keyword
            }
          },
          "options": {
            "limit": limit
          },
        }),
      };

      const fetchPromise = this.post('launches/query', launchOptions);

      const fetchResult = await fetchPromise.then((response) => { 
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