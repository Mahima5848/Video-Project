import { useSelector, useDispatch } from "react-redux";
import { removeFromWatchLater } from "./slicers/slicer";

export function WatchLater() {
  const watchLaterList = useSelector((state) => state.watchLater.list);
  const dispatch = useDispatch();

  return (
    <div className="container mt-3">
      <h2>My Saved Videos</h2>
      <div className="d-flex flex-wrap">
        {watchLaterList.map((video) => (
          <div style={{ width: "250px" }} key={video.id} className="card m-2 p-2 border-warning">
            <iframe
              className="w-100"
              src={video.url}
              height="200"
              title={video.title}
            ></iframe>
            <div className="card-header">{video.title}</div>
            <div className="card-body">{video.description}</div>
            <div className="card-footer text-center">
              <button
                onClick={() => dispatch(removeFromWatchLater(video))}
                className="btn w-100 btn-danger bi bi-trash"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {watchLaterList.length === 0 && <p>No videos saved yet.</p>}
      </div>
    </div>
  );
}
