import { Journals } from "~/shared/data/journals";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const { title, body, tags } = data;

  const uuid = crypto.randomUUID();

  const newJournal: Journal = {
    uuid,
    title,
    body,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  Journals.push(newJournal);

  return {
    message: "Data successfully created",
  };
});
