import axios from 'axios';

const userAddString = localStorage.getItem('username') + "sss"

export function getSleep() {
  return axios.get('https://djangosleepapp.onrender.com/dailysleep/?username=' + userAddString)
  .then(response => response.data)
}

export function deleteSleep(sleepId) {
    return axios.delete('https://djangosleepapp.onrender.com/dailysleep/' + sleepId + '/', {
     method: 'DELETE',
     headers: {
       'Accept':'application/json',
       'Content-Type':'application/json'
     }
    })
    .then(response => response.data)
  }

export async function addSleep(sleep){
    const response = await axios.post('https://djangosleepapp.onrender.com/dailysleep/', {
        studentId: null,
        start: sleep.start,
        end: sleep.end,
        userAddS: userAddString
    });
    return response.data;
}

export async function updateSleep(sleid, sleep) {
    const response = await axios.put('https://djangosleepapp.onrender.com/dailysleep/' + sleid + '/', {
        start: sleep.start,
        end: sleep.end,
        userAddS: userAddString
    });
    return response.data;
}
