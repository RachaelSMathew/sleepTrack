import axios from 'axios';
//Connecting back to front end 
const userAddString = localStorage.getItem('username') + "sss"

export function getDream() {
  return axios.get('http://127.0.0.1:8000/dailydreams/?username=' + userAddString)
    .then(response => response.data)
}

export async function deleteDreams(dreamId) {
    const response = await axios.delete('http://127.0.0.1:8000/dailydreams/' + dreamId + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return response.data;
  }

export async function addDream(dream){
    const response = await axios.post('http://127.0.0.1:8000/dailydreams/', {
        dreamId: null,
        dreamDate: dream.dreamDate,
        dreamType: dream.dreamType,
        dreamThing: dream.dreamThing,
        userNameAddS: userAddString
    });
    return response.data;
}

export async function updateDream(dreamId, dream) {
    const response = await axios.put('http://127.0.0.1:8000/dailydreams/' + dreamId + '/', {
        dreamDate: dream.dreamDate,
        dreamType: dream.dreamType,
        dreamThing: dream.dreamThing,
        userNameAddS: userAddString
    });
    return response.data;
}
