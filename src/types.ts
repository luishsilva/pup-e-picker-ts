export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};


export type ActiveTab = 'all-dogs' | 'favorited' | 'unfavorited' | 'create-dog';