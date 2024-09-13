import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Practice Wordle. All rights
            reserved.
          </p>
          <div className="mt-4">
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
