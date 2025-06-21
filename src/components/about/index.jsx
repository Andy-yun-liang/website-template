import InfoCard from "../infocard";
import { MissionCard } from "../missioncard";

const missionStatements = [
  {
    heading: "Our Clients",
    text: "We exist to create real value — offering practical, forward-thinking solutions that help our clients reach their goals.",
  },
  {
    heading: "Our Team",
    text: "We support our people through mentorship, meaningful work, and fair compensation — because when they succeed, so does everything else.",
  },
  {
    heading: "Our Future",
    text: "We’re building something sustainable — evolving with intention, guided by leadership, strategy, and vision.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-zinc-300 text-mudgreen px-6 md:px-20 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16 uppercase tracking-widest">
          About Us
        </h1>

        <div className="space-y-16">
          <InfoCard title="What We Stand For">
            <p>
              We believe that great organizations are built on trust, purpose, and service.
              Whether we’re helping clients solve problems, supporting our team, or growing our business,
              we lead with integrity and always aim to make a lasting impact. Our work is rooted in empathy,
              accountability, and a deep commitment to excellence.
            </p>
          </InfoCard>

          <InfoCard title="How We Work">
            <p className="mb-4">
              True success is shaped by the small, consistent actions we take every day.
              We believe that mastery of the fundamentals — clear communication, thoughtful execution,
              and a strong work ethic — is what sets exceptional teams apart.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
              <li>Personal growth</li>
              <li>Professional excellence</li>
              <li>Collaborative success</li>
            </ul>
          </InfoCard>

          <InfoCard title="Mission Statement">
            <div className="space-y-6">
              {missionStatements.map(({ heading, text }) => (
                <MissionCard key={heading} heading={heading} text={text} />
              ))}
            </div>
          </InfoCard>
        </div>

        <div className="flex justify-center pt-20">
          <button className="px-6 py-3 rounded-2xl shadow-md border-mudgreen text-mudgreen border hover:bg-zinc-100 cursor-pointer">
            MEET OUR TEAM
          </button>
        </div>
      </div>
    </section>
  );
}
