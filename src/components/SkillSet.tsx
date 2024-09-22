const skills = ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'];

const SkillSet = () => (
  <div className="grid  gap-4">
    {skills.map((skill, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md text-center">
        {skill}
      </div>
    ))}
  </div>
);

export default SkillSet;
