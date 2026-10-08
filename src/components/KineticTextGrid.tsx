"use client";

import * as React from "react";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Transition = {
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    ease?: string;
    duration?: number;
};

type Props = {
    text?: string;
    font?: React.CSSProperties;
    textColor?: string;
    backgroundColor?: string;
    rowCount?: number;
    repeatCount?: number;
    rowGap?: number;
    wordGap?: number;
    expandDurationSec?: number;
    holdDurationSec?: number;
    horizontalShiftPx?: number;
    zoomScalePct?: number;
    transition?: Transition;
    style?: React.CSSProperties;
    loop?: boolean;
    onComplete?: () => void;
};

function __OriginkitBase_KineticTextGrid(props: Props) {
    const {
        text = "Lee Jeong-min",
        font = {
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(34px, 5.5vw, 64px)",
            lineHeight: "1.3em",
            letterSpacing: "-0.03em",
            textAlign: "center",
        },
        textColor = "#FFFFFF",
        backgroundColor = "transparent",
        rowCount = 3,
        repeatCount = 5,
        rowGap = 12,
        wordGap = 36,
        expandDurationSec = 1.0,
        holdDurationSec = 0.2,
        horizontalShiftPx = 80,
        zoomScalePct = 115,
        transition = {
            type: "tween",
            stiffness: 800,
            damping: 60,
            mass: 1,
            ease: "easeInOut",
            duration: 1,
        },
        style,
        loop = false,
        onComplete,
    } = props;

    const [isSettled, setIsSettled] = useState(false);

    const safeRowCount = rowCount % 2 === 0 ? rowCount + 1 : rowCount;
    const centerRowIndex = Math.floor(safeRowCount / 2);
    const safeRepeatCount =
        repeatCount % 2 === 0 ? repeatCount + 1 : repeatCount;
    const centerWordIndex = Math.floor(safeRepeatCount / 2);

    const rows = useMemo(
        () => Array.from({ length: safeRowCount }, (_, i) => i),
        [safeRowCount]
    );
    const words = useMemo(
        () => Array.from({ length: safeRepeatCount }, (_, i) => i),
        [safeRepeatCount]
    );

    const fontStyles = (font ?? {}) as React.CSSProperties;
    const maxZoomScale = zoomScalePct / 100;

    const HOME_FACTOR = 0.4;
    const ease = (transition as any)?.ease ?? "easeInOut";

    // Timing calculation
    const motionSec = Math.max(0.1, expandDurationSec);
    const tIn = motionSec;                              // 1.0s: peak drift & zoom
    const tWipe = tIn + motionSec;                      // 2.0s: wiped to center only
    const total = tWipe + 0.15;                         // 2.15s: sequence end
    const n = (t: number) => Math.min(1, Math.max(0, t / total));

    const VISIBLE = "inset(0% 0% 0% 0%)";

    const hasCompletedRef = useRef(false);
    useEffect(() => {
        if (!loop) {
            const timer = setTimeout(() => {
                if (!hasCompletedRef.current) {
                    hasCompletedRef.current = true;
                    setIsSettled(true);
                    onComplete?.();
                }
            }, total * 1000);
            return () => clearTimeout(timer);
        }
    }, [total, loop, onComplete]);

    // When the animation sequence finishes, render only the single centered text permanently!
    if (isSettled && !loop) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    ...style,
                }}
            >
                <span
                    style={{
                        color: textColor,
                        lineHeight: 1,
                        display: "inline-block",
                        clipPath: VISIBLE,
                        textAlign: "center",
                        ...fontStyles,
                    }}
                >
                    {text}
                </span>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                ...style,
            }}
        >
            <motion.div
                animate={{ scale: [1, maxZoomScale, 1, 1] }}
                transition={{
                    duration: total,
                    times: [0, n(tIn), n(tWipe), 1],
                    ease,
                    repeat: loop ? Infinity : 0,
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: rowGap,
                    position: "relative",
                    willChange: "transform",
                }}
            >
                {rows.map((rowIndex) => {
                    const isCenterRow = rowIndex === centerRowIndex;
                    const distanceFromCenterY = rowIndex - centerRowIndex;
                    const direction = rowIndex % 2 === 0 ? 1 : -1;

                    const speedMultiplier =
                        0.7 + (Math.abs(distanceFromCenterY) % 3) * 0.45;
                    const driftFull =
                        direction * horizontalShiftPx * speedMultiplier;
                    const driftHome = driftFull * HOME_FACTOR;

                    const wipeLTR = rowIndex % 2 === 0;
                    const hidden = wipeLTR
                        ? "inset(0% 0% 0% 100%)"
                        : "inset(0% 100% 0% 0%)";

                    // Non-center rows: drift, fade to opacity 0, and stay at 0 until total
                    if (!isCenterRow) {
                        return (
                            <motion.div
                                key={rowIndex}
                                animate={{
                                    x: [driftHome, driftFull, driftFull, driftFull],
                                    opacity: [1, 1, 0, 0],
                                }}
                                transition={{
                                    duration: total,
                                    times: [0, n(tIn), n(tWipe), 1],
                                    ease,
                                    repeat: loop ? Infinity : 0,
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: wordGap,
                                    whiteSpace: "nowrap",
                                    willChange: "transform, opacity",
                                }}
                            >
                                {words.map((wordIndex) => (
                                    <span
                                        key={wordIndex}
                                        style={{
                                            color: textColor,
                                            lineHeight: 1,
                                            display: "inline-block",
                                            clipPath: VISIBLE,
                                            ...fontStyles,
                                        }}
                                    >
                                        {text}
                                    </span>
                                ))}
                            </motion.div>
                        );
                    }

                    // Center row: drifts to 0 and stays at 0!
                    return (
                        <motion.div
                            key={rowIndex}
                            animate={{
                                x: [driftHome, driftFull, 0, 0],
                            }}
                            transition={{
                                duration: total,
                                times: [0, n(tIn), n(tWipe), 1],
                                ease,
                                repeat: loop ? Infinity : 0,
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: wordGap,
                                whiteSpace: "nowrap",
                                willChange: "transform",
                            }}
                        >
                            {words.map((wordIndex) => {
                                const isCenterWord = wordIndex === centerWordIndex;

                                if (isCenterWord) {
                                    // Main central word: stays visible throughout and never disappears
                                    return (
                                        <span
                                            key={wordIndex}
                                            style={{
                                                color: textColor,
                                                lineHeight: 1,
                                                display: "inline-block",
                                                clipPath: VISIBLE,
                                                ...fontStyles,
                                            }}
                                        >
                                            {text}
                                        </span>
                                    );
                                }

                                const denom = Math.max(1, safeRepeatCount - 1);
                                const sweepT = wipeLTR
                                    ? wordIndex / denom
                                    : (safeRepeatCount - 1 - wordIndex) / denom;

                                const wipeWindow = tWipe - tIn;
                                const perWipe = wipeWindow * 0.5;
                                const wStartOut =
                                    tIn + sweepT * (wipeWindow - perWipe);
                                const wEndOut = wStartOut + perWipe;

                                // Surrounding words wipe to hidden, fade to 0, and STAY 0
                                return (
                                    <motion.span
                                        key={wordIndex}
                                        animate={{
                                            clipPath: [
                                                VISIBLE,
                                                VISIBLE,
                                                hidden,
                                                hidden,
                                            ],
                                            opacity: [1, 1, 0, 0],
                                        }}
                                        transition={{
                                            duration: total,
                                            times: [
                                                0,
                                                n(wStartOut),
                                                n(wEndOut),
                                                1,
                                            ],
                                            ease,
                                            repeat: loop ? Infinity : 0,
                                        }}
                                        style={{
                                            color: textColor,
                                            lineHeight: 1,
                                            display: "inline-block",
                                            clipPath: VISIBLE,
                                            willChange: "clip-path, opacity",
                                            ...fontStyles,
                                        }}
                                    >
                                        {text}
                                    </motion.span>
                                );
                            })}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

const __originkitPresetProps = {
  text: "Lee Jeong-min",
  font: {
    fontSize: "clamp(34px, 5.5vw, 64px)",
    textAlign: "center" as const,
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 700,
    lineHeight: "1.4em",
    letterSpacing: "-0.03em"
  },
  rowCount: 3,
  rowGap: 8,
  wordGap: 36,
  backgroundColor: "transparent",
  loop: false
};

export default function KineticTextGrid(props: Record<string, unknown>) {
  return <__OriginkitBase_KineticTextGrid {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
