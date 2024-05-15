import { Component } from 'react';
import { dogPictures } from '../dog-pictures';
import { Dog } from '../types';

type State = {
  image: string;
  name: string;
  description: string;
};

type CreateDogProps = {
  postDog: (dog: Omit<Dog, 'id'>) => void;
  isLoading: boolean;
};

//default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<CreateDogProps> {
  state: State = {
    image: defaultSelectedImage,
    name: '',
    description: '',
  };

  render() {
    const { image, name, description } = this.state;
    const { isLoading, postDog } = this.props;

    return (
      <form
        action="submit"
        id="create-dog-form"
        onSubmit={e => {
          e.preventDefault();
          postDog({
            name: name,
            image: image,
            description: description,
            isFavorite: false,
          });
          this.setState({
            name: '',
            description: '',
            image: defaultSelectedImage,
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          className="form-input"
          type="text"
          onChange={e => {
            this.setState({
              name: e.target.value,
            });
          }}
          disabled={isLoading}
          value={name}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          className="form-input"
          name=""
          id=""
          cols={30}
          rows={10}
          onChange={e => {
            this.setState({
              description: e.target.value,
            });
          }}
          disabled={isLoading}
          value={description}
        />
        <label htmlFor="picture">Select an Image</label>
        <div className="d-flex align-items">
          <select
            className="form-input"
            onChange={e => {
              this.setState({
                image: e.target.value,
              });
            }}
            disabled={isLoading}
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
