import { useMemo } from 'react';
import jaroWinkler from '@/utils/jaroWinkler';

const useEditorMention = (feed: string[], transform: (a: string) => string) => {
	return useMemo(
		() => ({
			mention: {
				feeds: [
					{
						marker: '$',
						feed:
							feed && feed.length > 0
								? (searchedValue: string) =>
										feed
											?.map((placeholder) => ({
												id: `$${placeholder}`,
												text: `$${placeholder}`,
												similarity: jaroWinkler(searchedValue, placeholder),
											}))
											.sort((a, b) => b.similarity - a.similarity)
								: null,
						itemRenderer: ({ text }: { text: string }) => {
							const capitalizedText = transform(text.slice(1));
							const container = document.createElement('div');
							container.innerText = capitalizedText.toString();
							return container;
						},
						minimumCharacters: 0,
					},
				],
			},
		}),
		[feed],
	);
};

export default useEditorMention;
