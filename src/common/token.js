import { jwtDecode } from "jwt-decode";
import VueCookies from "vue-cookies";

// cookie 상에 저장되어 있는 토큰이 있는지 확인
export const getToken = () => {
  try {
    if (localStorage.getItem("access_token")) {
      return JSON.parse(localStorage.getItem("access_token"));
    } else {
      return false;
    }
  } catch (err) {
    console.err(err);
    return false;
  }
};

// 토큰의 payload 를 보려는 경우
export const getTokenPayload = token => {
  try {
    const jwtToken = jwtDecode(token);
    return jwtToken.payload;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 백엔드 쪽에서 받은 토큰을 cookie 에 굽는 경우 ( 로그인 )
export const saveToken = token => {
  localStorage.setItem("access_token", token);
};

// 토큰을 삭제하는 경우 ( 로그아웃, 토큰 기간 만료 등 )
export const deleteToken = () => {
  localStorage.removeItem("access_token");
};
