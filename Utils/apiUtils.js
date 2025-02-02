// utils/apiUtils.js

class APIUtils {
    constructor(request) {
      this.request = request;
    }
  
    /** Make a GET request */
    async getRequest(url, headers = {}) {
      const response = await this.request.get(url, { headers });
      return response.json();
    }
  
    /** Make a POST request */
    async postRequest(url, payload, headers = {}) {
      const response = await this.request.post(url, { data: payload, headers });
      return response.json();
    }
  
    /** Make a PUT request */
    async putRequest(url, payload, headers = {}) {
      const response = await this.request.put(url, { data: payload, headers });
      return response.json();
    }
  
    /** Make a DELETE request */
    async deleteRequest(url, headers = {}) {
      const response = await this.request.delete(url, { headers });
      return response.json();
    }
  }
  
  module.exports = APIUtils;
  