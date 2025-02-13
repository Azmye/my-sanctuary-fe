import { Journals } from "~/shared/data/journals";

export default defineEventHandler((event) => {
  const { uuid } = getRouterParams(event);

  const journal = Journals.find((journal) => journal.uuid === uuid);

  if (journal) {
    return journal;
  }

  return null;
});
