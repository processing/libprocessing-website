import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site.ts';

export type Doc = CollectionEntry<'docs'>;

export interface NavPage {
  href: string;
  label: string;
  entry: Doc;
}

export interface NavSection extends NavPage {
  pages: NavPage[];
}

const byOrder = (a: Doc, b: Doc) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export const slugOf = (entry: Doc) => entry.id.replace(/(^|\/)index$/, '');

export const hrefOf = (entry: Doc) => {
  const slug = slugOf(entry);
  return slug ? `/${slug}/` : '/';
};

const toNavPage = (entry: Doc): NavPage => ({
  href: hrefOf(entry),
  label: entry.data.navLabel ?? entry.data.title,
  entry,
});

export const editUrlOf = (entry: Doc) =>
  `${site.editBaseUrl}docs/${entry.filePath?.replace(/^src\/content\/docs\//, '')}`;

/**
 * A section is a top-level folder in src/content/docs. Its index.md is the
 * section landing page; every other .md file in the folder is a page within it.
 */
export async function getNavigation(): Promise<NavSection[]> {
  const docs = await getCollection('docs');
  const sectionIndexes = docs
    .filter((entry) => {
      const slug = slugOf(entry);
      return slug !== '' && !slug.includes('/');
    })
    .sort(byOrder);

  return sectionIndexes.map((index) => {
    const prefix = `${slugOf(index)}/`;
    const pages = docs
      .filter((entry) => slugOf(entry).startsWith(prefix))
      .sort(byOrder)
      .map(toNavPage);
    return { ...toNavPage(index), pages };
  });
}

export function flattenNavigation(sections: NavSection[]): NavPage[] {
  return sections.flatMap(({ pages, ...section }) => [section, ...pages]);
}

export function sectionOf(sections: NavSection[], entry: Doc) {
  const top = slugOf(entry).split('/')[0];
  return sections.find((section) => slugOf(section.entry) === top);
}
