class APIUtils {
  constructor(request) {
      this.request = request;
  }

  /** Make a GET request */
 
  async getRequest(url, headers = {}) {
    const response = await this.request.get(url, { headers });
    const statusCode = response.status();
    const contentType = response.headers()['content-type'];

    let responseBody;
    if (contentType.includes('application/json')) {
        responseBody = JSON.parse(await response.text());
    } else {
        responseBody =JSON.parse(await response.text());  // Read response as text for debugging
        throw new Error(`Unexpected Content-Type: ${contentType}\nResponse body: ${responseBody}`);
    }

    return { statusCode, responseBody };
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

  async verifyStatusCode(response) {
    await expect(response, `200 Status code was not displayed.`).toBeOK();
}

async verifyResponseBody(expectedResponseBodyParams, responsePart, responseType) {
    let status = true;
    let fieldNames = `Parameter`;
    const headers = expectedResponseBodyParams.split("|");
    const responseToString = JSON.stringify(responsePart).trim();
    for (let headerKey of headers) {
        if (!(responseToString.includes(headerKey.trim()))) {
            status = false;
            fieldNames = fieldNames + `, ` + headerKey;
            break;
        }
    }
    expect(status, `${fieldNames} was not present in ${responseType}`).toBe(true);
}



}



module.exports = APIUtils;
