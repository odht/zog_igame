/**
 * title: 新增新闻 - 智赛桥牌
 * isNotMenu: true
 */
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css'

class RichTextEditor extends React.Component {
    state = {
        editorState: BraftEditor.createEditorState(null)
      }
    
      render () {
        return (
          <BraftEditor value={this.state.editorStste} onChange={this.handleChange}/>
        )
      }
    
      handleChange = (editorStste) => {
        this.setState({ editorStste })
      }
    

}
export default (props) => {
    return (<div>
      <RichTextEditor />
    </div>
    )
  }