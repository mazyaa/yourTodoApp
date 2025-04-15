/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { refreshTokenAuth } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import TrueFocus from "../../TextAnimations/TrueFocus/TrueFocus";
import ShinyText from "../../TextAnimations/ShinyText/ShinyText";

export default function Profile() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  // const [name, setName] = useState("");
  // const [Email, setEmail] = useState("");
  const [todosIsCompleted, setTodosIsCompleted] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await refreshToken();
      await getTodosByStatusIsCompleted();
    }
    fetchData();
  }, []);

  async function refreshToken() {
    refreshTokenAuth()
      .then((response) => {
        const getNewAccessToken = response.data.accessToken;
        setToken(getNewAccessToken);

        const decoded = jwtDecode(getNewAccessToken);
        setExpired(decoded.exp);
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your session has expired! Please login again to continue",
          });
          navigate("/signin");
        }
      });
  }

  async function getTodosByStatusIsCompleted() {
    await axiosJWT
      .get(import.meta.env.VITE_API_URL + "/todos/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodosIsCompleted(response.data.todoIsCompleted);
      });
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async function (config) {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        await axios
          .get(import.meta.env.VITE_API_URL + "/auth/refresh-token")
          .then((response) => {
            const getNewAccessToken = response.data.accessToken;
            config.headers.Authorization = `Bearer ${getNewAccessToken}`;
            setToken(getNewAccessToken);
            const decoded = jwtDecode(getNewAccessToken);
            setExpired(decoded.exp);
          });
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

 async function deleteTodo(id) {
    try {
      const response = await axiosJWT.delete(
        import.meta.env.VITE_API_URL + `/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Todo Deleted",
        text: response.data.message,
      });
      await getTodosByStatusIsCompleted(); // get todos after deleting a todo (real-time update)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "An error occurred",
      });
    }
  }
  return (
    <div 
    style={{ height: "Auto" }}
    className="bg-gray-950 flex w-full flex-col items-center justify-center h-screen text-white">
      <div className="mt-34 backdrop-blur-sm bg-white/10 w-100 px-12 py-5 rounded-xl flex flex-col gap-7">
        <Link
          to="/Todos"
          className="p-2 border w-40 rounded-full text-white hover:bg-sky-950 border-slate-700 cursor-pointer"
        >
          <ShinyText
            text="Back Create Todo"
            disabled={false}
            speed={2}
            className=""
          />
        </Link>
        <TrueFocus
          sentence="Profile"
          manualMode={false}
          blurAmount={5}
          borderColor="blue"
          animationDuration={1}
          pauseBetweenAnimations={0.5}
        />
        <div className="flex justify-center">
          <ul className="flex gap-5 flex-col text-lg font-semibold">
            <li>Name : </li>
            <li>Email : </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button className="p-2 border w-40 rounded-full text-white hover:bg-sky-950 border-slate-700 cursor-pointer">
            <ShinyText
              text="Edit Profile"
              disabled={false}
              speed={2}
              className=""
            />
          </button>
        </div>
      </div>
      <div className="mb-34 backdrop-blur-md bg-white/10 drop-shadow-lg p-12 rounded-xl flex flex-col items-center justify-center mt-34 gap-10">
        <TrueFocus
          sentence="Todos Completed"
          manualMode={false}
          blurAmount={5}
          borderColor="blue"
          animationDuration={1}
          pauseBetweenAnimations={0.5}
        />
        <table className="table">
          <thead>
            <tr className="text-white text-center">
              <th className="border">Title</th>
              <th className="border">Description</th>
              <th className="border">Priority</th>
              <th className="border">Due Date</th>
              <th className="border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todosIsCompleted && todosIsCompleted.length > 0 ? (
              todosIsCompleted.map((todo) => (
                <tr key={todo.id}>
                  <td className="border">{todo.title}</td>
                  <td className="border">{todo.description}</td>
                  <td className="border">{todo.priority}</td>
                  <td className="border">
                    {moment(todo.dueDate)
                      .format("YYYY-MM-DD - HH:mm:ss")
                      .toLocaleString()}
                  </td>
                  <td className="border">
                    <div className="flex gap-4">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="btn border-none bg-red-700 hover:bg-red-900 shadow-none text-white"
                      >
                        Delete Todo
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5">No todos available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
