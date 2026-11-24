export const SEGMENTS = ['Public', 'For organisations', 'Individuals'] as const;

export type Segment = (typeof SEGMENTS)[number];

export interface Workshop {
	slug: string;
	title: string;
	segment: Segment;
	intro: string;
	description: string;
}

export const WORKSHOPS: Workshop[] = [
	{
		slug: 'lorem-ipsum-dolor-sit-amet',
		title: 'Lorem ipsum dolor sit amet',
		segment: 'Public',
		intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		description:
			'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		slug: 'consectetur-adipiscing-elit',
		title: 'Consectetur adipiscing elit',
		segment: 'Public',
		intro: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		description:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		slug: 'mental-health-first-aid',
		title: 'Mental Health First Aid',
		segment: 'For organisations',
		intro: 'An accredited course teaching staff how to recognise and respond to mental health crises.',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		slug: 'duis-aute-irure-dolor',
		title: 'Duis aute irure dolor in reprehenderit',
		segment: 'For organisations',
		intro: 'In voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		description:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		slug: 'sed-ut-perspiciatis',
		title: 'Sed ut perspiciatis unde omnis',
		segment: 'Individuals',
		intro: 'Iste natus error sit voluptatem accusantium doloremque laudantium.',
		description:
			'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},
	{
		slug: 'nemo-enim-ipsam',
		title: 'Nemo enim ipsam voluptatem',
		segment: 'Individuals',
		intro: 'Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.',
		description:
			'Qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
	},
];
