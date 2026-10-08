import { getCollection, type CollectionEntry } from 'astro:content';

export type Example = CollectionEntry<'examples'>;

// Display order for the gallery. Groups not listed here sort after these, alphabetically.
export const exampleCategories = {
  basics: {
    title: 'Basics',
    description: 'Ported from processing4.',
    groups: ['Form', 'Shape', 'Color', 'Transform', 'Typography', 'Image', 'Input', 'Camera', 'Lights', 'Math', 'Data', 'Arrays', 'Objects', 'Control', 'Structure', 'Web'],
  },
  topics: {
    title: 'Topics',
    description: 'Ported from processing4.',
    groups: ['Animation', 'Motion', 'Vectors', 'Simulate', 'Cellular Automata', 'Fractals and L-Systems', 'Curves', 'Geometry', 'Create Shapes', 'Drawing', 'Textures', 'Image Processing', 'Shaders', 'Interaction', 'GUI', 'File IO', 'Advanced Data'],
  },
  demos: {
    title: 'Demos',
    description: 'Ported from processing4.',
    groups: ['Graphics', 'Performance'],
  },
  features: {
    title: 'libprocessing features',
    description: 'Things beyond classic Processing.',
    groups: ['Shapes, Transforms & Images', 'Particles & GPU Compute', 'Flocking & Simulation', 'Materials, Lighting & PBR', 'Filters, Blend Modes & Feedback', 'Custom Shaders & Attributes', 'Text', 'Input & Devices', 'Windows'],
  },
} as const;

export type ExampleCategory = keyof typeof exampleCategories;

export const exampleCategoryIds = Object.keys(exampleCategories) as [
  ExampleCategory,
  ...ExampleCategory[],
];

export async function getExampleGallery() {
  const examples = await getCollection('examples');

  return exampleCategoryIds
    .map((id) => {
      const category = exampleCategories[id];
      const inCategory = examples.filter((e) => e.data.category === id);
      const known: readonly string[] = category.groups;
      const rank = (group: string) =>
        known.includes(group) ? known.indexOf(group) : known.length;
      const groupNames = [...new Set(inCategory.map((e) => e.data.group))].sort(
        (a, b) => rank(a) - rank(b) || a.localeCompare(b),
      );
      return {
        id,
        title: category.title,
        description: category.description,
        groups: groupNames.map((name) => ({
          name,
          examples: inCategory
            .filter((e) => e.data.group === name)
            .sort(
              (a, b) =>
                a.data.order - b.data.order ||
                a.data.title.localeCompare(b.data.title),
            ),
        })),
      };
    })
    .filter((category) => category.groups.length > 0);
}

export const exampleHref = (example: Example) => `/examples/${example.id}/`;
