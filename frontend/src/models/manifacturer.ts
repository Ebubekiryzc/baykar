export interface Manifacturer {
  id: number;
  name: string;
  fullname: string;
  slug: string;
  parent: Manifacturer;
  childrens: Array<Manifacturer>;
}
