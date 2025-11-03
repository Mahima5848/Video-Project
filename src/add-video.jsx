import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AddVideo() {
  const [categories, setCategories] = useState([{ category_id: 0, category_name: null }]);
  const navigate = useNavigate();

  // ✅ Render backend URL
  const API_BASE = "https://video-project-gu9c.onrender.com";

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      url: '',
      likes: 0,
      views: 0,
      dislikes: 0,
      category_id: 0,
      comments: ''
    },
    onSubmit: (video) => {
      const parsedVideo = {
        title: video.title,
        description: video.description,
        url: video.url,
        likes: parseInt(video.likes),
        views: parseInt(video.views),
        dislikes: parseInt(video.dislikes),
        category_id: parseInt(video.category_id),
        comments: video.comments
      };

      axios.post(`${API_BASE}/videos`, parsedVideo)
        .then(() => {
          alert('Video Added Successfully.');
          navigate('/admin-dashboard');
        })
        .catch((err) => {
          console.error("Error adding video:", err);
          alert("Failed to add video. Try again.");
        });
    }
  });

  useEffect(() => {
    axios.get(`${API_BASE}/categories`)
      .then(response => {
        response.data.unshift({ category_id: -1, category_name: 'Select Category' });
        setCategories(response.data);
      })
      .catch(err => {
        console.error("Failed to load categories:", err);
      });
  }, []);

  return (
    <div className="bg-light p-2 w-50">
      <h2>Add Video</h2>
      <form onSubmit={formik.handleSubmit}>
        <dl className="row">
          <dt className="col-6">Title</dt>
          <dd className="col-6">
            <input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} />
          </dd>

          <dt className="col-6">Description</dt>
          <dd className="col-6">
            <input type="text" name="description" onChange={formik.handleChange} value={formik.values.description} />
          </dd>

          <dt className="col-6">Url</dt>
          <dd className="col-6">
            <input type="text" name="url" onChange={formik.handleChange} value={formik.values.url} />
          </dd>

          <dt className="col-6">View</dt>
          <dd className="col-6">
            <input type="number" name="views" onChange={formik.handleChange} value={formik.values.views} />
          </dd>

          <dt className="col-6">Likes</dt>
          <dd className="col-6">
            <input type="number" name="likes" onChange={formik.handleChange} value={formik.values.likes} />
          </dd>

          <dt className="col-6">Dislikes</dt>
          <dd className="col-6">
            <input type="number" name="dislikes" onChange={formik.handleChange} value={formik.values.dislikes} />
          </dd>

          <dt className="col-6">Category</dt>
          <dd className="col-6">
            <select name="category_id" onChange={formik.handleChange} value={formik.values.category_id}>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </dd>

          <dt className="col-6">Comments</dt>
          <dd className="col-6">
            <input type="text" name="comments" onChange={formik.handleChange} value={formik.values.comments} />
          </dd>
        </dl>

        <button className="btn btn-warning mx-2" type="submit">Add</button>
        <Link className="btn btn-warning" to="/admin-dashboard">Cancel</Link>
      </form>
    </div>
  );
}
