import React, { useEffect, useState } from "react";
import "./list.css";


export const List = (props) => {
  const data = props.alldata;
  const [alldata, setAllData] = useState([]);
  const [id, setId] = useState(undefined);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      const data = await res.json();

      if (res.ok) {
        setAllData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {id != "null" && id != undefined && id ? (
        <div className="container mx-auto p-4">
          <div className="flex justify-between">
            <div className="text-start">
              <div className="">
                <h2 className=" font-semibold mb-2 text-4xl text-white">
                  {alldata.title}
                </h2>
                <br />
                <p className=" text-2xl text-white">
                  Rating: {alldata.vote_average}
                </p>
              </div>
              <br />
              <div className="text-white">
                <div className="flex space-x-7">
                  <h1 className="border-2 to-black">{`${alldata.runtime} min`}</h1>
                  <h1>{alldata.tagline}</h1>
                </div>
                <br />

                <h1>{`Release Data ${data.release_date}`}</h1>
                <h1 className="text-2xl text-white">Overview</h1>
                <br />
                <h1>{alldata.overview}</h1>
              </div>
            </div>
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/w500${alldata.poster_path}`}
                alt={alldata.title}
                className="object-cover cursor-pointer "
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.length > 0 &&
            data != undefined &&
            data.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  onClick={() => setId(item.id)}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-48 object-cover cursor-pointer"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    Rating: {item.vote_average}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
