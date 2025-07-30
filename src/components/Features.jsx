import Tilt from 'react-parallax-tilt';

const features = [
  {
    title: 'RBAC Enforcement',
    description: 'Users can only access tables and columns allowed by their roles.',
  },
  {
    title: 'SSN Protection',
    description: 'No user can read SSNs—even with valid roles. Enforced at all layers.',
  },
  {
    title: 'Natural Language to SQL',
    description: 'Translate queries like "Show user list" into role-aware SQL queries.',
  },
  {
    title: 'Role Simulation',
    description: 'Preview data as if you were a different role. Great for testing.',
  },
];

function Features() {
  return (
    <div className="py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {features.map((feat, i) => (
        <Tilt
          key={i}
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 transition duration-300 hover:scale-105"
        >
          <h2 className="text-xl font-bold mb-2 text-white">{feat.title}</h2>
          <p className="text-blue-100">{feat.description}</p>
        </Tilt>
      ))}
    </div>
  );
}

export default Features;
