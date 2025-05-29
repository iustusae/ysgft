import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./Intro";
import TextingScene from "./Texting.jsx";

const MainScene = () => {
    const [scene, setScene] = useState("intro"); // 'intro' | 'texting'

    return (
        <div className="w-screen h-screen overflow-hidden bg-black relative text-white font-mono">
            <AnimatePresence mode="wait">
                {scene === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute w-full h-full"
                    >
                        <Intro onFinish={() => setScene("texting")} />
                    </motion.div>
                )}

                {scene === "texting" && (
                    <motion.div
                        key="texting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute w-full h-full flex flex-col"
                    >
                        <TextingScene key={Date.now()} /> {/* Key resets component */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                            <button
                                className="px-4 py-2 bg-pink-500 text-black rounded hover:bg-gray-200 transition"
                                onClick={() => setScene("texting")}
                            >
                                Repeat Texting Scene
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={() => setScene("intro")}
                            >
                                Restart
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MainScene;
