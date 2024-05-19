import { Dog } from './types';

export const baseUrl = 'http://localhost:3000';
export const endPoint = 'dogs';

export const Requests = {
  /**
   * Retrieves all dogss from the server.
   * @returns {Promise<Dogs[]>} A promise that resolves to an array of dogs.
   */
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/${endPoint}`, {
      method: 'GET',
    }).then(response => response.json()),

  /**
   * Creates a new dog.
   * @param {Omit<Dog, "id">} note The dog object to create.
   * @returns {Promise<Dog[]>} A promise that resolves to an array of dogs.
   */
  postDog: (dog: Omit<Dog, 'id'>) =>
    fetch(`${baseUrl}/${endPoint}`, {
      body: JSON.stringify(dog),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()),

  // should delete a dog from the database
  deleteDog: (id: number): Promise<void> => 
    fetch(`${baseUrl}/${endPoint}/${id}`, {
        method: 'DELETE',
      }).then(response => response.json()
    ),

  updateDog: (id: number, isFavorite: boolean): Promise<Dog[]> =>
    fetch(`${baseUrl}/${endPoint}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite: isFavorite,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()),

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log('dummy stuff');
  },
};
