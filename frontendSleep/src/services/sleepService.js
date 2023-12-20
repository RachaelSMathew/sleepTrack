import axios from 'axios';

const userAddString = localStorage.getItem('username') + "sss"

export function getSleep() {
  return axios.get('http://127.0.0.1:8000/dailysleep/?username=' + userAddString)
  .then(response => response.data)
}

export function deleteSleep(sleepId) {
    return axios.delete('http://127.0.0.1:8000/dailysleep/' + sleepId + '/', {
     method: 'DELETE',
     headers: {
       'Accept':'application/json',
       'Content-Type':'application/json'
     }
    })
    .then(response => response.data)
  }

export async function addSleep(sleep){
    const response = await axios.post('http://127.0.0.1:8000/dailysleep/', {
        studentId: null,
        start: sleep.start,
        end: sleep.end,
        userAddS: userAddString
    });
    return response.data;
}

export async function updateSleep(sleid, sleep) {
    const response = await axios.put('http://127.0.0.1:8000/dailysleep/' + sleid + '/', {
        start: sleep.start,
        end: sleep.end,
        userAddS: userAddString
    });
    return response.data;
}
