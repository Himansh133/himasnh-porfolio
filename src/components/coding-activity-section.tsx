import { getActivity } from "@/lib/activity";
import { ActivityHeatmap } from "@/components/activity-heatmap";

export async function CodingActivitySection() {
  const data = await getActivity();
  return <ActivityHeatmap data={data} />;
}
