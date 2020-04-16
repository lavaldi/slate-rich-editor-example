import React from 'react';
import RichEditor from './RichEditor/RichEditor';
import './styles.css';


const editorValue = '<ul class="md-block-unordered-list-item"><li>It\'s rare that TLs are invited to participate in the pitch review process.</li></ul>'

// TODO: Send a PR modifying https://github.com/ianstormtaylor/slate/blob/master/packages/slate-hyperscript/src/creators.ts updating the resolveDescendants function

// const editorValue = '<ul><li>It\'s rare that TLs are invited to participate in the pitch <strong>review</strong> process.</li><img alt="" src="https://p-VVF5MJM.t2.n0.cdn.getcloudapp.com/items/2NuXk4j8/Image%202020-04-14%20at%202.39.07%20PM.png?v=1f4b0ec164546d136b3f61a1f38c9aef" /><p></p></ul>'

function App() {
  return (
    <section className="app">
      <RichEditor initialValue={editorValue} />
    </section>
  );
}

export default App;
