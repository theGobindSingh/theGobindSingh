declare module "gray-matter" {
  interface GrayMatterFile<T> {
    data: T;
    content: string;
  }

  function matter<T = Record<string, unknown>>(
    input: string,
  ): GrayMatterFile<T>;

  export default matter;
}
