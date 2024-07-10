"use client";
import { Route } from "next";
import { useRouter } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/shadcn/select";
import { translate } from "../utils/translation";

export const SortSelection = ({ value }: { value: string }) => {
	const router = useRouter();
	return (
		<Select value={value} onValueChange={value => router.push(`/images/${value}` as Route)}>
			<SelectTrigger className="w-44 shadow-lg shadow-gray-800/5 ">
				<SelectValue placeholder={translate(`photos.sorter.label`)} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{translate(`photos.sorter.label`)}</SelectLabel>
					{["new", "old"].map(option => (
						<SelectItem className="cursor-pointer" value={option} key={option}>
							{translate(`photos.sorter.${option}`)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
