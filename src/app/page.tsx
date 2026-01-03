export default function Home() {
  return (
    <main className="p-10 space-y-4 bg-bg">
      <h1 className="text-h1 text-main">
        Heading 1 (48px / 700)
      </h1>

      <h2 className="text-h2 text-main">
        Heading 2 (36px / 700)
      </h2>

      <p className="text-body text-sub2">
        Body 텍스트입니다 (16px / 500, sub2 컬러)
      </p>

      <p className="text-caption text-sub3">
        Caption 텍스트입니다 (12px / 500, sub3 컬러)
      </p>

      <button className="mt-4 px-4 py-2 bg-primary text-inverse rounded">
        Primary Button
      </button>
    </main>
  );
}
