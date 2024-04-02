import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./Pages/home/Home";
import Blogs from "./Pages/blog/Blogs";
import CryptoCurrencies from "./Pages/Crypto/CryptoCurrencies";
import SubmitBlog from "./Pages/submitBlog/SubmitBlog";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import Footer from "./component/footer/Footer";
import Protected from "./component/protected/Protected";
import { useSelector } from "react-redux/es/hooks/useSelector";


function App() {
  debugger
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div style={{ flex: 1 }}>
                  <Home />
                </div>
              }
            ></Route>
            <Route exact path="blog" element={<Blogs />}></Route>
            <Route
              exact
              path="cryptocurrencies"
              element={<CryptoCurrencies />}
            ></Route>
            <Route
              exact
              path="/submitblog"
              element={
                <Protected isAuth={isAuth}>
                  <div style={{ flex: 1 }}>
                    <SubmitBlog />
                  </div>
                </Protected>
              }
            ></Route>
            <Route exact path="login" element={<Login />}></Route>
            <Route exact path="signup" element={<Signup />}></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
