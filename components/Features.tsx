import { Gamepad2, Trophy, Users } from "lucide-react";

export default function Features() {
  return (
    <>
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Game Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Gamepad2 className="w-12 h-12 text-green-400" />}
              title="Endless Practice"
              description="Hone your skills with unlimited rounds of word-guessing fun"
            />
            <FeatureCard
              icon={<Trophy className="w-12 h-12 text-yellow-400" />}
              title="Track Progress"
              description="Monitor your improvement and aim for the perfect score"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-400" />}
              title="Challenge Friends"
              description="Compete with friends and climb the leaderboard"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
