import { createTheme } from "baseui";
import { ThemePrimitives } from "baseui/theme";

export const primitives: ThemePrimitives = {
  // Primary Palette
  primaryA: "#000000",
  primaryB: "#ffffff",
  primary: "#000000",
  primary50: "#F6F6F6",
  primary100: "#EEEEEE",
  primary200: "#E2E2E2",
  primary300: "#CBCBCB",
  primary400: "#AFAFAF",
  primary500: "#6B6B6B",
  primary600: "#545454",
  primary700: "#333333",
  // Accent Palette
  accent: "#276EF1",
  accent50: "#EFF3FE",
  accent100: "#D4E2FC",
  accent200: "#A0BFF8",
  accent300: "#5B91F5",
  accent400: "#276EF1",
  accent500: "#1E54B7",
  accent600: "#174291",
  accent700: "#102C60",
  // Negative Palette
  negative: "#E11900",
  negative50: "#FFEFED",
  negative100: "#FED7D2",
  negative200: "#F1998E",
  negative300: "#E85C4A",
  negative400: "#E11900",
  negative500: "#AB1300",
  negative600: "#870F00",
  negative700: "#5A0A00",
  // Warning Palette
  warning: "#FFC043",
  warning50: "#FFFAF0",
  warning100: "#FFF2D9",
  warning200: "#FFE3AC",
  warning300: "#FFCF70",
  warning400: "#FFC043",
  warning500: "#BC8B2C",
  warning600: "#996F00",
  warning700: "#674D1B",
  // Positive Palette
  positive: "#03703C",
  positive50: "#E6F2ED",
  positive100: "#ADDEC9",
  positive200: "#66D19E",
  positive300: "#06C167",
  positive400: "#048848",
  positive500: "#03703C",
  positive600: "#03582F",
  positive700: "#10462D",
  // Monochrome Palette
  mono100: "#FFFFFF",
  mono200: "#F6F6F6",
  mono300: "#EEEEEE",
  mono400: "#E2E2E2",
  mono500: "#CBCBCB",
  mono600: "#AFAFAF",
  mono700: "#6B6B6B",
  mono800: "#545454",
  mono900: "#333333",
  mono1000: "#000000",
  // Font Family
  primaryFontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const mono = <T extends Record<string, unknown>>(
  styles: T
): T & { fontFamily: string } => {
  return {
    ...styles,
    fontFamily: 'Menlo, "Lucida Console", Monaco, Consolas, "Courier New", monospace',
  };
};
const DisplayLineHeight = { lineHeight: 1.2 };
const HeadingLineHeight = { lineHeight: 1.2 };
const LabelLineHeight = { lineHeight: 1.3 };
// const CaptionLineHeight = { lineHeight: 1.4 };
const ParagraphLineHeight = { lineHeight: 1.45 };

export const theme = createTheme(primitives, {
  typography: {
    DisplayLarge: DisplayLineHeight,
    DisplayMedium: DisplayLineHeight,
    DisplaySmall: DisplayLineHeight,
    DisplayXSmall: DisplayLineHeight,
    HeadingXXLarge: HeadingLineHeight,
    HeadingXLarge: HeadingLineHeight,
    HeadingLarge: HeadingLineHeight,
    HeadingMedium: HeadingLineHeight,
    HeadingSmall: HeadingLineHeight,
    HeadingXSmall: HeadingLineHeight,
    LabelLarge: LabelLineHeight,
    LabelMedium: LabelLineHeight,
    LabelSmall: LabelLineHeight,
    LabelXSmall: LabelLineHeight,
    ParagraphLarge: ParagraphLineHeight,
    ParagraphMedium: ParagraphLineHeight,
    ParagraphSmall: ParagraphLineHeight,
    ParagraphXSmall: ParagraphLineHeight,
    MonoDisplayLarge: mono(DisplayLineHeight),
    MonoDisplayMedium: mono(DisplayLineHeight),
    MonoDisplaySmall: mono(DisplayLineHeight),
    MonoDisplayXSmall: mono(DisplayLineHeight),
    MonoHeadingXXLarge: mono(HeadingLineHeight),
    MonoHeadingXLarge: mono(HeadingLineHeight),
    MonoHeadingLarge: mono(HeadingLineHeight),
    MonoHeadingMedium: mono(HeadingLineHeight),
    MonoHeadingSmall: mono(HeadingLineHeight),
    MonoHeadingXSmall: mono(HeadingLineHeight),
    MonoLabelLarge: mono(LabelLineHeight),
    MonoLabelMedium: mono(LabelLineHeight),
    MonoLabelSmall: mono(LabelLineHeight),
    MonoLabelXSmall: mono(LabelLineHeight),
    MonoParagraphLarge: mono(ParagraphLineHeight),
    MonoParagraphMedium: mono(ParagraphLineHeight),
    MonoParagraphSmall: mono(ParagraphLineHeight),
    MonoParagraphXSmall: mono(ParagraphLineHeight),
  },
  Modal: {
    overrides: {
      DialogContainer: {
        style: {
          backgroundColor: "yellow",
        },
      },
    },
  },
});
