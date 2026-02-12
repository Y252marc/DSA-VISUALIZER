import { notFound } from "next/navigation";
import { getAlgoById } from "@/lib/registry";
import MainLayout from "@/components/MainLayout";
import BlueprintSpec from "@/components/BlueprintSpec";
import InteractiveWorkspace from "@/components/InteractiveWorkspace";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function VisualizerPage({ params }: PageProps) {
    const { slug } = await params;
    const algo = getAlgoById(slug);

    if (!algo) {
        notFound();
    }

    return (
        <MainLayout>
            {algo.status === "active" ? (
                <InteractiveWorkspace algo={algo} />
            ) : (
                <BlueprintSpec algo={algo} />
            )}
        </MainLayout>
    );
}
