import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// Keep the default `multilingual` mode: the content is mostly Chinese, and it
// segments CJK text. Setting `language: 'english'` here would break that.
export const { staticGET: GET } = createFromSource(source);
