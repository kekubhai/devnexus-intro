import ProjectCard from '../../components/ProjectCard';

const projects = [
  { title: 'Portfolio Website', description: 'A modern portfolio built with Next.js and Tailwind.', link: '#' },
  { title: 'E-commerce App', description: 'A full-stack app with Stripe integration.', link: '#' }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
