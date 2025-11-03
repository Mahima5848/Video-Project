import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteVideo() {
  const [video, setVideo] = useState({
    title: null,
    description: null,
    url: null,
    likes: 0,
    views: 0,
    dislikes: 0,
    category_id: 0,
    comments: null
  });

  const navigate = useNavigate();
  const params = useParams();

  // ✅ Render backend URL
  const API_BASE = "https://video-project-gu9c.onrender.com";

  function LoadVideo() {
    axios.get(`${API_BASE}/videos/${params.id}`)
      .then(response => {
        setVideo(response.data);
      })
      .catch(err => {
        console.error("Failed to load video:", err);
      });
  }

  useEffect(() => {
    LoadVideo();
  }, []);

  function handleYesClick() {
    axios.delete(`${API_BASE}/videos/${params.id}`)
      .then(() => {
        alert("Deleted Successfully");
        navigate("/admin-dashboard");
      })
      .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete. Try again.");
      });
  }

  return (
    <div className="bg-light p-2 w-25">
      <h2>Delete Video</h2>
      <h4>Are you sure you want to delete this video?</h4>
      <dl>
        <dt>Title</dt>
        <dd>{video.title}</dd>
        <dt>Preview</dt>
        <dd>
          <iframe src={video.url} width="300" height="200" title={video.title}></iframe>
        </dd>
      </dl>
      <button onClick={handleYesClick} className="btn btn-danger mx-2">Yes</button>
      <Link className="btn btn-warning" to="/admin-dashboard">No</Link>
    </div>
  );
}
