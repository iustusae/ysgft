import React, {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import JSConfetti from "js-confetti";

const confetti = new JSConfetti();
// Intro Component
const Intro = ({onFinish}) => {
    const pastelPinkGradient = `linear-gradient(90deg, #ff9ccd, #ffa6d2, #ff9ccd)`;
    const strings = [
        "Hey, Yassmine",
        "I made you a little something.",
        "It's not much, but I hope you'll like it.",
        "..."
    ];

    const [displayText, setDisplayText] = useState("");
    const [stringIndex, setStringIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        // Only transition when all strings have been shown
        if (stringIndex >= strings.length) {
            const timeout = setTimeout(() => {
                onFinish();
            }, 2000); // Wait 2 seconds after the last message is fully displayed
            return () => clearTimeout(timeout);
        }
    }, [stringIndex, onFinish]);

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
                    <span className="text-white">{prefixTyped}</span>
                    <span
                        className="font-bold"
                        style={{
                            background: pastelPinkGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 0 8px #ff9ccd",
                        }}
                    >
                        {highlightTyped}
                    </span>
                </>
            );
        }
        return <span className="text-white">{displayText}</span>;
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 bg-black"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <div
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center font-mono select-none relative text-white">
                {renderText()}
                <span
                    className="inline-block w-1 bg-white ml-1 animate-pulse align-center h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10 rounded-sm"/>
            </div>
        </motion.div>
    );
};

