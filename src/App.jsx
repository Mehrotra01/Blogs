import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components/index";
import authService from "./appwrite/auth";
import { login, logOut } from "./store/features/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoader(false));
  }, []);
  return !loader ? (
    <>
      <Header />
      <main>
        <h1>bLOG'S APP USING appwrite</h1>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <>
      <h1>bLOG'S APP Loading</h1>
    </>
  );
}

export default App;
