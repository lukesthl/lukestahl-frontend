import { Metadata } from "next";
import { Container } from "../../components/layout/container";
import { translate } from "../../components/utils/translation";

export const metadata: Metadata = { title: translate("privacypolicy.title") };

export default async function PrivacyPolicy() {
	return (
		<Container className="mt-14 sm:mt-28">
			<div
				className="prose dark:prose-invert min-w-full"
				dangerouslySetInnerHTML={{ __html: translate("privacypolicy.description") }}
			/>
		</Container>
	);
}
