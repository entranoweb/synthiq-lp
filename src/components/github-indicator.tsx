import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function GithubIndicator() {
    return (
        <Link
            href={"https://github.com/MrInspection/ia-startup-landing-page"}
            target={"_blank"}
            aria-label="Visit GitHub Repository"
            className={
                "fixed bottom-6 right-6 z-50 size-12 border border-muted flex items-center justify-center rounded-full bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] hover:shadow-[0px_0px_18px_#8c45ff] transition"
            }
        >
            <GitHubLogoIcon className={"size-6 text-white"} />
        </Link>
    );
}
