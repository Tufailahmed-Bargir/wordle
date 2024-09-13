import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leaderboardData = [
  { rank: 1, name: "WordMaster", score: 2500 },
  { rank: 2, name: "LexiconLegend", score: 2350 },
  { rank: 3, name: "VocabViking", score: 2200 },
  { rank: 4, name: "SpellingSpecialist", score: 2100 },
  { rank: 5, name: "GrammarGuru", score: 2000 },
];

export default function Leaderboard() {
  return (
    <>
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Leaderboard</h2>
          <div className="max-w-3xl mx-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-medium">{player.rank}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">{player.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}
