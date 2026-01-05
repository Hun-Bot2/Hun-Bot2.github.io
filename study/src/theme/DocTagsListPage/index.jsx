import React, {useMemo} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

function resolveCount(tag) {
  if (typeof tag.count === 'number') return tag.count;
  if (Array.isArray(tag.items)) return tag.items.length;
  if (Array.isArray(tag.docIds)) return tag.docIds.length;
  if (Array.isArray(tag.docs)) return tag.docs.length;
  return 0;
}

export default function DocTagsListPage({tags}) {
  const grouped = useMemo(() => {
    const map = new Map();
    [...tags]
      .sort((a, b) => a.label.localeCompare(b.label))
      .forEach((tag) => {
        const letter = tag.label.charAt(0).toUpperCase();
        const list = map.get(letter) || [];
        list.push(tag);
        map.set(letter, list);
      });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [tags]);

  const letters = grouped.map(([letter]) => letter);

  const totalMap = useMemo(() => {
    const map = new Map();
    grouped.forEach(([letter, list]) => {
      const total = list.reduce((acc, tag) => acc + resolveCount(tag), 0);
      map.set(letter, total);
    });
    return map;
  }, [grouped]);

  return (
      <main className="container margin-vert--xl">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Navigation</p>
          <h1 className={styles.title}>Tags</h1>
          <div className={styles.alphaNav}>
            {letters.map((letter) => {
              const total = totalMap.get(letter) ?? 0;
              return (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className={clsx(styles.alphaButton, total === 0 && styles.alphaDisabled)}
                  aria-disabled={total === 0}
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </header>

        <section className={styles.sectionList}>
          {grouped.map(([letter, list], idx) => {
            const total = totalMap.get(letter) ?? 0;
            return (
              <details key={letter} id={`letter-${letter}`} className={styles.letterBlock} open={idx === 0}>
                <summary className={styles.letterHeading}>
                  <span className={styles.letterChip}>{letter}</span>
                  <span className={styles.letterMeta}>
                    {total} item ↓
                  </span>
                </summary>
                <div className={styles.folderGrid}>
                  {list.map((tag) => {
                    const count = resolveCount(tag);
                    return (
                      <Link key={tag.permalink} to={tag.permalink} className={clsx(styles.folderCard, 'card')}>
                        <div className={styles.folderTop}>
                          <span className={styles.folderTab} />
                          <span className={styles.folderTitle}>{tag.label}</span>
                        </div>
                        <div className={styles.folderMeta}>{count} item ↓</div>
                      </Link>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </section>
      </main>
  );
}
