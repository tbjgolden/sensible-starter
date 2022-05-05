import {
  ReactNode,
  Children,
  useState,
  useRef,
  useEffect,
  CSSProperties,
  HTMLAttributes,
} from "react";

type ValidNumberOfColumns = 1 | 2 | 3 | 4 | 5 | 6;
export type GridAlign = "left" | "right" | "center" | "stretched" | "justified";

export const Grid = ({
  cellWidth = 288,
  gap = 0,
  children,
  align = "auto",
  ...divProps
}: {
  cellWidth?: number;
  gap?: number;
  children: ReactNode;
  align?: GridAlign | "auto";
} & HTMLAttributes<HTMLDivElement>) => {
  const [wrapperWidth, setWrapperWidth] = useState<number | null>(null);
  const [autoAlign, setAutoAlign] = useState<GridAlign | null>(null);
  const gridWrapperElRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWrapperWidth(width);
    })
  );

  useEffect(() => {
    const observer = observerRef.current;
    const gridWrapperEl = gridWrapperElRef.current;

    if (gridWrapperEl) {
      observer.observe(gridWrapperEl);
    }

    return () => {
      if (gridWrapperEl) {
        observer.unobserve(gridWrapperEl);
      }
    };
  }, [gridWrapperElRef, observerRef]);

  useEffect(() => {
    const gridWrapperEl = gridWrapperElRef.current;

    if (autoAlign === null && gridWrapperEl !== null) {
      const textAlign =
        (getComputedStyle(gridWrapperEl).textAlign as CSSProperties["textAlign"]) ??
        "left";

      switch (textAlign) {
        case "left":
        case "start": {
          setAutoAlign("left");

          break;
        }
        case "center": {
          setAutoAlign("center");

          break;
        }
        case "right":
        case "end": {
          setAutoAlign("right");

          break;
        }
        case "justify": {
          setAutoAlign("justified");

          break;
        }
        default: {
          setAutoAlign("stretched");
        }
      }
    }
  }, [gridWrapperElRef, autoAlign]);

  return (
    <div {...divProps} ref={gridWrapperElRef}>
      <Layout
        cellWidth={cellWidth}
        gap={gap}
        wrapperWidth={wrapperWidth}
        align={(align === "auto" ? autoAlign : align) ?? "stretched"}
      >
        {children}
      </Layout>
    </div>
  );
};

export const Layout = ({
  cellWidth,
  gap,
  children,
  wrapperWidth,
  align,
}: {
  cellWidth: number;
  gap: number;
  children: ReactNode;
  wrapperWidth: number | null;
  align: GridAlign;
}) => {
  const childArray = Children.toArray(children);
  const maxColumns = Math.min(childArray.length, 6) as 0 | ValidNumberOfColumns;

  if (wrapperWidth === null || maxColumns === 0) {
    return null;
  } else {
    let canFit: ValidNumberOfColumns = 1;
    if (wrapperWidth > cellWidth) {
      const unboundedCanFit = Math.floor((wrapperWidth + gap) / (cellWidth + gap));
      if (unboundedCanFit <= 1) {
        canFit = 1;
      } else if (unboundedCanFit >= 6) {
        canFit = 6;
      } else {
        canFit = Math.min(childArray.length, unboundedCanFit) as ValidNumberOfColumns;
      }
    }

    let columnWidth = `${(cellWidth - gap) / 2}px`;
    if (align === "stretched") columnWidth = `minmax(${columnWidth}, 1fr)`;

    const gridTemplateColumns = `repeat(${canFit + canFit}, ${columnWidth})`;

    let justifyContent = "stretch";
    if (align === "left") {
      justifyContent = "start";
    } else if (align === "right") {
      justifyContent = "end";
    } else if (align === "center") {
      justifyContent = "center";
    } else if (align === "justified") {
      justifyContent = "space-between";
    }

    const bottomRowLength = childArray.length % canFit;
    const order = childArray.length - bottomRowLength - 1;
    let bottomRowSpacerColumns = 0;
    if (align === "center") {
      bottomRowSpacerColumns = canFit - bottomRowLength;
    } else if (align === "right") {
      bottomRowSpacerColumns = 2 * (canFit - bottomRowLength);
    }

    return (
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns,
          justifyContent,
          gap,
        }}
      >
        {childArray.map((child, i) => {
          return (
            <div
              key={i}
              className="rm-margin"
              style={{
                gridColumnEnd: "span 2",
                order: i,
                width: align === "stretched" ? "auto" : cellWidth,
              }}
            >
              {child}
            </div>
          );
        })}
        {bottomRowSpacerColumns > 0 ? (
          <div
            style={{
              gridColumnEnd: `span ${bottomRowSpacerColumns}`,
              order,
            }}
          />
        ) : null}
      </div>
    );
  }
};
