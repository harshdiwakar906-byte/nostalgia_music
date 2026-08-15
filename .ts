[33mcommit 77d0cecb2580856717d259c18360d4aabeced09b[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Harsh <harshdiwakar906@gmail.com>
Date:   Fri Aug 14 20:44:54 2026 -0700

    Initial project upload

 .gitignore                                         |    4 [32m+[m
 README.md                                          |   60 [32m+[m
 app/globals.css                                    |  122 [32m++[m
 app/layout.tsx                                     |   49 [32m+[m
 app/page.tsx                                       |   25 [32m+[m
 components/Clock.tsx                               |   44 [32m+[m
 components/ListenerCount.tsx                       |   28 [32m+[m
 components/Player.tsx                              |  233 [32m+++[m
 components/PlaylistTabs.tsx                        |  230 [32m+++[m
 components/SeekBar.tsx                             |   79 [32m+[m
 components/SocialLinks.tsx                         |   22 [32m+[m
 components/TimeReadout.tsx                         |   19 [32m+[m
 components/TopBar.tsx                              |   19 [32m+[m
 components/Transport.tsx                           |   72 [32m+[m
 components/Vinyl.tsx                               |   46 [32m+[m
 lib/analytics.ts                                   |    6 [32m+[m
 lib/format.ts                                      |    6 [32m+[m
 lib/tracks.ts                                      |   70 [32m+[m
 lib/types.ts                                       |   17 [32m+[m
 lib/useYouTubePlayer.ts                            |  253 [32m+++[m
 lib/youtube.d.ts                                   |   54 [32m+[m
 next-env.d.ts                                      |    6 [32m+[m
 next.config.ts                                     |   12 [32m+[m
 package-lock.json                                  | 1809 [32m++++++++++++++++++++[m
 package.json                                       |   26 [32m+[m
 postcss.config.mjs                                 |    7 [32m+[m
 public/bg/scene-tall.jpg.jpeg                      |  Bin [31m0[m -> [32m163829[m bytes
 public/bg/scene-wide.jpg                           |  Bin [31m0[m -> [32m329837[m bytes
 public/icon-192.png                                |  Bin [31m0[m -> [32m52254[m bytes
 public/icon-512.png                                |  Bin [31m0[m -> [32m374548[m bytes
 public/manifest.json                               |   22 [32m+[m
 ...ahut Jatate Ho Pyar Duet (PenduJatt.Com.Se).mp3 |  Bin [31m0[m -> [32m17307091[m bytes
 public/package-lock.json                           |    6 [32m+[m
 tsconfig.json                                      |   23 [32m+[m
 34 files changed, 3369 insertions(+)
