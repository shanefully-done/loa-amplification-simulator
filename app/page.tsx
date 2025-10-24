import EnhancementSimulator from "../components/enhancement-simulator";

export default function Home({ params: { lng } }: { params: { lng: string } }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between sm:p-4 md:p-24">
			<EnhancementSimulator lng={lng} />
		</main>
	);
}
