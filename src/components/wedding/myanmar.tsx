const consonants = [
  ["က", "ka"],
  ["ခ", "kha"],
  ["ဂ", "ga"],
  ["ဃ", "gha"],
  ["င", "nga"],

  ["စ", "sa"],
  ["ဆ", "hsa"],
  ["ဇ", "za"],
  ["ဈ", "zha"],
  ["ည", "nya"],

  ["ဋ", "ta"],
  ["ဌ", "hta"],
  ["ဍ", "da"],
  ["ဎ", "dha"],
  ["ဏ", "na"],

  ["တ", "ta"],
  ["ထ", "hta"],
  ["ဒ", "da"],
  ["ဓ", "dha"],
  ["န", "na"],

  ["ပ", "pa"],
  ["ဖ", "pha"],
  ["ဗ", "ba"],
  ["ဘ", "bha"],
  ["မ", "ma"],

  ["ယ", "ya"],
  ["ရ", "ra"],
  ["လ", "la"],
  ["ဝ", "wa"],
  ["သ", "tha"],

  ["ဟ", "ha"],
  ["ဠ", "la"],
  ["အ", "a"],
];

const vowels = [
  ["အ", "a"],
  ["အာ", "ar"],
  ["ဣ", "i"],
  ["ဤ", "ii"],
  ["ဥ", "u"],
  ["ဦ", "uu"],
  ["ဧ", "e"],
  ["ဩ", "aw"],
  ["ဪ", "aw"],
];

const MyanmarAlphabetChart = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12 myanmar-paper-bg font-myanmar">
      {/* soft gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="luxury-card rounded-[2rem] px-4 py-10 sm:px-8 md:px-12">
          {/* Header */}
          <div className="text-center">
            <div className="mm-ornament-line mb-5">
              <span className="mm-ornament-dot" />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Myanmar Alphabet Reference
            </p>

            <h1 className="mm-title-main text-4xl sm:text-5xl md:text-6xl">
              မြန်မာအက္ခရာများ
            </h1>

            <p
              className="mx-auto mt-4 max-w-xl text-sm leading-7"
              style={{ color: "hsl(var(--brown-muted))" }}
            >
              မြန်မာစာလုံးများကို ရွှေရောင်မင်္ဂလာဖိတ်စာစတိုင်ဖြင့် ပြသထားသော
              reference chart ဖြစ်သည်။
            </p>

            <div className="gold-line mx-auto my-8 h-px w-64" />
          </div>

          {/* Consonants */}
          <div className="mb-8 text-center">
            <h2 className="inline-flex rounded-full bg-gold px-6 py-2 text-sm font-bold text-white shadow-lg">
              ဗျည်းအက္ခရာများ
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 md:grid-cols-8 lg:grid-cols-11">
            {consonants.map(([letter, sound]) => (
              <div
                key={letter}
                className="rounded-2xl border bg-white/40 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(184, 135, 36, 0.22)" }}
              >
                <div className="text-[2.1rem] font-bold leading-none text-gold text-shadow-gold sm:text-[2.6rem]">
                  {letter}
                </div>

                <div
                  className="mt-2 text-[11px] font-medium uppercase tracking-wide"
                  style={{ color: "hsl(var(--brown-muted))" }}
                >
                  {sound}
                </div>
              </div>
            ))}
          </div>

          <div className="gold-line mx-auto my-12 h-px w-72" />

          {/* Vowels */}
          <div className="mb-8 text-center">
            <h2 className="inline-flex rounded-full bg-gold px-6 py-2 text-sm font-bold text-white shadow-lg">
              သရအက္ခရာများ
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 md:grid-cols-9">
            {vowels.map(([letter, sound]) => (
              <div
                key={`${letter}-${sound}`}
                className="rounded-2xl border bg-white/40 p-3 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "rgba(184, 135, 36, 0.22)" }}
              >
                <div className="text-[2.1rem] font-bold leading-none text-gold text-shadow-gold sm:text-[2.6rem]">
                  {letter}
                </div>

                <div
                  className="mt-2 text-[11px] font-medium uppercase tracking-wide"
                  style={{ color: "hsl(var(--brown-muted))" }}
                >
                  {sound}
                </div>
              </div>
            ))}
          </div>

          {/* Footer ornament */}
          <div className="mt-12 text-center">
            <div className="mm-ornament-line">
              <span className="mm-ornament-dot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyanmarAlphabetChart;