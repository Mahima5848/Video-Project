import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchLater, removeFromWatchLater } from "./slicers/slicer";

export function UserDashboard() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [cookies, , removeCookie] = useCookies(["user_id"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const watchLaterList = useSelector((state) => state.watchLater.list);

  // ✅ Use your Render backend URL
  const API_BASE = "https://video-project-gu9c.onrender.com";

  function LoadVideos() {
    axios.get(`${API_BASE}/videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch(err => {
        console.error("Failed to fetch videos:", err);
      });
  }

  const handleSignout = useCallback(() => {
    removeCookie("user_id");
    navigate("/user-login");
  }, [removeCookie, navigate]);

  useEffect(() => {
    LoadVideos();
  }, []);

  function handleSaveClick(video) {
    dispatch(addToWatchLater(video));
  }

  function handleRemoveClick(video) {
    dispatch(removeFromWatchLater(video));
  }

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light p-2">
      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center mb-3">
        <div>User Dashboard</div>
        <div className="input-group" style={{ width: "300px" }}>
          <input
            type="text"
            placeholder="Search Videos"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning bi bi-search"></button>
        </div>
        <div>
          <span className="bi bi-save me-3"> {watchLaterList.length} Videos </span>
          <button onClick={handleSignout} className="btn btn-danger">
            Signout
          </button>
        </div>
      </nav>

      {/* Videos */}
      <h4>All Videos</h4>
      <div className="d-flex flex-wrap">
        {filteredVideos.map((video) => (
          <div style={{ width: "250px" }} key={video.id} className="card m-2 p-2">
            <iframe className="w-100" src={video.url} height="200" title={video.title}></iframe>
            <div className="card-header" style={{ height: "80px" }}>
              {video.title}
            </div>
            <div className="card-body">{video.description}</div>
            <div className="card-footer text-center">
              <span className="bi bi-eye"> {video.views} </span>
              <span className="bi bi-hand-thumbs-up mx-3"> {video.likes} </span>
              <span className="bi bi-hand-thumbs-down"> {video.dislikes} </span>
              <div>
                <button
                  onClick={() => handleSaveClick(video)}
                  className="btn w-100 btn-success bi bi-save2-fill"
                >
                  {" "} Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Watch Later Section */}
      <h4 className="mt-4">Watch Later</h4>
      <div className="d-flex flex-wrap">
        {watchLaterList.map((video) => (
          <div style={{ width: "250px" }} key={video.id} className="card m-2 p-2 border-warning">
            <iframe className="w-100" src={video.url} height="200" title={video.title}></iframe>
            <div className="card-header" style={{ height: "80px" }}>
              {video.title}
            </div>
            <div className="card-body">{video.description}</div>
            <div className="card-footer text-center">
              <button
                onClick={() => handleRemoveClick(video)}
                className="btn w-100 btn-danger bi bi-trash"
              >
                {" "} Remove
              </button>
            </div>
          </div>
        ))}
        {watchLaterList.length === 0 && <p>No videos saved yet.</p>}
      </div>
    </div>
  );
}
