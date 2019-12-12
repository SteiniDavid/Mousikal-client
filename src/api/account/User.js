import { getAxiosInstance } from "../../config/Axios";

const axios = getAxiosInstance('/user/info');

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
export const addUserInfo = async ({ age = '', favAlbum = '', date = new Date().getTime() }) => {
  return (await axios.post('', {
      data: {
        age, favAlbum, date
      },
      type: 'merge'
  })).data.result.posted;
};
