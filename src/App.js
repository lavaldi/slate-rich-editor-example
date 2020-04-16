import React from 'react';
import RichEditor from './RichEditor/RichEditor';
import './styles.css';


const editorValue = '<ul class="md-block-unordered-list-item"><li>It\'s rare that TLs are invited to participate in the pitch review process.</li></ul>'

function App() {
  return (
    <section className="app">
      <RichEditor initialValue={editorValue} />
    </section>
  );
}

export default App;
