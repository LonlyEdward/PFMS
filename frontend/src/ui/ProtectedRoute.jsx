import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../utils/constants";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        // localStorage.setItem(ACCESS_TOKEN, res.data.tokens.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import api from "../services/api";
// // import { REFRESH_TOKEN, ACCESS_TOKEN } from "../utils/constants";
// import { useState, useEffect } from "react";
// // import Spinner from "./Spinner";
// import Spinnerv2 from "./Spinnerv2";
// import styled from "styled-components";

// const FullPage = styled.div`
//   height: 100vh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// function ProtectedRoute({ children }) {
//   const [isAuthorized, setIsAuthorized] = useState(null);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       await auth();
//     };

//     initializeAuth();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const refreshToken = async () => {
//     const refreshToken = localStorage.getItem("refresh");
//     if (!refreshToken) {
//       setIsAuthorized(false);
//       return;
//     }

//     try {
//       const res = await api.post("/api/token/refresh/", {
//         refresh: refreshToken,
//       });

//       if (res.status === 200) {
//         localStorage.setItem("access", res.data.access);
//         setIsAuthorized(true);
//         scheduleTokenRefresh();
//       } else {
//         setIsAuthorized(false);
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       setIsAuthorized(false);
//     }
//   };

//   const auth = async () => {
//     const token = localStorage.getItem("access");
//     if (!token) {
//       setIsAuthorized(false);
//       return;
//     }

//     const decoded = jwtDecode(token);
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000;

//     if (tokenExpiration < now) {
//       await refreshToken();
//     } else {
//       setIsAuthorized(true);
//       scheduleTokenRefresh(tokenExpiration - now);
//     }
//   };

//   const scheduleTokenRefresh = (delay = null) => {
//     const token = localStorage.getItem("access");
//     const decoded = jwtDecode(token);
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000;
//     const refreshTime = delay || tokenExpiration - now - 60; // refresh 1 minute before expiration

//     setTimeout(refreshToken, refreshTime * 1000);
//   };

//   if (isAuthorized === null) {
//     return (
//       <FullPage>
//         <Spinnerv2 />
//       </FullPage>
//     );
//   }

//   return isAuthorized ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;
