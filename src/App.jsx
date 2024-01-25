import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Details } from "./pages/Details";
import { AddPost } from "./pages/AddPost";
import { SignInUp } from "./pages/SignInUp";
import { ResetPassword } from "./pages/ResetPassword";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { CategProvider } from "./context/CategContext";
import { EditPost } from "./pages/EditPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <CategProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="details/:id" element={<Details />} />
              <Route path="create" element={<AddPost />} />
              <Route path="update/:id" element={<EditPost />} />
              <Route path="repass" element={<ResetPassword />} />
              <Route path="signinup/:type" element={<SignInUp />} />
              <Route path="notfound" element={<NotFound />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </CategProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
