import Image from 'next/image'
import Puzzle from './game/Puzzle';

export default function Home() {
  

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container p-2">
      <Puzzle />
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://github.com/qiayue/sudoku-classroom"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            数独教室{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          哥飞发起的一次免费前端训练营，题目是实现一个能够讲解数独解法的网页小工具。
            https://github.com/qiayue/sudoku-classroom
          </p>
        </a>

        <a
          href="https://devshots.app/?sudoku-demo"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            极客晒图{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          我开发的一个分享图片在线小工具：https://devshots.app/
          </p>
        </a>

        <a
          href="https://70apps.com/?sudoku-demo"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            我的博客{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            https://70apps.com/
          </p>
        </a>

        <a
          href="https://70apps.com/blog/app/?sudoku-demo"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            手机应用{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          已经上架的几款小应用、小游戏：https://70apps.com/blog/app/
          </p>
        </a>
      </div>
    </main>
  )
}
