export const defaultEasing = [0.6, -0.05, 0.01, 0.99]

export const searchVariants = {
    y: 0,
    opacity: 1,
    transition: {
        y: { stiffness: 1000, velocity: -100 },
    },
}

export const staggerHalf = {
    animate: { transition: { staggerChildren: 0.05 } },
}

export const staggerOne = {
    animate: { transition: { staggerChildren: 0.1 } },
}

export const modalVariants = {
    hidden: {
        opacity: 0,
        top: "100%",
        transition: { duration: 0.8, ease: defaultEasing },
    },
    visible: {
        opacity: 1,
        top: "50%",
        transition: { duration: 0.8, ease: defaultEasing },
    },
}

export const modalOverlayVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2, delay: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.2 } },
}

export const modalFadeInUpVariants = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: defaultEasing },
    },
}

export const authFadeInUpVariants = {
    initial: {
        y: 30,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: defaultEasing },
    },
}

export const navbarFadeInVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.2 } },
}

export const posterFadeInVariants = {
    initial: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.5, ease: defaultEasing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: defaultEasing },
    },
    exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.5, ease: defaultEasing },
    },
}

export const bannerFadeInVariants = {
    initial: {
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    exit: {
        opacity: 0,
        transition: { delay: 0.4, duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
}

export const bannerFadeInLoadSectionVariants = {
    initial: { opacity: 0, transition: { duration: 0.4, ease: defaultEasing } },
    animate: { opacity: 1, transition: { duration: 0.4, ease: defaultEasing } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: defaultEasing } },
}

export const bannerFadeInUpVariants = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { delayChildren: 0.4, duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    exit: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
        willChange: "opacity, transform",
    },
}

export const authPageFadeInVariants = {
    initial: { opacity: 0, transition: { duration: 0.6, ease: defaultEasing } },
    animate: { opacity: 1, transition: { duration: 0.6, ease: defaultEasing } },
    exit: { opacity: 0, transition: { duration: 0.6, ease: defaultEasing } },
}

export const creditsFadeInUpVariants = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { delay: 0.8, duration: 0.8, ease: defaultEasing },
    },
    exit: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.8, ease: defaultEasing },
    },
}

export const defaultPageFadeInVariants = {
    initial: {
        opacity: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: "opacity, transform",
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.6, ease: defaultEasing },
        willChange: "opacity, transform",
    },
}
