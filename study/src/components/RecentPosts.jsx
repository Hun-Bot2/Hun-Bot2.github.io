import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';
import recentPostsData from '@site/src/data/recentPosts.json';

// 자동 생성된 데이터 사용
const postsByCategory = recentPostsData.postsByCategory;

export default function RecentPosts() {
  const categories = Object.keys(postsByCategory);

  return (
    <Tabs>
      {categories.map((category, index) => {
        const posts = postsByCategory[category];
        const latestPost = posts[0];
        const postUrl = useBaseUrl(latestPost.link);
        
        return (
          <TabItem 
            key={category}
            value={category.toLowerCase()} 
            label={category}
            default={index === 0}
          >
            <div>
              <strong>{latestPost.title}</strong>
              <div style={{marginTop: '0.5rem', marginBottom: '1rem'}}>
                {latestPost.description}
              </div>
              <a href={postUrl} style={{fontWeight: '600'}}>
                Learn more →
              </a>
              <div style={{fontSize: '0.85rem', color: 'var(--ifm-color-gray-600)', marginTop: '1rem'}}>
                Updated: {new Date(latestPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </TabItem>
        );
      })}
    </Tabs>
  );
}
