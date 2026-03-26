import { forwardRef } from "react";

interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
}

interface ResumePreviewProps {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experiences: Experience[];
  educations: Education[];
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ name, email, phone, summary, skills, experiences, educations }, ref) => (
    <div ref={ref} className="space-y-4 bg-background p-6">
      <div className="text-center border-b border-border/50 pb-4">
        <h2 className="text-xl font-bold">{name || "Your Name"}</h2>
        <p className="text-sm text-muted-foreground">
          {[email, phone].filter(Boolean).join(" • ") || "email@example.com • (555) 000-0000"}
        </p>
      </div>
      {summary && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Summary</h3>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      )}
      {experiences.some((e) => e.title) && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Experience</h3>
          {experiences.filter((e) => e.title).map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{exp.title}</p>
                <p className="text-xs text-muted-foreground">{exp.duration}</p>
              </div>
              <p className="text-xs text-muted-foreground">{exp.company}</p>
              {exp.description && <p className="text-xs mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      {educations.some((e) => e.degree) && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Education</h3>
          {educations.filter((e) => e.degree).map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="text-sm font-medium">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.school} • {edu.year}</p>
            </div>
          ))}
        </div>
      )}
      {skills && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.split(",").map((s, i) => s.trim() && (
              <span key={i} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{s.trim()}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
export type { Experience, Education };
