export const CATEGORY_LABELS: Record<string, string> = {
	practice: 'Practice',
	men: 'Men',
	neurodivergent: 'Neurodivergent',
	'life-and-career': 'Life & Career',
	grief: 'Grief',
};

// Canonical display order — callers filter this down to categories actually in use.
export const CATEGORY_ORDER = ['practice', 'men', 'neurodivergent', 'life-and-career', 'grief'];

export const TYPE_LABELS: Record<string, string> = {
	response: 'Response',
	research: 'Research',
};
