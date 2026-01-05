import React from 'react';
import Link from '@docusaurus/Link';
import OriginalDocItemFooter from '@theme-original/DocItem/Footer';
import styles from './styles.module.css';
import {slugifyTag} from '../../../utils/tagUtils';

export default function DocItemFooter(props) {
  const tags = props?.metadata?.frontMatter?.tags || [];

  return (
    <>
      <div className={styles.tagsSection}>
        <div className={styles.tagsLabel}>Tags</div>
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <Link
              key={tag}
              className={styles.tagChip}
              to={`/tags#${slugifyTag(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <OriginalDocItemFooter {...props} />
    </>
  );
}
