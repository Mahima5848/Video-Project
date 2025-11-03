import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export function AdminLogin() {

    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);
    const navigate = useNavigate();

    // ✅ Render backend URL
    const API_BASE = "https://video-project-gu9c.onrender.com";

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get(`${API_BASE}/admin`)
                .then(response => {
                    const adminuser = response.data.find(item => item.admin_id === admin.admin_id);
                    if (adminuser) {
                        if (adminuser.password === admin.password) {
                            setCookie('admin_id', adminuser.admin_id, { expires: new Date('2025-08-27') });
                            navigate('/admin-dashboard');
                        } else {
                            alert('Invalid Password');
                        }
                    } else {
                        alert('Invalid Admin ID');
                    }
                })
                .catch(err => {
                    console.error("Admin login failed:", err);
                    alert("Login failed. Try again.");
                });
        }
    });

    useEffect(() => {
        if (cookies['admin_id']) {
            navigate('/admin-dashboard');
        }
    }, [cookies, navigate]);

    return (
        <div className="bg-light p-3 w-25">
            <h2>Admin Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd>
                        <input
                            type="text"
                            name="admin_id"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.admin_id || ""}
                        />
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            className="form-control"
                            value={formik.values.password || ""}
                        />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-warning mx-2">Login</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        </div>
    );
}
