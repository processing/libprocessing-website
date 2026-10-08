import type { MdastPluginDefinition } from 'satteri';

export const CALLOUT_KINDS = {
  note: 'Note',
  tip: 'Tip',
  caution: 'Caution',
  todo: 'To write',
} as const;

type CalloutKind = keyof typeof CALLOUT_KINDS;

const isCalloutKind = (name: string): name is CalloutKind =>
  name in CALLOUT_KINDS;

export function callouts(): MdastPluginDefinition {
  return {
    name: 'callouts',
    containerDirective(node, ctx) {
      if (!isCalloutKind(node.name)) return;
      const [first, ...rest] = node.children;
      // A `:::note[Custom title]` label arrives as a leading flagged paragraph.
      const hasLabel =
        first?.type === 'paragraph' && first.data?.directiveLabel === true;
      const title = hasLabel
        ? ctx.textContent(first)
        : CALLOUT_KINDS[node.name];
      ctx.replaceNode(node, {
        type: 'blockquote',
        data: {
          hName: 'aside',
          hProperties: { className: ['callout'], dataKind: node.name },
        },
        children: [
          {
            type: 'paragraph',
            data: { hProperties: { className: ['callout-title'] } },
            children: [{ type: 'text', value: title }],
          },
          ...(hasLabel ? rest : node.children),
        ],
      });
    },
  };
}
