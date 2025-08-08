export type Status = "Alive" | "Dead" | "unknown";
export type Species = "Human";
export type Gender = "Male" | "Female" | "Genderless" | "unknown";

export type Character = {
  id: number;
  name: string;
  status: Status | string;
  species: Species | string;
  type: string | string;
  gender: Gender | string;
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

export type Characters = Array<Pick<Character, 'id' | 'name' | 'location' | 'status'>>;

export type PageInfo = {
  count: number;
  pages: number;
  next?: string | null;
  prev?: string | null;
};

export type CharactersResult = {
  characters: {
    info: PageInfo;
    results: Characters;
  }
};

export type CharacterResult = {
  character: Character
}
