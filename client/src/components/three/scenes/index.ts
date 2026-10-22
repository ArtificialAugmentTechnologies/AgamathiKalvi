// Stable loader functions (module-level) so ThreeStage can cache each lazy scene.
export const loadHeroScene = () => import('./HeroScene');
export const loadBlobScene = () => import('./BlobScene');
export const loadShapesScene = () => import('./ShapesScene');
export const loadGlobeScene = () => import('./GlobeScene');
