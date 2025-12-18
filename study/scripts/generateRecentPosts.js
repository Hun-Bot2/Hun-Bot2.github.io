const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(__dirname, '../src/data/recentPosts.json');

function getAllMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// frontmatter에서 메타데이터 추출
function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    const category = data.category || extractCategoryFromPath(filePath);
    
    // 파일의 전체 경로 구조를 유지하되, 마지막 파일명만 id로 교체
    const relativePath = path.relative(DOCS_DIR, filePath);
    const dirPath = path.dirname(relativePath);
    
    let link;
    if (dirPath === '.') {
      // 최상위 docs 폴더에 있는 경우
      link = `/${data.id}`;
    } else {
      // 하위 폴더에 있는 경우 (예: Deep Learning/graph-neural-networks)
      link = `/${dirPath.replace(/\\/g, '/')}/${data.id}`;
    }
    
    // 공백 인코딩
    link = encodeURI(link);
    
    return {
      id: data.id,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      category: category,
      link: link,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// 파일 경로에서 카테고리 추출
function extractCategoryFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const docsIndex = parts.indexOf('docs');
  if (docsIndex !== -1 && docsIndex + 1 < parts.length) {
    return parts[docsIndex + 1];
  }
  return 'Other';
}

// 메인 함수
function generateRecentPosts() {
  console.log('Scanning MDX files...');
  
  const mdxFiles = getAllMdxFiles(DOCS_DIR);
  console.log(`Found ${mdxFiles.length} MDX files`);

  const posts = mdxFiles
    .map(extractMetadata)
    .filter(post => post !== null && post.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); 

  // 카테고리별 정렬
  const postsByCategory = {};
  posts.forEach(post => {
    if (!postsByCategory[post.category]) {
      postsByCategory[post.category] = [];
    }
    postsByCategory[post.category].push(post);
  });

  // 출력 파일 생성
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify({ posts, postsByCategory }, null, 2)
  );

  console.log(`Generated recent posts: ${OUTPUT_FILE}`);
  console.log(`Total posts: ${posts.length}`);
  console.log(`Categories: ${Object.keys(postsByCategory).join(', ')}`);
}

generateRecentPosts();
