export default async function makeRequest(apiLink, methodType, 
    headers = {'Content-Type': 'application/json'}, requestBody = {}) {
    try {
      let response;
      if (methodType === 'GET') {
        response = await fetch(apiLink, {
          method: methodType,
          headers: headers
        });
      } else {
        response = await fetch(apiLink, {
          method: methodType,
          headers: headers,
          body: JSON.stringify(requestBody)
        });
      }
      const responseData = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        headers: response.headers,
        data: responseData
      };
    } catch (error) {
      console.error(error);
    }
}