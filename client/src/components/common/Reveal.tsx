import { motion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
  /** Render as a list item so it can sit directly inside <ul>/<ol>. */
  as?: 'div' | 'li';
};

/** Fades and lifts content in once as it scrolls into view (disabled for reduced motion). */
export function Reveal({ delay = 0, y = 18, as = 'div', children, ...props }: RevealProps) {
  const animation = {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  } as const;

  if (as === 'li') {
    return (
      <motion.li {...animation} {...(props as HTMLMotionProps<'li'>)}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div {...animation} {...props}>
      {children}
    </motion.div>
  );
}
