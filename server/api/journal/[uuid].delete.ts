import { Journals } from "~/shared/data/journals";

export default defineEventHandler(async (event) => {
  const { uuid } = getRouterParams(event);

  const index = Journals.findIndex((journal) => journal.uuid === uuid);

  if (index !== -1) {
    Journals.splice(index, 1);
    return {
      message: "Data successfully deleted",
    };
  }

  throw createError({
    statusCode: 404,
    statusMessage: "Data not found!",
  });
});
