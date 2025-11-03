import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo() {
  const [categories, setCategories] = useState([{ category_id: 0, category_name: null }]);
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

  const formik = useFormik({
    initialValues: {
      title: video.title,
      description: video.description,
      url: video.url,
      likes: video.likes,
      views: video.views,
      dislikes: video.dislikes,
      category_id: video.category_id,
      comments: video.comments
    },
    onSubmit: (videoData) => {
      const parsedVideo = {
        title: videoData.title,
        description: videoData.description,
        url: videoData.url,
        likes: parseInt(videoData.likes),
        views: parseInt(videoData.views),
        dislikes: parseInt(videoData.dislikes),
        category_id: parseInt(videoData.category_id),
        comments: videoData.comments
      };

      axios.put(`${API_BASE}/videos/${params.id}`, parsedVideo)
        .then(() => {
          alert("Video Updated Successfully");
          navigate("/admin-dashboard");
        })
        .catch(err => {
          console.error("Failed to update video:", err);
          alert("Update failed. Try again.");
        });
    },
    enableReinitialize: true
  });

  function LoadCategories() {
    axios.get(`${API_BASE}/categories`)
      .then(response => {
        response.data.unshift({ category_id: -1, category_name: "Select Category" });
        setCategories(response.data);
      })
      .catch(err => {
        console.error("Failed to load categories:", err);
      });
  }

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
    LoadCategories();
    LoadVideo();
  }, []);

  return (
    <div className="bg-light p-2 w-50">
      <h3>Edit Video</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl className="row">
          <dt className="col-6">Title</dt>
          <dd className="col-6">
            <input
              onChange={formik.handleChange}
              value={formik.values.title || ""}
              type="text"
              name="title"
            />
          </dd>

          <dt className="col-6">Description</dt>
          <dd className="col-6">
            <input
              type="text"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              name="description"
            />
          </dd>

          <dt className="col-6">Url</dt>
          <dd className="col-6">
            <input
              type="text"
              value={formik.values.url || ""}
              onChange={formik.handleChange}
              name="url"
            />
          </dd>

          <dt className="col-6">View</dt>
          <dd className="col-6">
            <input
              type="number"
              value={formik.values.views || 0}
              onChange={formik.handleChange}
              name="views"
            />
          </dd>

          <dt className="col-6">Likes</dt>
          <dd className="col-6">
            <input
              type="number"
              value={formik.values.likes || 0}
              onChange={formik.handleChange}
              name="likes"
            />
          </dd>

          <dt className="col-6">Dislikes</dt>
          <dd className="col-6">
            <input
              type="number"
              value={formik.values.dislikes || 0}
              onChange={formik.handleChange}
              name="dislikes"
            />
          </dd>

          <dt className="col-6">Category</dt>
          <dd className="col-6">
            <select
              name="category_id"
              value={formik.values.category_id || -1}
              onChange={formik.handleChange}
            >
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </dd>

          <dt className="col-6">Comments</dt>
          <dd className="col-6">
            <input
              type="text"
              value={formik.values.comments || ""}
              onChange={formik.handleChange}
              name="comments"
            />
          </dd>
        </dl>

        <button className="btn btn-success mx-2" type="submit"> Save </button>
        <Link className="btn btn-warning" to="/admin-dashboard">Cancel</Link>
      </form>
    </div>
  );
}
