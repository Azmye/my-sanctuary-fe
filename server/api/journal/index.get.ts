import { Journals } from "~/shared/data/journals";

export default defineEventHandler((event) => {
  const journals = Journals.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return journals;
});
