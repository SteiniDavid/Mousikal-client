import { getAxiosInstance } from "../../config/Axios";

const axios = getAxiosInstance('/user/todo');

// export async function addUserInfo({age: age, favAlbum: favAlbum}) {
//     window.console.log("got to api call");
//     try {
//         await axios.post(`/post`, {age: age, favAlbum: favAlbum});
//         return true;
//       } catch (error) {
//         window.console.log("failing to make post from API frontend");
//         return false;
//       }
// }

//Add to registration 
// export const addUserInfo = async ({ age = '', favAlbum = '', date = new Date().getTime() }) => {
//   return (await axios.post('', {
//     data: {
//       age, favAlbum, date
//     },
//     type: 'merge'
//   })).data.result.posted;
// };

// export const postToUser = async ({ age = ''}) => {
// axios
//   .post("", { data: age }, { headers: { Authorization: `Bearer ${tokenStr}` } },
//   )
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
// }

export const createTodo = async ({title = '', description = '', date = new Date().getTime()} = {}) => {
  return (await axios.post('', {
    data: {
      title, description, date
    },
    type: 'merge'
  })).data.result.posted;
};