import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
export const endPoint = "dogs";


export const Requests = {
  /**
   * Retrieves all dogss from the server.
   * @returns {Promise<Dogs[]>} A promise that resolves to an array of dogs.
   */
  getAllDogs: (): Promise<Dog[]> => 
    fetch(`${baseUrl}/${endPoint}`)
    .then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: () => {},

  // should delete a dog from the database
  deleteDog: () => {},

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
