import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
export const endPoint = "dogs";


export const Requests = {
  /**
   * Retrieves all dogss from the server.
   * @returns {Promise<Dogs[]>} A promise that resolves to an array of dogs.
   */
  getAllDogs: (): Promise<Dog[]> => 
    fetch(`${baseUrl}/${endPoint}`, {
      method: 'GET',
    })
    .then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: () => {},

  // should delete a dog from the database
  deleteDog: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/${endPoint}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (!response.ok) {
                reject(new Error("Failed to delete note"));
            } else {
                resolve();
            }
        }).catch((error) => {
            reject(error);
        });
    });
  },


  updateDog: (id: number, isFavorite: boolean): Promise<Dog[]> => 
    fetch(`${baseUrl}/${endPoint}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite: isFavorite,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json()),

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
