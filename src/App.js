import "./App.css";

import { Bars } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import TodoContainer from "./Components/TodoContainer";

const App = () => {
  const [json, setjson] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fecthing the url to obtain the list of todos
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=6")
      // converting the response to json
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          // setting the response to @json
          setjson(json);

          // setting the loading to false, indicating that the data is loaded
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <div>
      {/* conditionally checking wether the app is ready to be displayed or not and acting accoridingly. */}
      {!loading ? (
        <TodoContainer jsonTodos={json} />
      ) : (
        <div className="full-center-aligned bg-dark-secondary">
          <Bars
            height="180"
            width="180"
            color="#4fa94d"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default App;
