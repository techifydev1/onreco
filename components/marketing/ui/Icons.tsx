// Inline icon set ported from onreco-redesign/app/assets.
// Strokes use currentColor so icons inherit their context's colour.
import { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  fill: 'none',
  'aria-hidden': true,
  ...props,
})

function S({
  size,
  viewBox,
  d,
  ...rest
}: P & { size: number; viewBox: string; d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      {...base(rest)}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowUpRight = (p: P) => (
  <S size={16} viewBox="0 0 16 16" d="M11.33 11.33V4.67H4.67M11.33 4.67 4.67 11.33" {...p} />
)

export const ArrowRight15 = (p: P) => (
  <S size={15} viewBox="0 0 15 15" d="M3.12 7.5h8.76M7.5 11.88 11.88 7.5 7.5 3.12" {...p} />
)

export const ArrowDownLeft24 = (p: P) => (
  <S size={24} viewBox="0 0 24 24" d="M17 7 7 17M7 7v10h10" {...p} />
)

export const ArrowDownLeft22 = (p: P) => (
  <S size={22} viewBox="0 0 22 22" d="M15.58 6.42 6.42 15.58M6.42 6.42v9.16h9.16" {...p} />
)

export const CheckCheck = (p: P) => (
  <S size={24} viewBox="0 0 24 24" d="M18 6 7 17l-5-5M22 10l-7.5 7.5L13 16" {...p} />
)

export const Check16 = (p: P) => (
  <S size={16} viewBox="0 0 16 16" d="M13.33 4 6 11.33 2.67 8" {...p} />
)

export const Check13 = (p: P) => (
  <S size={13} viewBox="0 0 13 13" d="M10.83 3.25 4.88 9.21 2.17 6.5" {...p} />
)

export const ChevronDown12 = (p: P) => (
  <S size={12} viewBox="0 0 12 12" d="M3 4.5 6 7.5 9 4.5" {...p} />
)

export const ChevronDown13 = (p: P) => (
  <S size={13} viewBox="0 0 13 13" d="M3.25 4.88 6.5 8.13 9.75 4.88" {...p} />
)

export const CircleCheck16 = (p: P) => (
  <S
    size={16}
    viewBox="0 0 16 16"
    d="M6 8l1.33 1.33L10 6.67M14.67 8A6.67 6.67 0 1 1 1.33 8a6.67 6.67 0 0 1 13.34 0Z"
    {...p}
  />
)

export const CircleCheck18 = (p: P) => (
  <S
    size={18}
    viewBox="0 0 18 18"
    d="M6.75 9 8.25 10.5 11.25 7.5M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
    {...p}
  />
)

export const CornerDownRight19 = (p: P) => (
  <S
    size={19}
    viewBox="0 0 19 19"
    d="M11.87 15.83l3.96-3.96-3.96-3.96M15.83 11.87H6.33A3.17 3.17 0 0 1 3.17 8.7V3.17"
    {...p}
  />
)

export const CornerDownRight16 = (p: P) => (
  <S
    size={16}
    viewBox="0 0 16 16"
    d="M10 13.33 13.33 10 10 6.67M13.33 10H5.33A2.67 2.67 0 0 1 2.67 7.33V2.67"
    {...p}
  />
)

export const Pause = (p: P) => (
  <svg width={15} height={15} viewBox="0 0 15 15" {...base(p)}>
    <path
      d="M9.38 1.88h1.87c.35 0 .63.28.63.62v10c0 .35-.28.63-.63.63H9.38a.62.62 0 0 1-.63-.63v-10c0-.34.28-.62.63-.62Zm-5.63 0h1.88c.34 0 .62.28.62.62v10c0 .35-.28.63-.62.63H3.75a.62.62 0 0 1-.63-.63v-10c0-.34.29-.62.63-.62Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const ConnectionIndicator = (p: P) => (
  <svg width={5} height={5} viewBox="0 0 5 5" {...base(p)}>
    <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
  </svg>
)

export const StatusIndicator = (p: P) => (
  <svg width={5} height={5} viewBox="0 0 5 5" {...base(p)}>
    <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
  </svg>
)

export const Calculator = (p: P) => (
  <S
    size={22}
    viewBox="0 0 22 22"
    d="M7.33 5.5h7.34M14.67 12.83v3.67M14.67 9.17h.01M11 9.17h.01M7.33 9.17h.01M11 12.83h.01M7.33 12.83h.01M11 16.5h.01M7.33 16.5h.01M5.5 1.83h11a1.83 1.83 0 0 1 1.83 1.84v14.67a1.83 1.83 0 0 1-1.83 1.83h-11a1.83 1.83 0 0 1-1.83-1.83V3.67A1.83 1.83 0 0 1 5.5 1.83Z"
    {...p}
  />
)

export const BookOpen = (p: P) => (
  <S
    size={22}
    viewBox="0 0 22 22"
    d="M11 6.42v12.83M11 6.42a3.67 3.67 0 0 0-3.67-3.67H2.75a.92.92 0 0 0-.92.92v11.91c0 .25.1.48.27.65.17.17.41.27.65.27h5.5A3.67 3.67 0 0 1 11 19.25M11 6.42a3.67 3.67 0 0 1 3.67-3.67h4.58c.25 0 .48.1.65.27.17.17.27.4.27.65v11.91c0 .25-.1.48-.27.65a.92.92 0 0 1-.65.27h-5.5A3.67 3.67 0 0 0 11 19.25"
    {...p}
  />
)

export const Briefcase = (p: P) => (
  <S
    size={22}
    viewBox="0 0 22 22"
    d="M11 11h.01M14.67 5.5V3.67a1.83 1.83 0 0 0-1.83-1.84H9.17A1.83 1.83 0 0 0 7.33 3.67V5.5m7.34 0H7.33m7.34 0h3.67a1.83 1.83 0 0 1 1.83 1.83v4.59M7.33 5.5H3.67a1.83 1.83 0 0 0-1.84 1.83v4.59M20.17 11.92a16.5 16.5 0 0 1-18.34 0m18.34 0v4.58a1.83 1.83 0 0 1-1.83 1.83H3.67a1.83 1.83 0 0 1-1.84-1.83v-4.58"
    {...p}
  />
)
