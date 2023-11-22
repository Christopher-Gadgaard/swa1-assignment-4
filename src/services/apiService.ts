const BASE_URL = 'http://localhost:9090';

export const apiService = {
  async get(endpoint: string, token: string) {
    const response = await fetch(`${BASE_URL}${endpoint}?token=${token}`, {
      method: 'GET',
      headers: this.buildHeaders(token)
    });
    return this.processResponse(response);
  },

  async post(endpoint: string, token: string, body?: object) {
    const response = await fetch(`${BASE_URL}${endpoint}?token=${token}`, {
      method: 'POST',
      headers: this.buildHeaders(token),
      body: body ? JSON.stringify(body) : null
    });
    return this.processResponse(response);
  },

  async patch(endpoint: string, token: string, body: object) {
    const response = await fetch(`${BASE_URL}${endpoint}?token=${token}`, {
      method: 'PATCH',
      headers: this.buildHeaders(token),
      body: JSON.stringify(body)
    });
    return this.processResponse(response);
  },

  buildHeaders(token: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    
    });
    return headers;
  },



  async processResponse(response: Response) {
    if (!response.ok) {
        const message = await response.text(); // Read response as text
        throw new Error(message || 'Server responded with an error');
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json(); // Parse response as JSON
    } else {
        return response.text(); // Return response as text
    }
}
};

