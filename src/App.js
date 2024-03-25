// import React, { useState, useEffect } from "react";
// function App() {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [term, searchTerm] = useState("");

//   useEffect(() => {
//     fetch(
//       `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
//     )
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg">
//       <img
//         src="https://source.unsplash.com/random"
//         alt="photttttto"
//         className="w-full"
//       />
//       <div className="px-6 py-4">
//         <div className="font-bold text-purple-500 text-xl mb-2">
//           Photo by John Doe
//         </div>
//         <ul>
//           <li>
//             <strong>Views:</strong>
//             4000
//           </li>
//           <li>
//             <strong>Downloads:</strong>
//             300
//           </li>
//           <li>
//             <strong>Likes:</strong>
//             400
//           </li>
//         </ul>
//       </div>
//       <div className="px-6 py-4">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           #tag1
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           #tag2
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           #tag3
//         </span>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=43057230-848e678a21fc058b2a212e812&q=${term}&image_type=photo`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [term]);

  return (
    <div className="container mx-auto">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search images..."
        className="border p-2 mb-4 w-full"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-purple-500 text-xl mb-2">
                  Photo by {image.user}
                </div>
                <ul>
                  <li>
                    <strong>Views:</strong> {image.views}
                  </li>
                  <li>
                    <strong>Downloads:</strong> {image.downloads}
                  </li>
                  <li>
                    <strong>Likes:</strong> {image.likes}
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4">
                {image.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
