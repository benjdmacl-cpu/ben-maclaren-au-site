import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared by journal and resources — both cite sources the same way.
const referenceSchema = z.array(
	z.object({
		label: z.string(),
		url: z.string().url().optional(),
	}),
);

const journal = defineCollection({
	// Load Markdown and MDX files in the `src/content/journal/` directory.
	loader: glob({ base: './src/content/journal', pattern: '**/*.{md,mdx}' }),
	// title, description, date, and articleType are required. category is
	// optional — guides don't fit the response/research category taxonomy,
	// so they're left uncategorised; response/research pieces should still
	// always set one by convention. icon is only used by guide-type entries
	// (for their tile on the Journal index). draft, references, and
	// substackUrl are optional — draft defaults to false (set draft: true to
	// keep an entry off the live site); references and substackUrl simply
	// don't render their associated UI when omitted.
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		category: z.enum(['practice', 'men', 'neurodivergent', 'life-and-career', 'grief']).optional(),
		articleType: z.enum(['response', 'research', 'guide']),
		icon: z.string().optional(), // Tabler outline icon slug — guide-type entries only, see ResourceIcon.astro
		references: referenceSchema.optional(),
		substackUrl: z.string().url().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

const resources = defineCollection({
	// Load Markdown files in the `src/content/resources/` directory.
	loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		segment: z.enum(['act-therapy', 'mindfulness', 'relationships', 'life-design']),
		intro: z.string(),

		// An array so a resource can be interactive, worksheet, or both.
		interactionType: z.array(z.enum(['interactive', 'worksheet'])).min(1),

		// Interactive resources: which embedded component renders in the hero.
		componentSlug: z.string().optional(),

		// Worksheet resources: the downloadable file + its display meta.
		downloadUrl: z.string().url().optional(),
		downloadMeta: z.string().optional(), // e.g. "1 page · PDF"

		// Instructions — omitted entirely if neither field below is set.
		instructionsLabel: z.string().default('How to use this'),
		steps: z
			.array(
				z.object({
					title: z.string(),
					body: z.string().optional(),
				}),
			)
			.optional(), // if present → numbered-steps format
		instructionsProse: z.string().optional(), // if present instead → prose format

		references: referenceSchema.optional(),

		icon: z.string(), // Tabler outline icon slug, e.g. "compass" — see ResourceIcon.astro
		featured: z.boolean().optional(), // marks the one live/embedded card per segment
	}),
});

const faqs = defineCollection({
	// Load Markdown files in the `src/content/faqs/` directory.
	loader: glob({ base: './src/content/faqs', pattern: '**/*.md' }),
	schema: z.object({
		question: z.string(),
		answer: z.string(),
		order: z.number().optional(),
	}),
});

export const collections = { journal, resources, faqs };
