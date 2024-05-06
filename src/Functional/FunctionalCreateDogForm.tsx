import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

//default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({postDog} : {postDog: (dog: Omit<Dog, "id">) => void}) => {

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
        type="text" 
        disabled={false} 
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea 
        name="" 
        className="form-input"
        cols={80} 
        rows={10} 
        disabled={false}
        onChange={(event) => setDescription(event.target.value)}
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
          id="form-image-display"
          className=""
          src={image} 
          alt={`Image of ${image}`} 
        />
      </div>
      <input type="submit" />
    </form>
  );
};
