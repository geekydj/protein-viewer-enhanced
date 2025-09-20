// Type declarations for missing modules
declare module '@barba/core' {
  interface BarbaTransition {
    name: string;
    leave?(data: any): Promise<any> | any;
    enter?(data: any): Promise<any> | any;
  }

  interface BarbaView {
    namespace: string;
    afterEnter?(): void;
    beforeLeave?(): void;
  }

  interface BarbaConfig {
    transitions?: BarbaTransition[];
    views?: BarbaView[];
  }

  interface Barba {
    init(config?: BarbaConfig): void;
    go(url: string): void;
  }

  const barba: Barba;
  export default barba;
}

declare module 'animejs/lib/anime.es.js' {
  interface AnimeParams {
    targets: any;
    [key: string]: any;
  }

  interface Anime {
    (params: AnimeParams): any;
    remove(targets: any): void;
    stagger(value: number): any;
  }

  const anime: Anime;
  export default anime;
}