export const CATEGORY_LABELS: Record<string, string> = {
	practice: 'Practice',
	men: 'Men',
	neurodivergent: 'Neurodivergent',
	'life-and-career': 'Life & Career',
	grief: 'Grief',
};

// Canonical display order — callers filter this down to categories actually in use.
export const CATEGORY_ORDER = ['practice', 'men', 'neurodivergent', 'life-and-career', 'grief'];

// Mirrors the JOURNAL_TAGS list in content.config.ts — keep both in sync by
// hand when the tag vocabulary changes, same as CATEGORY_LABELS above does
// for `category`.
export const TAG_LABELS: Record<string, string> = {
	guide: 'Guide',
	'personal-reflection': 'Personal Reflection',
	explainer: 'Explainer',
	canberra: 'Canberra',
	'first-session': 'First Session',
	masking: 'Masking',
	boundaries: 'Boundaries',
	'grief-processing': 'Grief Processing',
};
