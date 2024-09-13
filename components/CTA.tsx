import Link from "next/link";
import { Button } from "./ui/button";

export default function CTA() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Test Your Word Mastery?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of players improving their vocabulary daily
          </p>
          <Link href='/wordle'>
          <Button className="bg-white text-purple-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
            Start Playing Now
          </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
