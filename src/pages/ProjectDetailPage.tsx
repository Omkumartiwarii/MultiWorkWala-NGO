import { useParams } from "react-router-dom";
import { AsyncDetail } from "@/components/common/AsyncDetail";
import { useAsync } from "@/hooks/useAsync";
import { projectService } from "@/services/projectService";
import { ProjectDetail } from "@/sections/projects/ProjectDetail";

export default function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const state = useAsync(() => projectService.getBySlug(slug), [slug]);

  return (
    <AsyncDetail state={state} loadingLabel="Loading project…">
      {(project) => <ProjectDetail project={project} />}
    </AsyncDetail>
  );
}
