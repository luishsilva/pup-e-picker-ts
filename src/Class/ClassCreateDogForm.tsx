import { Component } from "react";
import { dogPictures } from "../dog-pictures";

type State = {
  image: string,
}

export class ClassCreateDogForm extends Component<State> {

  state: State = {
    image: dogPictures.BlueHeeler,
  }

  render() {
    
    const { image } = this.state;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input 
          className="form-input"
          type="text" 
          onChange={() => {}} 
          disabled={false} 
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          className="form-input"
          name=""
          id=""
          cols={30}
          rows={10}
          onChange={(e) => {}}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <div className="d-flex align-items">
          <select 
            className="form-input"
            onChange={(e) => {}} 
            disabled={false}
          >
            {Object.entries(dogPictures).map(([label, pictureValue]) => {
              return (
                <option value={pictureValue} key={pictureValue}>
                  {label}
                </option>
              );
            })}
          </select>
          <img 
            alt={`Image of ${image}`}
            className=""
            id="form-image-display"
            src={image}
          />
        </div>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
