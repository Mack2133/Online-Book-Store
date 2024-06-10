import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Table theme
const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start",
  },
  td: {
    textAlign: "start",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
})

const variantStriped = definePartsStyle((props) => {
  return {
    td: {
      fontFamily: "mono", // change font family to mono
    }
  }
})

const variantSimple = definePartsStyle((props) => {
  return {
    td: {
      fontWeight: "semibold", // change font weight to semibold
    },
  }
})

// Defining a custom variant
const variantRounded = definePartsStyle((props) => {
  const { colorScheme: c, colorMode } = props;

  return {
    tr: {
      "td:first-child": {
        borderTopLeftRadius: "full",
        borderBottomLeftRadius: "full"
      },
      "td:last-child": {
        borderTopRightRadius: "full",
        borderBottomRightRadius: "full"
      },
    },
    th: {
      "&[data-is-numeric=true]": {
        textAlign: "end"
      }
    },
    td: {
      "&[data-is-numeric=true]": {
        textAlign: "end"
      }
    },
    caption: {
      color: colorMode === "light" ? `${c}.600` : `${c}.100`,
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: colorMode === "light" ? `${c}.100` : `${c}.700`,
          },
          td: {
            background: colorMode === "light" ? `${c}.100` : `${c}.700`,
          }
        },
        "&:nth-of-type(even)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: colorMode === "light" ? `${c}.300` : `${c}.600`,
          },
          td: {
            background: colorMode === "light" ? `${c}.300` : `${c}.600`,
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});

const variants = {
  simple: variantSimple,
  striped: variantStriped,
  rounded: variantRounded,
}

const xl = defineStyle({
  fontSize: 'lg',
  px: '4',
  h: '12',
})

const sizes = {
  xl: definePartsStyle({
    td: xl,
    th: xl,
  }),
}

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "xl",
    variant: "rounded",
    colorScheme: "gray"
  },
})