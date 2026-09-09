export function HeroArt() {
  return (
    <div className="hero-art hero-brand-art" aria-hidden="true">
      <div className="portal-halo" />
      <div className="portal-tilt">
        <svg
          className="portal-sculpture portal-backdrop"
          viewBox="0 0 800 800"
          fill="none"
        >
          <defs>
            <linearGradient
              id="portal-gold"
              x1="90"
              y1="80"
              x2="650"
              y2="690"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff2c2" />
              <stop offset=".24" stopColor="#e99930" />
              <stop offset=".48" stopColor="#6d300c" />
              <stop offset=".69" stopColor="#ffbf56" />
              <stop offset=".86" stopColor="#bc691e" />
              <stop offset="1" stopColor="#ffe0a0" />
            </linearGradient>
            <linearGradient
              id="portal-edge"
              x1="200"
              y1="100"
              x2="610"
              y2="620"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff4d0" />
              <stop offset=".4" stopColor="#fda943" />
              <stop offset=".7" stopColor="#8c4112" />
              <stop offset="1" stopColor="#ffd795" />
            </linearGradient>
          </defs>
          <g transform="rotate(-28 400 400)">
            {Array.from({ length: 38 }, (_, index) => {
              const offset = index * 2.4;
              return (
                <ellipse
                  key={index}
                  cx={344 + offset}
                  cy={337 + offset * 0.78}
                  rx={235 - index * 1.2}
                  ry={284 - index * 1.4}
                  stroke="url(#portal-gold)"
                  strokeWidth="9"
                />
              );
            })}
            <ellipse
              cx="432.8"
              cy="406.26"
              rx="190.6"
              ry="232.2"
              stroke="url(#portal-edge)"
              strokeWidth="3"
            />
          </g>
        </svg>
        <div className="brand-assembly">
          {[
            "M149 37 Q134 37 135 59 Q142 131 164 195 C177 137 219 79 270 57 Q202 40 149 37Z",
            "M270 57 C321 68 358 80 374 96 Q386 108 374 126 L363 137 C288 118 213 165 172 231 L164 195 C177 137 219 79 270 57Z",
            "M172 231 C213 165 288 118 363 137 L213 277 Q199 290 190 275 Q180 256 172 231Z",
          ].map((path, index) => (
            <div className={`brand-fragment fragment-${index}`} key={path}>
              <svg viewBox="128 32 270 270">
                <defs>
                  <clipPath id={`brand-piece-${index}`}>
                    <path d={path} />
                  </clipPath>
                </defs>
                <image
                  href="/images/official/player-emblem-source.webp"
                  width="512"
                  height="512"
                  clipPath={`url(#brand-piece-${index})`}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <span className="portal-shadow" />
    </div>
  );
}
