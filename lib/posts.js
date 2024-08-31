import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// BASE PATH
const postsDirectory = path.join(process.cwd(), 'content');


// FETCHING ALL
export async function getStoredFiles()
{
    // reading the files
    const fileNames = fs.readdirSync(postsDirectory);
    // getting and parsing the filecontent
    const allpostData = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/, '')
        const fullpath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(fullpath, 'utf-8');
        const metadata = matter(fileContent);
        // console.log(metadata.data);
        return {
            id,
            ...metadata.data
        };
    });

    return allpostData.sort(({date: a},{ date: b}) =>{
        if(a < b){
            return 1;
        }
        else if(a >b){
            return -1;
        }
        else{
            return 0;
        }
    })
}



export async function getStoredFilesById(slug) {
    try {
      const filename = path.join(postsDirectory, `${slug}.md`);
      const fileContent = fs.readFileSync(filename, 'utf-8');
      const { data, content } = matter(fileContent);
        console.log(data);
        
      return {
        ...data, // Metadata (e.g., title, date, author)
        content, // The content of the markdown file
      };
    } catch (error) {
      console.error(`Error reading file for slug ${slug}:`, error);
      return null;
    }
  }