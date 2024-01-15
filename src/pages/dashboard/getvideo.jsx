import { useEffect, useState } from 'react';

function GitHubFileViewer() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchGitHubFile = async () => {
      const owner = 'NAVEEN04MKUMAR';
      const repo = 'FULL-STACK-ASSIGNMENTPW';
      const branch = 'main';
      const path = 'https://github.com/NAVEEN04MKUMAR/FULL-STACK-ASSIGNMENTPW/blob/main/Be_Hungry_%23Shorts.mp4'; 

      const apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const content = await response.text();
          setFileContent(content);
        } else {
          console.error(`Failed to fetch file from GitHub. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchGitHubFile();
  }, []); // Make sure to update the dependency array based on your needs

  return (
    <div>
      <h1>File Content:</h1>
      <pre>{fileContent}</pre>
    </div>
  );
}

export default GitHubFileViewer;
