import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import './App.css'

const defaultMarkdown = `
  # Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is multi-line code:

  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`

  You can also make text **bold**... whoa!
  Or _italic_.
  Or... **_both!_**

  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!

  ![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)

  - And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
          - That look like this.
`;

function App() {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
  };

  return (
    <div className='main'>
      <h1 className='title-Markdown'>Markdown Previewer</h1>
      <div className="boxes-container">
        <div className="text-container">
          <p>Editor</p>
        </div>
        <textarea
          name="editor"
          id="editor"
          value={markdownText}
          typeof="text"
          onChange={handleTextareaChange}
        ></textarea>
        <div id="preview">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
      <div className="content-p-developer">
        <p className="p-developer">
          Developed By: Céssar García
        </p>
      </div>
    </div>
  )
}

export default App;
