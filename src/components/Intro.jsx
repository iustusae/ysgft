import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pastelPinkGradient = `linear-gradient(90deg, #ff9ccd, #ffa6d2, #ff9ccd)`;

const strings = [
    "Hey, Yassmine",
    "I made you a little something.",
    "It's not much, but I hope you'll like it.",
    "..."
];

export default function Intro({onFinish}) {
    const [displayText, setDisplayText] = useState("");
    const [stringIndex, setStringIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            onFinish(); // Call the transition
        }, 8000); // adjust to match your intro duration

        return () => clearTimeout(timeout);
    }, []);
    useEffect(() => {
        if (stringIndex >= strings.length) return;

        const currentString = strings[stringIndex];
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseDuration = 2000;

        if (pause) {
            const pauseTimeout = setTimeout(() => {
                setPause(false);
                if (isDeleting) {
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(true);
                    setCharIndex((prev) => prev - 1);
                }
            }, pauseDuration);
            return () => clearTimeout(pauseTimeout);
        }

        if (!isDeleting && charIndex < currentString.length) {
            const timeout = setTimeout(() => {
                setDisplayText(currentString.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }

        if (!isDeleting && charIndex === currentString.length) {
            setPause(true);
        }

        if (isDeleting && charIndex >= 0) {
            const timeout = setTimeout(() => {
                setDisplayText(currentString.slice(0, charIndex));
                setCharIndex(charIndex - 1);
            }, deletingSpeed);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && charIndex < 0) {
            setIsDeleting(false);
            setStringIndex(stringIndex + 1);
            setCharIndex(0);
            setDisplayText("");
        }
    }, [charIndex, stringIndex, isDeleting, pause]);

    const renderText = () => {
        if (stringIndex === 0) {
            const prefix = "Hey, ";
            const highlight = "Yassmine";
            const prefixTyped = displayText.slice(0, prefix.length);
            const highlightTyped = displayText.slice(prefix.length);

            return (
                <>
                    <span style={{ color: "white" }}>{prefixTyped}</span>
                    <span
                        style={{
                            background: pastelPinkGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                            textShadow: "0 0 8px #ff9ccd",
                        }}
                    >
            {highlightTyped}
          </span>
                </>
            );
        }
        return <span style={{ color: "white" }}>{displayText}</span>;
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen w-full px-6"
            style={{ fontFamily: "'JetBrains Mono', monospace", backgroundColor: "black" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div
                style={{
                    fontSize: "4rem",
                    lineHeight: "1.2",
                    whiteSpace: "pre-wrap",
                    userSelect: "none",
                    position: "relative",
                    color: "white",
                }}
            >
                {renderText()}
                <span
                    style={{
                        display: "inline-block",
                        width: "1ch",
                        backgroundColor: "white",
                        marginLeft: "2px",
                        animation: "blink 1.2s steps(1) infinite",
                        verticalAlign: "bottom",
                        height: "1.2em",
                        borderRadius: "2px",
                    }}
                />
            </div>

            <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
        </motion.div>
    );
}
