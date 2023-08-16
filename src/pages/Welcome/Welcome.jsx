import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import styles from "./styles.module.scss";

import discordIcon from "../../assets/images/icons/icons8-discord.svg";
import telegramIcon from "../../assets/images/icons/icons8-telegram-app.svg";
import twitterIcon from "../../assets/images/icons/icons8-twitter.svg";
import neftyBlockIcon from "../../assets/images/icons/NeftyBlocks-icon.png";

const Welcome = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const welcomeTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 35,
    delay: 0.5,
  };
  const infoTransition = {
    type: "spring",
    ease: "easeInOut",
    damping: 30,
  };
  const Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };
  const information = [
    {
      title: "Act 1: Discovery and Teleportation Breakthrough",
      text: "In a groundbreaking scientific achievement, Dr. Emanuele Agostino stumbles upon a revolutionary breakthrough a method to teleport humans to the distant mining planet of Chaos X-18. This extraordinary discovery sends shockwaves through the scientific community and captures the imagination of investors and space enthusiasts worldwide. Recognizing the immense potential of this technology, Dr. Agostino secures substantial funding and assembles a team of top-notch experts for the unprecedented mission that lies ahead.",
    },
    {
      title: "Act 2: Mining Operations and Challenges",
      text: "With great anticipation, the team arrives on Chaos X-18, ready to face the daunting challenges that await them. They are greeted by a hostile and inhospitable environment, with extreme temperatures, fierce storms, and treacherous terrains. Undeterred, they embark on their mining operations, equipped with advanced technology and state-of-the-art machinery. As they delve deeper into the planet's crust, the team uncovers a treasure trove of valuable resources. Aurum, a radiant and rare cosmic gold, glistens amidst the rocky depths, while Celium, a luminescent crystal pulsating with untapped energy, promises limitless possibilities. These resources hold the key to technological advancements and great wealth.",
    },
    {
      title: "Act 3: Ethical Dilemma and Conflict",
      text: "Amidst the thrill of discovery, an ethical dilemma emerges within the team. Some members are driven by personal gain and disregard the long-term consequences of their actions. They seek to exploit Chaos X-18's resources recklessly, endangering the delicate ecosystem and the availability of Aurum and Celium. Dr. Agostino, guided by his moral compass, confronts these individuals, emphasizing the importance of responsible and sustainable mining practices. The clash of ideals sparks conflicts and tensions within the team. Dr. Agostino's unwavering commitment to preserving the planet's natural balance and ensuring the availability of resources for future generations becomes the focal point of heated debates. The team is faced with a critical choice: succumb to short-term gains or adopt a more responsible approach to mining.",
    },
    {
      title: "Act 4: Resolution and Legacy",
      text: "In a pivotal moment, the majority of the team aligns with Dr. Agostino's vision of responsible mining practices. They implement strict regulations and guidelines, committing to preserving Chaos X-18's delicate ecosystem while maximizing the long-term benefits of Aurum and Celium. They invest in advanced technologies that minimize environmental impact and prioritize reclamation efforts to restore any damage caused by mining activities. Through their collective efforts, the mining colony on Chaos X-18 thrives, serving as a shining example of responsible resource extraction. The sustainable approach adopted by the team ensures the continued availability of Aurum and Celium while safeguarding the planet's biodiversity and natural beauty.",
    },
    {
      title: "Epilogue",
      text: "The legacy of Chaos X-18 reverberates throughout the cosmos, inspiring future generations to approach resource extraction with a sense of stewardship and responsibility. The advancements fueled by Aurum and Celium usher in a new era of scientific progress and technological breakthroughs on Earth and beyond. Dr. Agostino's vision and the lessons learned from Chaos X-18 serve as a guiding light, reminding humanity of the delicate balance between progress and preservation.",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const newX = Math.random() * 100 - 100;
      const newY = Math.random() * 100 - 100;
      setBackgroundPosition({ x: newX, y: newY });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
    >
      <motion.div
        style={{
          backgroundPositionX: backgroundPosition.x,
          backgroundPositionY: backgroundPosition.y,
        }}
        className={styles.container_mainSection}
        viewport={{ root: scrollRef, once: true }}
        transition={welcomeTransition}
        variants={Variants}
        initial="initial"
        whileInView="whileInView"
      >
        <motion.h1
          transition={{ delay: 0.7 }}
          variants={Variants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ root: scrollRef, once: true }}
        >
          Welcome to "Chaos X-18"!
        </motion.h1>
        <motion.h1
          transition={{ delay: 0.7 }}
          variants={Variants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ root: scrollRef, once: true }}
        >
          Get ready for an epic space adventure in this immersive online game
          set on a distant mining planet.
        </motion.h1>
        <motion.p
          transition={{ delay: 0.9 }}
          variants={Variants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ root: scrollRef, once: true }}
        >
          In the vast universe of Chaos X-18 journey to the most mysterious and
          resource-rich planet ever discovered. The story revolves around
          scientist E. Agostino, a visionary genius who has identified the most
          promising mineral deposits ever seen. His discoveries have attracted
          the attention of countless space adventurers, including you! But how
          do you reach Chaos X-18 ? The answer lies in the Teleport, a powerful
          NFT that offers the extraordinary ability to teleport players through
          the vast expanse of space to the heart of the planet. The Teleport
          will be your gateway to a world full of opportunities and thrilling
          challenges. Once you touch down on Chaos X-18, your journey as a space
          miner begins. Here you will encounter the Aurum and Celium mines, two
          highly valuable NFTs. Aurum specializes in extracting cosmic gold, a
          rare and precious resource, while Celium focuses on mining celium, a
          mysterious element with extraordinary energy properties. The Aurum and
          Celium mines will be your primary tools for gathering the resources
          necessary for your prosperity. But they won't be passive tools! You
          will have the ability to upgrade and customize your mines through a
          series of enhancements. These upgrades will increase resource
          production, allowing you to obtain ever-increasing quantities of Aurum
          and Celium. However, the collected resources are not just an end in
          themselves but a means to achieve the ultimate goal: Chaos Tokens.
          Through an elaborate conversion process, the resources extracted from
          the mines can be transformed into this unique cryptocurrency that
          represents the pulsating heart of the game ecosystem. Chaos Tokens
          will play a crucial role in your journey, offering extraordinary
          opportunities and unlocking advanced features. To maximize your space
          mining capabilities, you will have access to Slot Building NFTs. These
          powerful tools will allow you to simultaneously utilize up to 20 mines
          on Chaos X-18. This will provide you with a significant competitive
          advantage as you maximize resource production and compete for a share
          of the generous prize pool put forth by E. Agostino.
        </motion.p>
        <motion.p
          transition={{ delay: 0.9 }}
          variants={Variants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ root: scrollRef, once: true }}
        >
          Chaos X-18 is an active game on the Wax blockchain, contributing to
          the growth of this revolutionary ecosystem. Thanks to blockchain
          technology, you can enjoy secure and transparent transactions, as well
          as true ownership and control over your NFTs and resources. Prepare
          yourself for a one-of-a-kind space adventure where fast-paced action,
          space exploration, and the quest for power converge in an immersive
          experience. Chaos X-18 awaits you! Join the race to mining wealth and
          prove your worth in an unknown universe. Be the best and reach for the
          stars!
        </motion.p>
        <motion.div
          transition={{ delay: 1.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button onClick={() => navigate("/home")} size="large" color="blue">
            Start
          </Button>
        </motion.div>
      </motion.div>
      {information.map((info, index) => (
        <motion.div
          style={{
            backgroundPositionX: backgroundPosition.x,
            backgroundPositionY: backgroundPosition.y,
          }}
          key={index}
          className={styles.container_infoSection}
          viewport={{ root: scrollRef, once: true }}
          transition={infoTransition}
        >
          <motion.div
            className={styles.container_infoSection_info}
            viewport={{ root: scrollRef, once: true }}
            transition={welcomeTransition}
          >
            <motion.h2
              transition={infoTransition}
              variants={Variants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ root: scrollRef, once: true }}
            >
              {info.title}
            </motion.h2>
            <motion.p
              transition={infoTransition}
              variants={Variants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ root: scrollRef, once: true }}
            >
              {info.text}
            </motion.p>
          </motion.div>
          <div className={styles.container_infoSection_links}>
            <a
              href="https://discord.gg/zAvhwmb6ZM"
              target="_blank"
              rel="noreferrer"
            >
              <img src={discordIcon} alt="discord icon" />
            </a>
            <a
              href="https://t.me/outofcontrolnfts"
              target="_blank"
              rel="noreferrer"
            >
              <img src={telegramIcon} alt="telegram icon" />
            </a>
            <a
              href="https://twitter.com/OOC_nfts"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitterIcon} alt="twitter icon" />
            </a>
            <a
              href="https://neftyblocks.com/collection/cryptochaos1"
              target="_blank"
              rel="noreferrer"
            >
              <img src={neftyBlockIcon} alt="neftyblock icon" />
            </a>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Welcome;
