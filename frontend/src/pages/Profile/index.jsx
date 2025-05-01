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
      className="bg-gray-950 flex w-full flex-col items-center justify-center h-screen text-white"
    >
      <div className="mt-34 backdrop-blur-sm bg-white/10 w-90 py-5 rounded-xl h-90 flex flex-col gap-7">
        <div className="flex pt-12 flex-col">
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
      <div className="flex flex-col w-full mb-34 px-6 mt-34 space-y-4">
        <TrueFocus
          sentence="Todos Completed"
          manualMode={false}
          blurAmount={5}
          borderColor="blue"
          animationDuration={1}
          pauseBetweenAnimations={0.5}
        />

        <div className="pl-4">
          <Link to="/todos">
            <button className="bg-blue-700 cursor-pointer hover:bg-blue-800 px-4 py-2 rounded-full text-white">
              Back Create Todo
            </button>
          </Link>
        </div>

        {todosIsCompleted && todosIsCompleted.length > 0 ? (
          todosIsCompleted.map((todo) => (
            <div
              key={todo.id}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white shadow-md"
            >
              <div className="mb-3">
                <p className="font-semibold text-lg">{todo.title}</p>
                <p className="text-sm text-gray-300">{todo.description}</p>
              </div>
              <div className="text-sm text-gray-300 mb-2">
                <p>
                  <span className="font-semibold">Priority:</span>{" "}
                  {todo.priority}
                </p>
                <p>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {moment(todo.dueDate).format("YYYY-MM-DD - HH:mm:ss")}
                </p>
              </div>
              <div className="flex mt-7 justify-between items-center mt-4">
                <p className="text-sm text-gray-300">
                  Created At: {moment(todo.createdAt).format("YYYY-MM-DD")}
                </p>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center mt-3">
            <p className="text-center text-white bg-cyan-700 flex py-2 px-24 justify-center rounded-full">
              No todos available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
