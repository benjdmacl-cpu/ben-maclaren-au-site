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

// Curated, not freeform — same philosophy as `category` below: extend this
// list deliberately when a new tag is genuinely needed, rather than letting
// posts accumulate one-off tag strings that make the hub's filter bar
// unusable. `guide` and `canberra` are load-bearing (see journal/index.astro
// — `guide` decides the icon-tile grid, `canberra` is just a filterable/
// displayed tag with no structural effect). The rest are examples to extend
// from, not an exhaustive taxonomy.
const JOURNAL_TAGS = [
	// Format
	'guide',
	'personal-reflection',
	'explainer',
	// Locality
	'canberra',
	// Topic (starter set — add more here as real posts need them)
	'first-session',
	'masking',
	'boundaries',
	'grief-processing',
] as const;

const journal = defineCollection({
	// Load Markdown and MDX files in the `src/content/journal/` directory.
	loader: glob({ base: './src/content/journal', pattern: '**/*.{md,mdx}' }),
	// title, description, and date are required. category is optional —
	// guide-tagged posts don't fit the taxonomy, so they're left
	// uncategorised; everything else should still set one by convention.
	// icon is only used by guide-tagged entries (for their tile on the
	// Journal index). tags replaces the old articleType/local pair: the
	// `guide` tag is what routes a post to the icon-tile grid instead of the
	// flat card grid, and `canberra` is what used to be the `local` boolean
	// — now just a filterable/displayed tag, not a separate structural
	// section. featured pins at most one post above the flat grid as a
	// deliberate "start here" recommendation — this is a convention, not a
	// constraint the schema enforces, so keep at most one `true` across the
	// collection by hand. draft, references, and substackUrl are optional —
	// draft defaults to false (set draft: true to keep an entry off the live
	// site, though nothing currently filters on it — see journal.md in the
	// styleguide); references and substackUrl simply don't render their
	// associated UI when omitted.
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		category: z.enum(['practice', 'men', 'neurodivergent', 'life-and-career', 'grief']).optional(),
		tags: z.array(z.enum(JOURNAL_TAGS)).optional().default([]),
		featured: z.boolean().optional().default(false),
		icon: z.string().optional(), // Tabler outline icon slug — guide-tagged entries only, see ResourceIcon.astro
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

const events = defineCollection({
	// Load Markdown files in the `src/content/events/` directory. endDate is
	// only needed for multi-day events — the homepage section falls back to
	// startDate when it's omitted. externalUrl is where the card's link
	// points (a third-party booking/event page, not an internal route).
	loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		description: z.string(),
		externalUrl: z.string().url(),
		linkLabel: z.string().optional().default('View event'),
	}),
});

export const collections = { journal, resources, faqs, events };