// Typing Indicator Component
const TypingIndicator = () => (
    <div className="flex items-center space-x-1 px-3 sm:px-4 py-2 self-start">
        <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></div>
        <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
);
const TextingScene = ({ onComplete }) => {
    const staticMessages = [
        { type: "timestamp", text: "Yesterday at 6:34" },
        { sender: "me", text: "You got a big ass forehead you know that?" },
        { sender: "her", text: "Je t'emmerde" },
        { type: "timestamp", text: "Today" },
    ];

    const animatedMessages = [
        { sender: "me", text: "Hey!" },
        { sender: "me", text: "I know birthdays aren't your thing anymore." },
        { sender: "me", text: "But I still wanted to wish you a happy birthday." },
        { sender: "me", text: "Because it's the day the world gave its best gift to humanity" },
        { sender: "me", text: "You." },
        {
            sender: "me",
            text: "And also it's because today is the only day I can be overly sweet\nwithout you being able to do anything about it hehe 😊"
        },
        { sender: "me", text: "You are a precious being, you know." },
        { sender: "me", text: "A gem, dare I say." },
        { sender: "me", text: "A marvel of biological resilience." },
        { sender: "me", text: "You are absolutely beautiful." },
        { sender: "me", text: "I know this will make me look like I'm unhealthily obsessed\nwith you." },
        { sender: "me", text: "But the day you sent me the fit check for the event," },
        { sender: "me", text: "I kept your picture looping for 30 minutes." },
        { sender: "me", text: "Only for my uncle to call me, making it impossible to replay\n(no I'm not mad, idk what you're talking about)." },
        { sender: "me", text: "You are all of this and more, way more than words can express." },
        { sender: "me", text: "Good luck for your exams, I am sure beyond the shadow of a doubt\nthat you'll be successful." },
        { sender: "me", text: "And if you aren't, I would be proud of you the same." },
        { sender: "me", text: "Thank you for everything." },
        { sender: "me", text: "Thank you for being a good storyteller." },
        { sender: "me", text: "Thank you for having a voice that makes everything feel a little less heavy." },
        { sender: "me", text: "A voice so calming, so beautiful, so harmonious, so mellifluous (hehe tu l'as pas vu venir celle la),\nbut I digress..." },
        { sender: "me", text: "Thank you for being yourself, I wouldn't have it any other way." },
        { sender: "me", text: "Never ever change." },
        { sender: "me", text: "And yeah, I made this for you." },
        { sender: "me", text: "Hope this made you a little happier, and took" +
                " you away\nfrom the disturbances of life, if not even for" +
                " a minute." },
        { sender: "me", text: "Happy Birthday 🎂" },
        { sender: "me", text: "🎉🎈" },
    ];

    const [shownMessages, setShownMessages] = useState([]);
    const [showTyping, setShowTyping] = useState(false);
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const endOfMessagesRef = useRef(null);

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

    // Scroll to bottom on message or typing change
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [shownMessages, showTyping]);

    // Show next message with delay
    useEffect(() => {
        if (index < animatedMessages.length) {
            setShowTyping(true);
            const typingTimeout = setTimeout(() => {
                setShowTyping(false);
                setShownMessages((prev) => [...prev, animatedMessages[index]]);
                setIndex((prev) => prev + 1);

                if (animatedMessages[index].text === "Happy Birthday 🎂") {
                    confetti.addConfetti({
                        emojis: ['🌸', '🌼', '💙', '🤍'],
                        emojiSize: 50,
                        confettiNumber: 100,
                    });
                }
            }, 2000);
            return () => clearTimeout(typingTimeout);
        } else if (!isComplete) {
            setTimeout(() => {
                setIsComplete(true);
                onComplete();
            }, 1500);
        }
    }, [index, isComplete, onComplete]);

    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="p-3 sm:p-4 text-white text-center font-mono border-b border-gray-800">
                <div className="text-lg sm:text-xl font-semibold">Ayman</div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 max-h-full">
                {staticMessages.map((msg, idx) =>
                    msg.type === "timestamp" ? (
                        <div key={`static-${idx}`} className="text-center text-xs text-gray-500 font-mono py-1">
                            {msg.text}
                        </div>
                    ) : (
                        <div
                            key={`static-${idx}`}
                            className={`max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words shadow-lg ${
                                msg.sender === "me"
                                    ? "self-start bg-gradient-to-br from-pink-300 to-pink-500 text-black rounded-bl-sm"
                                    : "self-end bg-neutral-800 text-white rounded-br-sm"
                            }`}
                        >
                            {msg.text}
                        </div>
                    )
                )}

                {shownMessages.map((msg, i) => (
                    <motion.div
                        key={`animated-${i}`}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={bubbleVariants}
                        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words shadow-lg ${
                            msg.sender === "me"
                                ? "self-start bg-gradient-to-br from-pink-300 to-pink-500 text-black rounded-bl-sm"
                                : "self-end bg-neutral-800 text-white rounded-br-sm"
                        }`}
                    >
                        {msg.text}
                    </motion.div>
                ))}

                {showTyping && <TypingIndicator />}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};



// Main App Component
const MainScene = () => {
    const [scene, setScene] = useState("intro");
    const [showButtons, setShowButtons] = useState(false);
    const [textingKey, setTextingKey] = useState(0);

    const handleTextingComplete = () => {
        setShowButtons(true);
    };

    const handleRepeatTexting = () => {
        setShowButtons(false);
        setTextingKey(prev => prev + 1);
    };

    const handleRestart = () => {
        setShowButtons(false);
        setTextingKey(0);
        setScene("intro");
    };

    return (
        <div
            className="w-screen h-screen overflow-hidden bg-black relative text-white font-mono">
            <AnimatePresence mode="wait">
                {scene === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                        className="absolute w-full h-full"
                    >
                        <Intro onFinish={() => setScene("texting")}/>
                    </motion.div>
                )}

                {scene === "texting" && (
                    <motion.div
                        key="texting"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                        className="absolute w-full h-full flex flex-col"
                    >
                        <TextingScene
                            key={textingKey}
                            onComplete={handleTextingComplete}
                        />

                        <AnimatePresence>
                            {showButtons && (
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 20}}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                    className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 px-4"
                                >
                                    <button
                                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 hover:scale-105 font-medium text-sm sm:text-base backdrop-blur-sm"
                                        onClick={handleRepeatTexting}
                                    >
                                        ↻ Replay Messages
                                    </button>
                                    <button
                                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 font-medium text-sm sm:text-base backdrop-blur-sm"
                                        onClick={handleRestart}
                                    >
                                        ⟲ Start Over
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function App() {

    return (
        // <Intro/>
        <MainScene/>
    )
}

export default App
