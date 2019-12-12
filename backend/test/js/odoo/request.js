import fetch from 'dva/fetch';


async function getData(url,options ){
    const {body} = options

    return fetch(url, {
        ...options,
        body: JSON.stringify(body),


        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            return data
        });
}

export default getData

