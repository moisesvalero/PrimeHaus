type RevealStage = 'title' | 'content';

type RevealOptions = {
  delay?: number;
  distance?: number;
  stage?: RevealStage;
  threshold?: number;
  rootMargin?: string;
  /** Sin animación inicial: evita CLS en above-the-fold */
  immediate?: boolean;
};

const STAGE_DELAY: Record<RevealStage, number> = {
  title: 0,
  content: 120
};

function normalizeOptions(value: RevealOptions | undefined) {
  return {
    delay: value?.delay,
    distance: value?.distance ?? 40,
    stage: value?.stage ?? 'content',
    threshold: value?.threshold ?? 0.24,
    rootMargin: value?.rootMargin ?? '0px 0px -8% 0px',
    immediate: value?.immediate ?? false
  };
}

function applyAssemblyVars(node: HTMLElement, options: ReturnType<typeof normalizeOptions>) {
  const totalDelay = options.delay ?? STAGE_DELAY[options.stage];
  node.classList.remove('assembly-title', 'assembly-content');
  node.classList.add('assembly-item', `assembly-${options.stage}`);
  node.style.setProperty('--assembly-delay', `${totalDelay}ms`);
  node.style.setProperty('--assembly-distance', `${options.distance}px`);
}

function scheduleReveal(node: HTMLElement) {
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => node.classList.add('is-visible'));
  } else {
    node.classList.add('is-visible');
  }
}

/**
 * Svelte action para reveal global con efecto de ensamblaje magnético.
 * Añade clases + variables CSS, y dispara la visibilidad al entrar en viewport.
 */
export function reveal(node: HTMLElement, options?: RevealOptions) {
  let config = normalizeOptions(options);
  applyAssemblyVars(node, config);
  let observer: IntersectionObserver | null = null;
  let idleId: number | null = null;

  if (config.immediate) {
    node.classList.add('is-visible');
    return {
      update(nextOptions?: RevealOptions) {
        config = normalizeOptions(nextOptions);
        applyAssemblyVars(node, config);
        if (config.immediate) node.classList.add('is-visible');
      },
      destroy() {}
    };
  }

  const startObserver = () => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scheduleReveal(node);
        observer?.unobserve(node);
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    );
    observer.observe(node);
  };

  if (typeof requestIdleCallback !== 'undefined') {
    idleId = requestIdleCallback(startObserver, { timeout: 400 });
  } else {
    startObserver();
  }

  return {
    update(nextOptions?: RevealOptions) {
      config = normalizeOptions(nextOptions);
      applyAssemblyVars(node, config);
    },
    destroy() {
      if (idleId !== null && typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(idleId);
      }
      observer?.disconnect();
    }
  };
}
