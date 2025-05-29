import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

const staticMessages = [
    { type: "timestamp", text: "Yesterday at 6:34" },
    { sender: "me", text: "You got a big ass forehead you know that?" },
    { sender: "her", text: "Je t'emmerde" },
    { type: "timestamp", text: "Today" },
];

const animatedMessages = [
    { sender: "me", text: "Hey..." },
    { sender: "me", text: "I know birthdays aren't your thing." },
    { sender: "me", text: "But still, I wanted to say something." },
    { sender: "me", text: "You're someone I admire a lot." },
    { sender: "me", text: "Sharp. Honest. Rare." },
    { sender: "me", text: "And yeah, I made this for you." },
    { sender: "me", text: "Happy Birthday 🎂" },
    { sender: "me", text: "🎉🎈" },
];

const bubbleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0,
            duration: 0.6,
            type: "spring",
        },
    }),
};

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 px-4 py-2 self-start">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
);

const TextingScene = () => {
    const [shownMessages, setShownMessages] = useState([]);
    const [showTyping, setShowTyping] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < animatedMessages.length) {
            setShowTyping(true);
            const typingTimeout = setTimeout(() => {
                setShowTyping(false);
                setShownMessages((prev) => [...prev, animatedMessages[index]]);
                setIndex((prev) => prev + 1);

                // Trigger confetti after "Happy Birthday 🎂" message
                if (animatedMessages[index].text === "Happy Birthday 🎂") {
                    jsConfetti.addConfetti({
                        emojis: ['🌸', '🌼', '💙', '🤍'],
                        emojiSize: 50,
                        confettiNumber: 100,
                    });
                }
            }, 2000);
            return () => clearTimeout(typingTimeout);
        }
    }, [index]);

    return (
        <div className="w-screen h-screen bg-black flex flex-col">
            <div className="p-4 text-white text-center font-mono border-b border-gray-800">
                <div className="text-xl font-semibold">Ayman</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {staticMessages.map((msg, idx) => (
                    msg.type === "timestamp" ? (
                        <div
                            key={`static-${idx}`}
                            className="text-center text-xs text-gray-500 font-mono"
                        >
                            {msg.text}
                        </div>
                    ) : (
                        <div
                            key={`static-${idx}`}
                            className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-2 text-sm font-mono whitespace-pre-wrap break-words shadow-md ${
                                msg.sender === "me"
                                    ? "self-start bg-gradient-to-br from-pink-300 to-pink-500 text-black rounded-bl-sm"
                                    : "self-end bg-neutral-800 text-white rounded-br-sm"
                            }`}
                        >
                            {msg.text}
                        </div>
                    )
                ))}

                {shownMessages.map((msg, i) => (
                    <motion.div
                        key={`animated-${i}`}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={bubbleVariants}
                        className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-2 text-sm font-mono whitespace-pre-wrap break-words shadow-md ${
                            msg.sender === "me"
                                ? "self-start bg-gradient-to-br from-pink-300 to-pink-500 text-black rounded-bl-sm"
                                : "self-end bg-neutral-800 text-white rounded-br-sm"
                        }`}
                    >
                        {msg.text}
                    </motion.div>
                ))}

                {showTyping && <TypingIndicator />}
            </div>
        </div>
    );
};

export default TextingScene;
