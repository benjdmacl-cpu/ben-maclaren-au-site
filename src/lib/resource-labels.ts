// Fixed for now per the design brief — not an open-ended taxonomy. Segment
// `slug`s double as section `id`s on the index page, which is what a future
// anchor-scroll segment nav would target.
export const SEGMENTS = [
	{
		slug: 'act-therapy',
		label: 'ACT therapy',
		description: 'tools grounded in acceptance and commitment work',
	},
	{
		slug: 'mindfulness',
		label: 'Mindfulness',
		description: 'practices for slowing down and coming back to the present',
	},
	{
		slug: 'relationships',
		label: 'Relationships',
		description: 'tools for communication, conflict, and connection',
	},
	{
		slug: 'life-design',
		label: 'Life design',
		description: "reflection and planning for what's next",
	},
] as const;

export const SEGMENT_LABELS: Record<string, string> = Object.fromEntries(
	SEGMENTS.map((segment) => [segment.slug, segment.label]),
);

export const INTERACTION_LABELS: Record<string, string> = {
	interactive: 'Try it here',
	worksheet: 'Worksheet',
};

// A resource can be both types. Interactive takes display priority — it's
// also the hero priority (see ResourcePost.astro §5.1 in the design brief):
// the live element is always the main event when one exists.
export function primaryInteractionType(types: readonly string[]): 'interactive' | 'worksheet' {
	return types.includes('interactive') ? 'interactive' : 'worksheet';
}

export function primaryInteractionLabel(types: readonly string[]): string {
	return INTERACTION_LABELS[primaryInteractionType(types)];
}
