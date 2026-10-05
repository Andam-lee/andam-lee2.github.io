// Rolling Letters — Originkit

"use client";

import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

type FontStyle = React.CSSProperties;

type TransitionValue = {
    type?: string;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    staggerChildren?: number;
};

type StaggerFrom = "start" | "center" | "end" | "random";
type StartFrom = "top" | "bottom";
type TextTag =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "span"
    | "div"
    | "section";

type Props = {
    text?: string;
    subtitle?: string;
    font?: FontStyle;
    color?: string;

    startFrom?: StartFrom;
    staggerFrom?: StaggerFrom;

    tag?: TextTag;

    transition?: TransitionValue;
};

const startYPercentMap: Record<StartFrom, number> = {
    top: -500,
    bottom: 500,
};

const mapEase = (ease: TransitionValue["ease"]): string => {
    if (typeof ease !== "string") return "power4.out";

    const easeMap: Record<string, string> = {
        linear: "none",
        easeIn: "power2.in",
        easeOut: "power4.out",
        easeInOut: "power2.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out(1.7)",
        backInOut: "back.inOut",
        anticipate: "back.out(1.7)",
    };

    return easeMap[ease] ?? ease;
};

const DEFAULT_FONT: FontStyle = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "clamp(42px, 7.5vw, 92px)",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: "1.1em",
    textAlign: "center",
};

const DEFAULT_TRANSITION: TransitionValue = {
    type: "tween",
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.08,
};

function __OriginkitBase_SlotMachine({
    text = "Rolling Letters",
    subtitle = "Photojournalist",
    font = DEFAULT_FONT,
    color = "#ffffff",

    startFrom = "top",
    staggerFrom = "start",

    tag = "h1",

    transition = DEFAULT_TRANSITION,
}: Props) {
    const containerRef = useRef<HTMLElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const hasAnimatedRef = useRef<boolean>(false);

    const playAnimation = useCallback(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".char");

        gsap.killTweensOf(chars);
        if (subtitleRef.current) {
            gsap.killTweensOf(subtitleRef.current);
            gsap.set(subtitleRef.current, { opacity: 0, y: 8 });
        }

        gsap.set(chars, {
            clearProps: "transform",
        });

        const tl = gsap.timeline();

        tl.from(chars, {
            yPercent: startYPercentMap[startFrom],
            duration: transition.duration ?? 0.6,
            delay: transition.delay ?? 0,
            stagger: {
                each: transition.staggerChildren ?? 0.08,
                from: staggerFrom,
            },
            ease: mapEase(transition.ease),
        });

        if (subtitleRef.current) {
            tl.to(subtitleRef.current, {
                opacity: 0.9,
                y: 0,
                duration: 0.85,
                ease: "power2.out",
            }, "+=0.12");
        }
    }, [startFrom, staggerFrom, transition]);

    useEffect(() => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        playAnimation();
    }, [playAnimation]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "auto",
            }}
        >
            {React.createElement(
                tag,
                {
                    ref: containerRef,
                    style: {
                        margin: 0,
                        paddingBottom: "0.22em",
                        display: "block",
                        overflow: "hidden",
                        whiteSpace: "pre-wrap",
                        color,
                        textShadow: "0 2px 24px rgba(0, 0, 0, 0.45)",
                        ...font,
                    },
                },
                text.split("").map((char, index) => (
                    <span
                        key={index}
                        className="char"
                        style={{
                            display: "inline-block",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))
            )}

            {subtitle && (
                <div
                    ref={subtitleRef}
                    style={{
                        margin: "0",
                        fontSize: "clamp(15px, 2.5vw, 31px)",
                        fontWeight: 300,
                        lineHeight: "1.15em",
                        letterSpacing: "0.08em",
                        color: "rgba(255, 255, 255, 0.88)",
                        textShadow: "0 2px 18px rgba(0, 0, 0, 0.55)",
                        fontFamily: "Inter, system-ui, sans-serif",
                        opacity: 0,
                        transform: "translateY(8px)",
                    }}
                >
                    {subtitle}
                </div>
            )}
        </div>
    );
}

const __originkitPresetProps = {
  text: "Lee Jeong-min",
  subtitle: "Photojournalist",
  startFrom: "top" as const,
  staggerFrom: "center" as const,
  font: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "clamp(44px, 7.5vw, 92px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: "1.12em",
    textAlign: "center" as const,
  },
};

const SlotMachineComponent = React.memo(function SlotMachine(props: Record<string, unknown>) {
  return <__OriginkitBase_SlotMachine {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
});

export default SlotMachineComponent;
