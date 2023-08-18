import { defineCollection, z } from "astro:content";

import { ui } from "@i18n/ui";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
  }),
});

const syndication = z.object({
  platform: z.enum(["instagram"]),
  url: z.string().url(),
});

const hashtag = z
  .string()
  .startsWith("#")
  .refine((tag) => !tag.includes(" "));

const mention = z.object({
  handle: z.string().startsWith("@"),
  url: z.string().url(),
});

const languages = Object.keys(ui) as [string, ...string[]];

const description = z.object({
  language: z.enum(languages),
  value: z.string(),
});

const photosCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      syndications: z.array(syndication).optional(),
      descriptions: z.array(description).optional(),
      hashtags: z.array(hashtag).optional(),
      mentions: z.array(mention).optional(),
      images: z.array(
        z
          .object({
            url: image(),
            alt: z.string().optional(),
          })
          .required()
      ),
    }),
});

export const collections = {
  blog: blogCollection,
  photos: photosCollection,
};
