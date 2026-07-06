import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journal = defineCollection({
	// Load Markdown and MDX files in the `src/content/journal/` directory.
	loader: glob({ base: './src/content/journal', pattern: '**/*.{md,mdx}' }),
	// title, description, date, category, and articleType are required. draft,
	// references, and substackUrl are optional — draft defaults to false
	// (set draft: true to keep an entry off the live site); references and
	// substackUrl simply don't render their associated UI when omitted.
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		category: z.enum(['practice', 'men', 'neurodivergent', 'life-and-career', 'grief']),
		articleType: z.enum(['response', 'research']),
		references: z
			.array(
				z.object({
					label: z.string(),
					url: z.string().url().optional(),
				}),
			)
			.optional(),
		substackUrl: z.string().url().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = { journal };
