/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshTokenAuth } from "../../services/authServices.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import TrueFocus from "../../TextAnimations/TrueFocus/TrueFocus.jsx";
import ShinyText from "../../TextAnimations/ShinyText/ShinyText.jsx";

export default function Todos() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [todosIsNotCompleted, setTodosIsNotCompleted] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await refreshToken();
      await getTodosByStatusIsNotCompleted();
    }

    fetchData();
  }, []);

  function openModal() {
    document.getElementById("my_modal_1").showModal();
  }

  async function refreshToken() {
    try {
      const response = await refreshTokenAuth();
      const getNewAccessToken = response.data.accessToken;
      setToken(getNewAccessToken);

      const decoded = jwtDecode(getNewAccessToken);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your session has expired! Please login again to continue",
        });
        navigate("/signin");
      }
    }
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

  async function addTodo(e) {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
    };

    try {
      const response = await axiosJWT.post(
        import.meta.env.VITE_API_URL + "/todos",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Todo Added",
        text: response.data.message,
      });
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setErrors({});
      await getTodosByStatusIsNotCompleted(); // get todos after adding a new one (real-time update)
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message || {});
      }
    }
  }

  async function getTodosByStatusIsNotCompleted() {
    await axiosJWT
      .get(import.meta.env.VITE_API_URL + "/todos/not-completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodosIsNotCompleted(response.data.todoIsNotCompleted);
      });
  }

  async function editTodo (e, id) {
    e.preventDefault();
    const data = {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate,
    };
    try {
      const response = await axiosJWT.put(
        import.meta.env.VITE_API_URL + `/todos/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Todo Updated",
        text: response.data.message,
      });
      setEditTitle("");
      setEditDescription("");
      setEditPriority("");
      setEditDueDate("");
      await getTodosByStatusIsNotCompleted(); // get todos after updating a todo (real-time update)

      // Close the modal after successful edit
      document.getElementById("my_modal_1").close();
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        console.error(error.response.data.message || error.message);
      document.getElementById("my_modal_1").close();
      }
    }
  }

  async function updateStatusTodo(id) {
    try {
      const response = await axiosJWT.put(
        import.meta.env.VITE_API_URL + `/todos/status/${id}`,
        {}, // Empty body since no data is being sent
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Activity is completed",
        text: response.data.message,
      });
      await getTodosByStatusIsNotCompleted(); // get todos after updating a todo (real-time update)
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || "An error occurred",
        });
        console.error(error.response.data.message || error.message);
      }
    }
  }

  return (
    <>
      <div
        style={{ height: "auto" }}
        className="bg-gray-950 flex w-full flex-col items-center justify-center text-white"
      >
        <div className="flex mt-34 h-auto backdrop-blur-md w-190 bg-white/10 drop-shadow-lg p-12 rounded-xl h-100 flex-col gap-7 justify-center items-center">
          <TrueFocus
            sentence="Create Your Todos"
            manualMode={false}
            blurAmount={5}
            borderColor="blue"
            animationDuration={1}
            pauseBetweenAnimations={0.5}
          />
          <form onSubmit={addTodo} className="flex flex-col gap-3 items-center">
            <div className="flex flex-col">
              <label htmlFor="Title" className="pl-4">
                Title
              </label>
              <input
                type="text"
                className="border rounded-sm w-150 px-4 py-2"
                placeholder="add title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.title}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Description" className="pl-4">
                Description
              </label>
              <textarea
                type="text"
                className="border rounded-sm w-150 px-4 py-2 h-55"
                placeholder="your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.description}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Priority" className="pl-4">
                Priority
              </label>
              <select
                className="border rounded-sm w-150 px-4 py-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <optgroup className="bg-slate-950">
                  <option value="">Select Priority...</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </optgroup>
              </select>
              {errors.priority && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.priority}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dueDate" className="pl-4">
                Due Date
              </label>
              <input
                type="datetime-local"
                className="border rounded-sm w-150 px-4 py-2"
                placeholder="add date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {errors.dueDate && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.dueDate}
                </p>
              )}
            </div>

            <input
              type="submit"
              value="Add Todo"
              className="mt-2 p-3 px-10 rounded-full text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer"
            />
          </form>
        </div>
        <div className="mb-43 backdrop-blur-md bg-white/10 drop-shadow-lg p-12 rounded-xl flex flex-col items-center justify-center mt-34 gap-10">
          <TrueFocus
            sentence="In Progress"
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
              {todosIsNotCompleted && todosIsNotCompleted.length > 0 ? (
                todosIsNotCompleted.map((todo) => (
                  <tr key={todo.id}>
                    <td className="border">{todo.title}</td>
                    <td className="border">{todo.description}</td>
                    <td className="border">{todo.priority}</td>
                    <td className="border">
                      {moment(todo.dueDate)
                        .format("YYYY-MM-DD - HH:mm:ss")
                        .toLocaleString()}
                    </td>

                    {/* Modal edit */}
                    <td className="border">
                      <div className="flex gap-4 ">
                        <button
                          className="btn shadow-none border-none text-white bg-green-800 hover:bg-green-900"
                          onClick={() => openModal(todo)}
                        >
                          Edit
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box flex h-auto backdrop-blur-md w- bg-white/10 drop-shadow-lg p-12 rounded-xl h-100 flex-col gap-7 justify-center items-center">
                            <h1 className="text-2xl">
                              <ShinyText
                                text="Edit Your Todo"
                                disabled={false}
                                speed={2}
                                className=""
                              />
                            </h1>
                            <form
                              className="flex flex-col gap-3 text-white items-center"
                            >
                              <div className="flex flex-col">
                                <label htmlFor="Title" className="pl-4">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  className="border rounded-sm w-100 px-4 py-2"
                                  placeholder="add title here"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                />
                              </div>

                              <div className="flex flex-col">
                                <label htmlFor="Description" className="pl-4">
                                  Description
                                </label>
                                <textarea
                                  type="text"
                                  className="border rounded-sm w-100 px-4 py-2 h-55"
                                  placeholder="your description"
                                  value={editDescription}
                                  onChange={(e) =>
                                    setEditDescription(e.target.value)
                                  }
                                />
                              </div>

                              <div className="flex flex-col">
                                <label htmlFor="Priority" className="pl-4">
                                  Priority
                                </label>
                                <select
                                  className="border rounded-sm w-100 px-4 py-2"
                                  value={editPriority}
                                  onChange={(e) => setEditPriority(e.target.value)}
                                >
                                  <optgroup className="bg-slate-950">
                                    <option value="">Select Priority...</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="LOW">LOW</option>
                                  </optgroup>
                                </select>
                              </div>

                              <div className="flex flex-col">
                                <label htmlFor="dueDate" className="pl-4">
                                  Due Date
                                </label>
                                <input
                                  type="datetime-local"
                                  className="border rounded-sm w-100 px-4 py-2"
                                  placeholder="add date"
                                  value={editDueDate}
                                  onChange={(e) => setEditDueDate(e.target.value)}
                                />
                              </div>

                              <input
                                type="submit"
                                onClick={(e) => editTodo(e, todo.id)}
                                value="Edit Todo"
                                className="mt-2 p-3 px-10 rounded-full text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer"
                              />
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="p-3 px-10 rounded-full text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </form>
                          </div>
                        </dialog>

                        <button
                          onClick={() => updateStatusTodo(todo.id)}
                          className="btn btn-primary shadow-none"
                        >
                          Mark As Complete
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
    </>
  );
}
