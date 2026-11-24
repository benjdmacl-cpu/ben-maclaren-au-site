export type Audience = 'Individuals' | 'Organisations';

export interface Workshop {
	slug: string;
	title: string;
	audience: Audience[];
	intro: string;
	description: string;
}

export const WORKSHOPS: Workshop[] = [
	{
		slug: 'mental-health-first-aid',
		title: 'Mental Health First Aid',
		audience: ['Organisations'],
		intro: 'An accredited course teaching people how to recognise and respond to mental health crises.',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		slug: 'rhythm2recovery',
		title: 'Rhythm2Recovery',
		audience: ['Individuals', 'Organisations'],
		intro: 'A rhythm and drumming-based group program supporting recovery and connection.',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		slug: 'mindfulness-based-stress-reduction',
		title: 'Mindfulness-Based Stress Reduction',
		audience: ['Individuals'],
		intro: 'An evidence-based program for managing stress, pain, and illness through mindfulness.',
		description:
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},
	{
		slug: 'designing-your-life',
		title: 'Designing Your Life',
		audience: ['Individuals'],
		intro: 'A practical workshop applying design thinking to building a life and career that fits.',
		description:
			'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
	},
	{
		slug: 'the-healthy-executive',
		title: 'The Healthy Executive',
		audience: ['Organisations'],
		intro:
			'A workshop for leaders on sustaining performance without burning out, setting boundaries, and creating healthy leadership.',
		description:
			"We also look at the quality of information executives are receiving, the importance of open time, and the traps they can fall into.",
	},
	{
		slug: 'custom-workshops',
		title: 'Custom Workshops',
		audience: ['Individuals', 'Organisations'],
		intro: "Don't see what you're after? Workshops tailored to your team or group's specific needs.",
		description:
			"I've designed workshops for Case Study Club, the Department of Education/Employment, and CASA.",
	},
];
