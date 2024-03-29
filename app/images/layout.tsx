import Image from "next/image";
import { Container } from "../../components/layout/container";
import { translate } from "../../components/utils/translation";
import MyCamera from "../../public/assets/20230425-DSCF1828.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Container className="mt-16 md:mt-32">
				<div className="grid gap-8 md:grid-cols-5 md:gap-24">
					<div className="col-span-3">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
							{translate("photos.title")}
						</h1>
						<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{translate("photos.description")}</p>
					</div>
					<div className="col-span-2">
						<div className="aspect-square w-full rotate-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
							<Image
								src={MyCamera}
								sizes="(min-width: 640px) 18rem, 11rem"
								alt="my camera"
								className="object-cover -translate-y-32"
								placeholder="blur"
								priority
							/>
						</div>
					</div>
				</div>
			</Container>
			<div className="mt-8">{children}</div>
		</>
	);
}
