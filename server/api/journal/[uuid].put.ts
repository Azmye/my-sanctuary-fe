import { Journals } from "~/shared/data/journals";

export default defineEventHandler(async (event) => {
  const { uuid } = getRouterParams(event);

  const body = await readBody(event);

  const journal = Journals.find((journal) => journal.uuid === uuid);

  if (journal) {
    Object.assign(journal, {
      ...body,
      updatedAt: new Date(),
    });

    return {
      message: "Journal updated successfully",
      journal,
    };
  }

  throw createError({
    statusCode: 404,
    statusMessage: "Journal not found",
  });
});
