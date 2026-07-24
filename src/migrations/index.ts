import * as migration_20260715_160005_baseline from "./20260715_160005_baseline";
import * as migration_20260723_204332_add_experience_ongoing from "./20260723_204332_add_experience_ongoing";

export const migrations = [
  {
    up: migration_20260715_160005_baseline.up,
    down: migration_20260715_160005_baseline.down,
    name: "20260715_160005_baseline",
  },
  {
    up: migration_20260723_204332_add_experience_ongoing.up,
    down: migration_20260723_204332_add_experience_ongoing.down,
    name: "20260723_204332_add_experience_ongoing",
  },
];
