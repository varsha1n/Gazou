import React, { useState, useEffect } from "react";

const Home = () => {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [username, setUsername] = useState(""); // Change to username

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  function uploadImage() {
    fetch("http://localhost:3001/images/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Remove this line, it's not needed
      },
      body: JSON.stringify({
        base64: image,
        username: username, // Use username field instead of userID
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // After uploading the image, fetch all images again to update the list
        getImage();
      })
      .catch((error) => console.log("Error:", error));
  }

  function getImage() {
    // Assuming you have the username of the logged-in user in the 'username' state
    const currentUsername = username; // Use the 'username' state variable

    fetch(
      `http://localhost:3001/images/get-image?username=${currentUsername}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      });
  }

  function deleteImage(imageId) {
    if (imageId) {
      console.log(imageId);
    } else {
      console.log("shit");
    }

    fetch(`http://localhost:3001/images/delete-image/${imageId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // After deleting the image, fetch all images again to update the list
        getImage();
      })
      .catch((error) => console.log("Error:", error));
  }

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "50px",
    height: "300px",
  };

  const gridItemStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  useEffect(() => {
    // When the component mounts, you can fetch the user ID from the backend (after the user logs in)
    // and update the userID state accordingly

    const storedUsername = window.localStorage.getItem("username");

    // Update the username state with the retrieved username
    if (storedUsername) {
      setUsername(storedUsername);
      getImage(); // Fetch all images after getting the username
    }
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <input accept="image/*" type="file" onChange={convertToBase64} />
        {image === "" || image == null ? (
          ""
        ) : (
          <img
            width={250}
            height={250}
            src={image}
            alt=""
            style={{ left: "100px", top: "100px" }}
          />
        )}
        <button onClick={uploadImage}>Upload</button> <br />
        <br />
        <br />
        <div style={gridContainerStyle}>
          {allImage.map((data) => {
            return (
              <div key={data._id} style={{ position: "relative" }}>
                <img
                  width={250}
                  height={250}
                  src={data.image}
                  alt=""
                  style={gridItemStyle}
                />
                <button
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                  onClick={() => deleteImage(data._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
