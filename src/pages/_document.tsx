import { vocabularyApplicationEmotionCache } from '@/utils/emotionCache';
import { ServerStyles, createStylesServer } from '@mantine/next';
import Document, { DocumentContext } from 'next/document';

const stylesServer = createStylesServer(vocabularyApplicationEmotionCache);

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [
				initialProps.styles,
				<ServerStyles
					html={initialProps.html}
					server={stylesServer}
					key='vocabulary-app-styles'
				/>,
			],
		};
	}
}
