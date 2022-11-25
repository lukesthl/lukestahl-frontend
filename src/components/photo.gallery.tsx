"use client";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Container } from "./container";
import { imagesDarkMode, imagesWhiteMode } from "./photos";
import { translate } from "./translation";
import Image from "next/image";
import clsx from "clsx";

type SortSelection = "newest" | "oldest";

const options: { key: number; name: SortSelection }[] = [
	{
		key: 1,
		name: "newest",
	},
	{
		key: 2,
		name: "oldest",
	},
];

const shuffle = <T,>(a: T[]) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

const allImages = imagesWhiteMode.concat(imagesDarkMode);

export const PhotoGallery = () => {
	const [selectedSorter, setSelectedSorter] = useState<SortSelection>("newest");
	const [images, setImages] = useState<typeof imagesWhiteMode>(allImages);
	return (
		<div>
			<Container>
				<div className="w-44">
					<Listbox
						value={selectedSorter}
						onChange={value => {
							setImages(shuffle(allImages));
							setSelectedSorter(value);
						}}
					>
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
								<span className="block truncate">{translate(`photos.sorter.${selectedSorter}`)}</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{options.map(option => (
										<Listbox.Option
											key={option.key}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? "bg-amber-100 text-amber-900" : "text-gray-900"
												}`
											}
											value={option.name}
										>
											{({ selected }) => (
												<>
													<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
														{translate(`photos.sorter.${option.name}`)}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
			<div className="2xl:max-w-8xl relative mx-4 mt-8 grid grid-cols-2 gap-5 sm:gap-6 md:mx-16 md:grid-cols-5">
				{images.map((image, imageIndex) => (
					<div
						key={imageIndex}
						className={clsx(
							"relative aspect-[9/10] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
						)}
					>
						<Image src={image.src} alt={image.alt} fill className="object-cover" />
					</div>
				))}
			</div>
		</div>
	);
};
