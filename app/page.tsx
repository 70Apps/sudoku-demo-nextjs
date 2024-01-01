import Image from 'next/image'
import Puzzle from './game/Puzzle';

export default function Home() {
  

  return (
    <main className="container p-4">
      <Puzzle />
    </main>
  )
}
