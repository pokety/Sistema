  const fetcher=async (url)=>{

    let response = await fetch(url,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    });
    let result =await response.json()
    return result
}
export default fetcher