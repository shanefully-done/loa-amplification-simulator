import EnhancementSimulator from "../components/enhancement-simulator";

export default async function Home({ params }: { params: Promise<{ lng: string }> }) {
	const { lng } = await params;
	return (
		<main className="flex min-h-screen flex-col items-center justify-between sm:p-4 md:p-24">
			<EnhancementSimulator lng={lng} />
		</main>
	);
}
