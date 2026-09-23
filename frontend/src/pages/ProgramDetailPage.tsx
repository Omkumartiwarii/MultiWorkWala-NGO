import { useParams } from "react-router-dom";
import { AsyncDetail } from "@/components/common/AsyncDetail";
import { useAsync } from "@/hooks/useAsync";
import { programService } from "@/services/programService";
import { ProgramDetail } from "@/sections/programs/ProgramDetail";

export default function ProgramDetailPage() {
  const { slug = "" } = useParams();
  const state = useAsync(() => programService.getBySlug(slug), [slug]);

  return (
    <AsyncDetail state={state} loadingLabel="Loading program…">
      {(program) => <ProgramDetail program={program} />}
    </AsyncDetail>
  );
}
