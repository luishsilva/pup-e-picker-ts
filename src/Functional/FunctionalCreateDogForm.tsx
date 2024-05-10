import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

//default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({postDog, isLoading} : {postDog: (dog: Omit<Dog, "id">) => void, isLoading: boolean}) => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);
  const [description, setDescription] = useState("");

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({
          name: name,
          image: image,
          description: description,
          isFavorite: false
        });
        setName("");
        setDescription("");
        setImage(defaultSelectedImage);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input 
        className="form-input"
        disabled={false} 
        onChange={(event) => setName(event.target.value)}
        type="text"
        value={name}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea 
        className="form-input"
        cols={30}
        disabled={false}
        onChange={(event) => setDescription(event.target.value)}
        name=""
        rows={10}
        value={description}
      >
      </textarea>
      <label htmlFor="picture">Select an Image</label>
      <div className="d-flex align-items">
        <div>
          <select 
            className="form-input"
            onChange={(event) => {
              setImage(event.target.value)
            }}
            value={image}
          >
            {Object.entries(dogPictures).map(([label, pictureValue]) => {
              return (
                <option value={pictureValue} key={pictureValue}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <img 
          alt={`Image of ${image}`}
          className=""
          id="form-image-display"
          src={image}
        />
      </div>
      <input type="submit" disabled={isLoading}/>
    </form>
  );
};
