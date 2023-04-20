"use client";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { IImage } from "../../services/image.service";
import { Container } from "../layout/container";
import { translate } from "../utils/translation";

type SortSelection = "newest" | "oldest";

const options: {
	key: number;
	name: SortSelection;
	icon: (props: React.ComponentProps<typeof ChevronDownIcon>) => JSX.Element;
	onSelect: (images: IImage[]) => IImage[];
}[] = [
	{
		key: 1,
		name: "newest",
		icon: props => <ChevronDownIcon {...props} />,
		onSelect: (images: IImage[]) => {
			const sorted = images.sort(
				(imageA, imageB) =>
					new Date(imageB.exifData?.DateTimeOriginal || 0).getTime() -
					new Date(imageA.exifData?.DateTimeOriginal || 0).getTime()
			);
			return sorted;
		},
	},
	{
		key: 2,
		name: "oldest",
		icon: props => <ChevronUpIcon {...props} />,
		onSelect: (images: IImage[]) => {
			const sorted = images.sort(
				(imageA, imageB) =>
					new Date(imageA.exifData?.DateTimeOriginal || 0).getTime() -
					new Date(imageB.exifData?.DateTimeOriginal || 0).getTime()
			);
			return sorted;
		},
	},
];

const shuffle = <T,>(a: T[]) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

export const ImageGallery = ({ images: allImages }: { images: IImage[] }) => {
	const [selectedSortingOption, setSelectedSortingOption] = useState(options[0]);
	const [images, setImages] = useState(allImages);

	useEffect(() => {
		const newImages = selectedSortingOption.onSelect(allImages);
		setImages([...newImages]);
	}, [allImages, selectedSortingOption]);

	return (
		<div>
			<Container>
				<div className="w-44">
					<Listbox
						value={selectedSortingOption}
						onChange={value => {
							setImages(value.onSelect(images));
							setSelectedSortingOption(value);
						}}
					>
						<div className="relative mt-1">
							<Listbox.Button className="text-zinc800 relative flex w-full cursor-default rounded-lg bg-white/90 bg-white px-3 py-2 pl-3 pr-10 text-left text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur focus:outline-none focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-300 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 sm:text-sm">
								<span className="block truncate">{translate(`photos.sorter.${selectedSortingOption.name}`)}</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									{selectedSortingOption.icon({
										className: "h-5 w-5 text-gray-400",
										"aria-hidden": "true",
									})}
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-zinc-200 dark:ring-white/10 sm:text-sm">
									{options.map(option => (
										<Listbox.Option
											key={option.key}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active
														? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-200"
														: "text-gray-900 dark:text-zinc-200"
												}`
											}
											value={option}
										>
											{({ selected }) => (
												<>
													<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
														{translate(`photos.sorter.${option.name}`)}
													</span>
													{selected ? (
														<span className="text-primary absolute inset-y-0 left-0 flex items-center pl-3">
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>
			</Container>
			<div className="2xl:max-w-8xl relative mx-4 mt-8 grid grid-cols-2 gap-5 sm:gap-6 md:mx-12 md:grid-cols-5">
				{images.map((image, imageIndex) => (
					<div
						key={imageIndex}
						className={clsx(
							"relative aspect-[9/10] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
						)}
					>
						<Image
							src={image.url}
							blurDataURL={image.blurUrl}
							placeholder="blur"
							alt={"todo"}
							quality={30}
							sizes="(min-width: 640px) 18rem, 11rem"
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};
