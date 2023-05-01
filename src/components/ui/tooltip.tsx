"use client";
import dynamic from "next/dynamic";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TooltipDynamic = dynamic(() => import("react-tooltip").then(mod => mod.Tooltip), { ssr: false });

export const Tooltip = (props: React.ComponentProps<typeof ReactTooltip>) => <TooltipDynamic {...props} />;
