# Adding a VITRUS article

Posts live in `app/insights/content.ts`.

1. Copy one complete post object inside the `insights` array.
2. Give it a short, unique `slug` using lowercase words separated by hyphens.
3. Write a search-friendly `title` and a specific `description`.
4. Set `publishedAt` in `YYYY-MM-DD` format.
5. Add the opening, article sections, optional point lists, and closing.
6. Keep claims accurate, concrete, and useful to an enterprise reader.

The Articles index, individual article page, canonical metadata, Article structured data, sitemap, and RSS feed are generated from this single entry.

Before publishing, run the project tests. They verify that every article renders, includes its search metadata, and contains no em dashes.
