import {getAxiosInstance} from "../../config/Axios";

const axios = getAxiosInstance('/user');

export async function addUserInfo({age: age, favAlbum: favAlbum}) {
    window.console.log("got to api call");
    try {
        await axios.post(`/post`, {age: age, favAlbum: favAlbum});
        return true;
      } catch (error) {
        window.console.log("failing to make post from API frontend");
        return false;
      }
}
