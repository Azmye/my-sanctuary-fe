export const Journals: Journal[] = [
  {
    uuid: crypto.randomUUID(),
    title: "Learning VueJs & NuxtJs",
    body: "Things that I have learned are Pages Structure, CSR & SSR, and middleware.",
    updatedAt: new Date(),
    tags: ["dev", "learning"],
    createdAt: new Date(),
  },
  {
    uuid: crypto.randomUUID(),
    title: "Advanced VueJs & NuxtJs",
    body: "Exploring advanced topics like state management, plugins, and performance optimization.",
    updatedAt: new Date(),
    tags: ["dev", "advanced"],
    createdAt: new Date(),
  },
  {
    uuid: crypto.randomUUID(),
    title: "Building REST APIs with Node.js",
    body: "Learned how to create RESTful APIs using Express.js and MongoDB.",
    updatedAt: new Date(),
    tags: ["dev", "backend"],
    createdAt: new Date(),
  },
];
