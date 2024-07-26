import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoverCard, setHoverCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  // console.log("The current user: ", user);

  const handleHover = (index) => {
    setHoverCard(index);
  };

  const handleSelect = (id) => {
  if (!currentUser) {
    alert("Please login first");
    return navigate('/login');
  }

  axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res => {
      setEnrolledClasses(res.data);
      if (res.data.find(item => item.classes._id === id)) {
        alert("Already Enrolled");
      } else {
        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
          .then(res => {
            if (res.data.classId === id) {
              alert("Already Selected");
            } else {
              const data = {
                classId: id,
                email: currentUser?.email,
                date: new Date()
              };
              axiosSecure.post('/add-to-cart', data)
                .then(res => {
                  alert("Added to the cart successfully.");
                  console.log(res.data);
                });
            }
          });
      }
    })
    .catch((err) => console.log(err));
};


  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">
          Classes
        </h1>
      </div>

      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64  mx-auto ${
              cls.availableSeats < 1 ? "bg-red-300" : "bg-white"
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                  hoverCard === index ? "opacity-60" : ""
                }`}
              />
              <img
                src={cls.image}
                alt=""
                className="object-cover w-full h-full"
              />

              <Transition
                show={hoverCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-100"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleSelect(cls._id)}
                    title={
                      role === "admin" || role === "instructor"
                        ? "Instructor/Admin can't be able to select"
                        : cls.availableSeats < 1
                        ? "No seats available."
                        : "You can select classes"
                    }
                    disabled={role === "admin" || role === "instructor" || cls.availableSeats < 1}
                    className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </Transition>
            </div>

            {/* details */}
            <div className="px-6 py-2">
              <div className="h-12 overflow-hidden">
                <h3 className="font-semibold mb-1 truncate">{cls.name}</h3>
              </div>
              <p className="text-gray-500 text-xs">
                Instructor: {cls.instructorName}
              </p>

              <div className="flex items-center justify-between ">
                <span className="text-gray-600 text-xs">
                  Available seats: {cls.availableSeats}
                </span>
                <span className="text-gray-500 font-semibold">
                  ${cls.price}
                </span>
              </div>

              <Link to={`/class/${cls._id}`}>
                <button className="px-4 py-2 mt-4 my-2 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
