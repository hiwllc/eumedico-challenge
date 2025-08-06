export type Status = "Alive" | "Dead" | "unknown";
export type Species = "Human";
export type Gender = "Male" | "Female" | "Genderless" | "unknown";

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
};

export type Characters = Array<Character>;

export type PageInfo = {
  count: number;
  pages: number;
  next?: string | null;
  prev?: string | null;
};

export type CharactersResult = {
  info: PageInfo;
  results: Characters;
};
