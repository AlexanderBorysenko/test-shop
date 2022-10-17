export type DbQuery = <T>(queryString: string) => Promise<T[]>;
