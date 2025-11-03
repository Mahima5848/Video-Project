import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { VideoTutorialIndex } from "./video-tutorial-index.jsx";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter basename="/Video-Project">
        <VideoTutorialIndex />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);
