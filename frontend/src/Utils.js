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
      return await response.json();
    } catch (error) {
      console.error(error);
    }
}